'use client';

import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EVENTS, SESSION_TIMES } from '@/data/events';
import { SmoothInput } from '@/components/smoothinput';
import { CustomSelect } from '@/components/CustomSelect';
import {
  MEMBER_FIELDS,
  REGISTRATIONS,
  validateField,
  type RegisterField,
} from '@/data/registration';

type Member = {
  name: string;
  phone: string;
  email: string;
  branch: string;
  year: string;
  college: string;
};

type MemberField = keyof Member;

type SubmitState = 'idle' | 'success' | 'error';

/**
 * Identifies one registration attempt. The backend stores it, so a replayed
 * POST (the /api/register cold-start retry, a double-tapped submit, a refresh
 * mid-flight) is answered with the original code instead of a second row.
 * A new id is minted whenever the team details change.
 */
function newRequestId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `req-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

type FieldRowDef = { fields: RegisterField[]; cls: string };

const LEADER_ROWS: FieldRowDef[] = [
  { fields: [MEMBER_FIELDS[0], MEMBER_FIELDS[1]], cls: 'fr-double' },
  { fields: [MEMBER_FIELDS[2], MEMBER_FIELDS[3]], cls: 'fr-double' },
  { fields: [MEMBER_FIELDS[4], MEMBER_FIELDS[5]], cls: 'fr-last' },
];

const MEMBER_ROWS: FieldRowDef[] = [
  { fields: [MEMBER_FIELDS[0], MEMBER_FIELDS[1]], cls: 'fr-double' },
  { fields: [MEMBER_FIELDS[2], MEMBER_FIELDS[3]], cls: 'fr-double' },
  { fields: [MEMBER_FIELDS[4]], cls: 'fr-last' },
];

const TEAM_NAME_FIELD: RegisterField = {
  key: 'name',
  label: 'Team Name',
  placeholder: '[Team name]',
  type: 'text',
  required: true,
};

const emptyMember = (): Member => ({
  name: '',
  phone: '',
  email: '',
  branch: '',
  year: '',
  college: '',
});

function FieldRow({
  id,
  nb,
  field,
  value,
  onChange,
  error,
  name,
}: {
  id: string;
  nb: string;
  field: RegisterField;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  /**
   * Overrides the submitted name attribute. Chrome reads it when guessing what
   * a field holds, so the team name is deliberately not called "...-name".
   */
  name?: string;
}) {
  const filled = value.trim() !== '';
  const className = [
    'form-row-item',
    filled ? 'is-filled' : '',
    error ? 'is-invalid' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={className}>
      <div className="field-head">
        <div className="field-head-status">
          <div className="field-head-nb">{nb}</div>
          <img
            width={16}
            height={12}
            src="/register/check.svg"
            alt=""
            loading="lazy"
            className="field-head-check"
          />
        </div>
        <label htmlFor={id} className="field-head-label">
          {field.label}
        </label>
      </div>
      {field.options ? (
        <CustomSelect
          id={id}
          value={value}
          options={field.options}
          placeholder={field.selectPlaceholder ?? 'Select'}
          onChange={onChange}
        />
      ) : (
        <SmoothInput
          id={id}
          name={name ?? id}
          // Every field here belongs to somebody else: autofilling the browser
          // profile would repeat one person across the team, and Chrome offered
          // the member names as suggestions in the team name box.
          autoComplete="off"
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          inputMode={field.numeric ? 'numeric' : undefined}
          maxLength={field.maxLength}
          className="form-field-text w-input"
          wrapperClassName="bg-transparent p-0 rounded-none max-w-none outline-none has-[:focus-visible]:outline-none"
        />
      )}
      {error ? <div className="form-field-error">{error}</div> : null}
    </div>
  );
}

const EVENT_OPTIONS = EVENTS.map((event) => event.name);

function MemberBlock({
  index,
  pfx,
  member,
  isLeader,
  showErrors,
  onUpdate,
  isSingle,
}: {
  index: number;
  pfx: number;
  member: Member;
  isLeader: boolean;
  showErrors: boolean;
  onUpdate: (member: Member) => void;
  isSingle: boolean;
}) {
  const set = (key: MemberField, value: string) => {
    const field = MEMBER_FIELDS.find((item) => item.key === key);
    let next = value;
    if (field?.numeric) {
      next = value.replace(/\D/g, '').slice(0, field.maxLength ?? 10);
    }
    onUpdate({ ...member, [key]: next });
  };

  return (
    <div className="register-member-block">
      <div className="register-member-title">
        <span>{isSingle ? 'Participant' : `Member ${index + 1}`}</span>
        {isLeader && !isSingle && <small>Team Leader</small>}
      </div>
      {(isLeader ? LEADER_ROWS : MEMBER_ROWS).map((row, rowIndex) => (
        <div className={`form-row ${row.cls}`} key={rowIndex}>
          {row.fields.map((field) => {
            const id = `member-${index}-${field.key}`;
            const fieldIndex = MEMBER_FIELDS.findIndex((item) => item.key === field.key);
            const error = showErrors ? validateField(field, member[field.key]) : null;
            return (
              <FieldRow
                key={field.key}
                id={id}
                nb={`${pfx}.${fieldIndex + 1}`}
                field={field}
                value={member[field.key]}
                onChange={(value) => set(field.key, value)}
                error={error}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function RegisterForm({
  initialEventSlug,
  locked,
}: {
  initialEventSlug?: string;
  locked?: boolean;
}) {
  const initialEvent = EVENTS.find((event) => event.slug === initialEventSlug);
  const [selectedEventSlug, setSelectedEventSlug] = useState<string | undefined>(
    initialEvent?.slug
  );
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<Member[]>(() => {
    if (!initialEvent?.slug) return [];
    return Array.from({ length: REGISTRATIONS[initialEvent.slug].memberSlots }, () => emptyMember());
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Refs, not state: the guard has to be live before React re-renders, or a
  // fast double click sends two POSTs.
  const submittingRef = useRef(false);
  const requestIdRef = useRef<string>('');
  const requestSignatureRef = useRef<string>('');

  const router = useRouter();

  const selectedEvent = useMemo(
    () => (selectedEventSlug ? EVENTS.find((event) => event.slug === selectedEventSlug) : undefined),
    [selectedEventSlug]
  );
  const config = selectedEventSlug ? REGISTRATIONS[selectedEventSlug] : undefined;

  const isSingle = config?.memberSlots === 1;
  const teamNameError = !isSingle && submitted ? validateField(TEAM_NAME_FIELD, teamName) : null;

  const onSelectEvent = (eventName: string) => {
    if (locked) return;
    const next = EVENTS.find((event) => event.name === eventName);
    if (!next) return;
    setSelectedEventSlug(next.slug);
    setMembers((prev) => {
      const slots = REGISTRATIONS[next.slug].memberSlots;
      const nextMembers = [...prev];
      while (nextMembers.length < slots) {
        nextMembers.push({ ...emptyMember(), college: prev[0]?.college ?? '' });
      }
      return nextMembers.slice(0, slots);
    });
  };

  const isFormValid = () => {
    if (!selectedEventSlug || !config) return false;
    if (!isSingle && validateField(TEAM_NAME_FIELD, teamName)) return false;
    const requiredSlots = config.memberSlots;
    if (members.length !== requiredSlots) return false;
    return members.every((member) =>
      MEMBER_FIELDS.every((field) => !validateField(field, member[field.key]))
    );
  };

  const scrollToElement = (target: HTMLElement) => {
    window.__lenis?.scrollTo(target, { offset: -90, duration: 1.2 });
  };

  const scrollToFirstError = () => {
    const firstInvalid = document.querySelector('.form-row-item.is-invalid');
    const source = (firstInvalid ?? document.querySelector('.form-field-error')) as HTMLElement | null;
    if (source) scrollToElement(source);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    setSubmitted(true);
    if (submitState === 'success') return;
    if (!isFormValid()) {
      scrollToFirstError();
      return;
    }
    submittingRef.current = true;
    setSending(true);
    setSubmitState('idle');
    setSubmitError(null);
    let rejectMessage: string | null = null;
    try {
      if (!selectedEventSlug || !selectedEvent || !config) {
        setSubmitError('Please select an event before submitting.');
        throw new Error('Event not selected');
      }
      const payload = {
        eventSlug: selectedEventSlug,
        eventName: selectedEvent.name,
        teamName: isSingle ? members[0]?.name.trim() : teamName.trim(),
        teamSize: members.length,
        members: members.map((member) => ({
          name: member.name.trim(),
          phone: member.phone.trim(),
          email: member.email.trim(),
          branch: member.branch.trim(),
          year: member.year,
          college: member.college,
        })),
      };

      // Same details -> same id, so a retry is recognised as a replay.
      // Edited details -> new id, otherwise the backend would answer with the
      // code from the earlier attempt.
      const signature = JSON.stringify(payload);
      if (signature !== requestSignatureRef.current) {
        requestSignatureRef.current = signature;
        requestIdRef.current = newRequestId();
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...payload, requestId: requestIdRef.current }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; code?: string; message?: string }
        | null;
      if (!response.ok || !result?.ok || !result.code) {
        if (result?.code === 'DUPLICATE') {
          rejectMessage =
            result.message ??
            `This phone number or email is already registered. Each person can register for only one game.`;
        } else {
          rejectMessage = result?.message ?? null;
        }
        throw new Error(rejectMessage ?? 'Submission failed');
      }
      setSubmitState('success');
      router.push(
        `/register/${selectedEventSlug}/success?code=${encodeURIComponent(
          result.code
        )}&team=${encodeURIComponent(isSingle ? (members[0]?.name.trim()) : teamName.trim())}`
      );
    } catch {
      setSubmitError(rejectMessage);
      setSubmitState('error');
      requestAnimationFrame(() => {
        const failBanner = document.querySelector('.w-form-fail') as HTMLElement | null;
        if (failBanner) scrollToElement(failBanner);
      });
    } finally {
      submittingRef.current = false;
      setSending(false);
    }
  };

  return (
    <div className="page-form w-form">
      <form data-form-anim-init="" id="wf-form-register-form" name="wf-form-register-form" onSubmit={handleSubmit} noValidate autoComplete="off" aria-label="Register form"
        style={submitState === 'success' ? { display: 'none' } : undefined}
      >
        <div className="form-section" id="create">
          <div className="form-col form-col-first"></div>
          <div className="form-col form-col-second">
            <div className="form-step">
              <img
                width={69}
                height={84}
                src="/register/step-1.svg"
                alt=""
                loading="lazy"
                className="form-step-nb"
              />
              <div className="form-step-name">Event & Team</div>
              <div className="form-step-sub-info">STEP 1 of 3</div>
            </div>
          </div>
          <div className="form-col">
            <div className="form-row fr-last">
              <div className={`form-row-item${selectedEventSlug ? ' is-filled' : ''}`}>
                <div className="field-head">
                  <div className="field-head-status">
                    <div className="field-head-nb">1.1</div>
                    <img width={16} height={12} src="/register/check.svg" alt="" loading="lazy" className="field-head-check" />
                  </div>
                  <label htmlFor="event-select" className="field-head-label">Select Event</label>
                </div>
                {locked ? (
                  <div className="form-field-text register-event-locked">{selectedEvent?.name ?? ''}</div>
                ) : (
                  <CustomSelect
                    id="event-select"
                    value={selectedEvent?.name ?? ''}
                    options={EVENT_OPTIONS}
                    placeholder="Select event"
                    onChange={onSelectEvent}
                  />
                )}
                {selectedEvent && config && (
                  <div className="register-rules" aria-label="Event rules">
                    <div className="register-rules-key">Date</div>
                    <div className="register-rules-value">{selectedEvent.date}</div>
                    <div className="register-rules-key">Session</div>
                    <div className="register-rules-value">
                      {selectedEvent.session} · {SESSION_TIMES[selectedEvent.session]}
                    </div>
                    <div className="register-rules-key">Team Size</div>
                    <div className="register-rules-value">{selectedEvent.teamSize}</div>
                    <div className="register-rules-key">Equipment</div>
                    <div className="register-rules-value">{config.laptop}</div>
                    <div className="register-rules-key">Team Leader</div>
                    <div className="register-rules-value">{config.teamLeaderRequired ? 'Required' : 'Optional'}</div>
                    <div className="register-rules-note">{config.notes}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="form-row fr-last">
              {!isSingle && (
                <FieldRow
                  id="team-name"
                  name="team"
                  nb="1.2"
                  field={TEAM_NAME_FIELD}
                  value={teamName}
                  onChange={setTeamName}
                  error={teamNameError}
                />
              )}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-col form-col-first"></div>
          <div className="form-col form-col-second">
            <div className="form-step">
              <img width={76} height={84} src="/register/step-2.svg" alt="" loading="lazy" className="form-step-nb" />
              <div className="form-step-name">{isSingle ? 'Participant Details' : 'Team Members'}</div>
              <div className="form-step-sub-info">STEP 2 of 3</div>
            </div>
          </div>
          <div className="form-col">
            {members.map((member, index) => (
              <MemberBlock
                key={index}
                index={index}
                pfx={index + 2}
                member={member}
                isLeader={index === 0}
                showErrors={submitted}
                isSingle={isSingle}
                onUpdate={(updated) => {
                  const next = [...members];
                  next[index] = updated;
                  if (index === 0 && !isSingle) {
                    for (let i = 1; i < next.length; i++) {
                      next[i] = { ...next[i], college: updated.college };
                    }
                  }
                  setMembers(next);
                }}
              />
            ))}
          </div>
        </div>

        <div className="form-section">
          <div className="form-col form-col-first"></div>
          <div className="form-col form-col-second">
            <div className="form-step">
              <img width={69} height={84} src="/register/step-3.svg" alt="" loading="lazy" className="form-step-nb" />
              <div className="form-step-name">Review & Submit</div>
              <div className="form-step-sub-info">STEP 3 of 3</div>
            </div>
          </div>
          <div className="form-col form-col-border-bottom">
            <div className="register-summary">
              <div className="register-summary-row">
                <div>Event</div>
                <div>{selectedEvent?.name ?? '—'}</div>
              </div>
              <div className="register-summary-row">
                <div>Event Date</div>
                <div>{selectedEvent?.date ?? '—'}</div>
              </div>
              {!isSingle && (
                <div className="register-summary-row">
                  <div>Team Name</div>
                  <div>{teamName}</div>
                </div>
              )}
              <div className="register-summary-row">
                <div>{isSingle ? 'Participant Count' : 'Team Size'}</div>
                <div>{members.length}</div>
              </div>
              <div className="register-summary-row">
                <div>Campus</div>
                <div>{members[0]?.college}</div>
              </div>
              {members.map((member, index) => (
                <div className="register-summary-row" key={index}>
                  <div>{isSingle ? 'Participant' : `Member ${index + 1}`}</div>
                  <div>{member.name}</div>
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button type="submit" disabled={sending} className="button-primary width-100 w-inline-block">
                <div className="button-primary-border">
                  <div className="button-primary-text button-size-text-lg button-with-icon">
                    <div>{sending ? 'Submitting…' : (isSingle ? 'Register' : 'Register team')}</div>
                    <img width={23} height={23} src="/register/arrow.svg" alt="" loading="lazy" className="button-primary-icon" />
                  </div>
                </div>
              </button>
              <div className="form-terms">
                By submitting the form, your team registers for the selected event for ASTRA 2K26.
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="w-form-done" tabIndex={-1} role="region" aria-label="Register form success"
        style={submitState === 'success' ? { display: 'block' } : undefined}
      >
        <div>Thank you! Your team has been registered.</div>
      </div>
      <div className="w-form-fail" tabIndex={-1} role="region" aria-label="Register form failure"
        style={submitState === 'error' ? { display: 'block' } : undefined}
      >
        <div>
          {submitError ??
            'Oops! Something went wrong while submitting the form. Please try again.'}
        </div>
      </div>
    </div>
  );
}