'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EVENTS } from '@/data/events';
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
}: {
  id: string;
  nb: string;
  field: RegisterField;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
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
          name={id}
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

function RadioTab({
  name,
  id,
  value,
  label,
  checked,
  onSelect,
}: {
  name: string;
  id: string;
  value: string;
  label: string;
  checked: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <label className="radio-tab w-radio">
      <div
        className={`w-form-formradioinput w-form-formradioinput--inputType-custom radio-tab-button w-radio-input${
          checked ? ' w--redirected-checked' : ''
        }`}
      />
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
      />
      <span className="radio-tab-label w-form-label">{label}</span>
    </label>
  );
}

function MemberBlock({
  index,
  pfx,
  member,
  isLeader,
  showErrors,
  onUpdate,
}: {
  index: number;
  pfx: number;
  member: Member;
  isLeader: boolean;
  showErrors: boolean;
  onUpdate: (member: Member) => void;
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
        <span>Member {index + 1}</span>
        {isLeader && <small>Team Leader</small>}
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
  const [selectedEventSlug, setSelectedEventSlug] = useState(
    initialEvent?.slug ?? EVENTS.find((event) => event.slug === 'game-verse')!.slug
  );
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<Member[]>(() =>
    Array.from({ length: REGISTRATIONS[selectedEventSlug].memberSlots }, () => emptyMember())
  );
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();

  const selectedEvent = useMemo(
    () => EVENTS.find((event) => event.slug === selectedEventSlug)!,
    [selectedEventSlug]
  );
  const config = REGISTRATIONS[selectedEventSlug];

  const teamNameError = submitted ? validateField(TEAM_NAME_FIELD, teamName) : null;

  const onSelectEvent = (slug: string) => {
    if (locked) return;
    setSelectedEventSlug(slug);
    setMembers((prev) => {
      const slots = REGISTRATIONS[slug].memberSlots;
      if (prev.length === slots) return prev;
      const next = [...prev];
      while (next.length < slots) {
        next.push({ ...emptyMember(), college: prev[0]?.college ?? '' });
      }
      return next.slice(0, slots);
    });
  };

  const isFormValid = () => {
    if (validateField(TEAM_NAME_FIELD, teamName)) return false;
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
    setSubmitted(true);
    if (submitState === 'success') return;
    if (!isFormValid()) {
      scrollToFirstError();
      return;
    }
    setSending(true);
    setSubmitState('idle');
    setSubmitError(null);
    let rejectMessage: string | null = null;
    try {
      const payload = {
        eventSlug: selectedEventSlug,
        eventName: selectedEvent.name,
        teamName: teamName.trim(),
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
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; code?: string; message?: string }
        | null;
      if (!response.ok || !result?.ok || !result.code) {
        rejectMessage = result?.message ?? null;
        throw new Error(rejectMessage ?? 'Submission failed');
      }
      setSubmitState('success');
      router.push(
        `/register/${selectedEventSlug}/success?code=${encodeURIComponent(
          result.code
        )}&team=${encodeURIComponent(teamName.trim())}`
      );
    } catch {
      setSubmitError(rejectMessage);
      setSubmitState('error');
      requestAnimationFrame(() => {
        const failBanner = document.querySelector('.w-form-fail') as HTMLElement | null;
        if (failBanner) scrollToElement(failBanner);
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-form w-form">
      <form data-form-anim-init="" id="wf-form-register-form" name="wf-form-register-form" onSubmit={handleSubmit} noValidate aria-label="Register form"
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
                  <span className="field-head-label">Select Event</span>
                </div>
                {locked ? (
                  <div className="form-field-text register-event-locked">{selectedEvent.name}</div>
                ) : (
                  <div className="form-radio-list" role="radiogroup" aria-label="Events">
                    {EVENTS.map((event) => (
                      <RadioTab
                        key={event.slug}
                        name="event"
                        id={`event-${event.slug}`}
                        value={event.slug}
                        label={event.name}
                        checked={selectedEventSlug === event.slug}
                        onSelect={onSelectEvent}
                      />
                    ))}
                  </div>
                )}
                <div className="register-rules" aria-label="Event rules">
                  <div className="register-rules-key">Team Size</div>
                  <div className="register-rules-value">{selectedEvent.teamSize}</div>
                  <div className="register-rules-key">Equipment</div>
                  <div className="register-rules-value">{config.laptop}</div>
                  <div className="register-rules-key">Team Leader</div>
                  <div className="register-rules-value">{config.teamLeaderRequired ? 'Required' : 'Optional'}</div>
                  <div className="register-rules-note">{config.notes}</div>
                </div>
              </div>
            </div>
            <div className="form-row fr-last">
              <FieldRow
                id="team-name"
                nb="1.2"
                field={TEAM_NAME_FIELD}
                value={teamName}
                onChange={setTeamName}
                error={teamNameError}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="form-col form-col-first"></div>
          <div className="form-col form-col-second">
            <div className="form-step">
              <img width={76} height={84} src="/register/step-2.svg" alt="" loading="lazy" className="form-step-nb" />
              <div className="form-step-name">Team Members</div>
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
                onUpdate={(updated) => {
                  const next = [...members];
                  next[index] = updated;
                  if (index === 0) {
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
                <div>{selectedEvent.name}</div>
              </div>
              <div className="register-summary-row">
                <div>Event Date</div>
                <div>{selectedEvent.date}</div>
              </div>
              <div className="register-summary-row">
                <div>Team Name</div>
                <div>{teamName}</div>
              </div>
              <div className="register-summary-row">
                <div>Team Size</div>
                <div>{selectedEvent.teamSize}</div>
              </div>
              <div className="register-summary-row">
                <div>Campus</div>
                <div>{members[0]?.college}</div>
              </div>
              {members.map((member, index) => (
                <div className="register-summary-row" key={index}>
                  <div>Member {index + 1}</div>
                  <div>{member.name}</div>
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button type="submit" disabled={sending} className="button-primary width-100 w-inline-block">
                <div className="button-primary-border">
                  <div className="button-primary-text button-size-text-lg button-with-icon">
                    <div>{sending ? 'Submitting…' : 'Register team'}</div>
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