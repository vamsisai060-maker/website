'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import { EVENTS } from '@/data/events';

export default function RegisterSuccess({
  eventSlug,
  code,
  team,
}: {
  eventSlug: string;
  code?: string;
  team?: string;
}) {
  const [copied, setCopied] = useState(false);
  const event = EVENTS.find((item) => item.slug === eventSlug);

  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="register-page">
      <div className="body-lines-wrap">
        <div className="body-line left"></div>
        <div className="body-line left-middle"></div>
        <div className="body-line center"></div>
        <div className="body-line right-middle"></div>
        <div className="body-line right"></div>
      </div>
      <SiteHeader />
      <div className="page-wrapper">
        <div className="w-layout-blockcontainer container w-container">
          <div className="page-heading">
            <img
              width={44}
              height={44}
              src="/register/decor.svg"
              alt=""
              loading="lazy"
              className="page-heading-decor"
            />
            <div className="page-heading-title-col">
              <div className="marquee">
                <div className="marquee-content scroll apply-scroll">
                  <h1 className="page-heading-title apply-title">REGISTERED </h1>
                  <div className="page-heading-title underscore">_</div>
                </div>
                <div className="marquee-content scroll">
                  <div className="page-heading-title">REGISTERED</div>
                </div>
                <div className="marquee-content scroll">
                  <div className="page-heading-title">REGISTERED</div>
                </div>
              </div>
            </div>
            <div className="featured-block-info underscore">
              <div className="featured-block-descr-wrap">
                <div className="page-heading-descr">
                  <div className="page-heading-title">_</div>
                </div>
              </div>
            </div>
            <div className="page-heading-descr-col">
              <div className="page-heading-descr">
                <div className="page-heading-descr-text">
                  Your team is registered for {event?.name ?? 'your event'}
                </div>
                <div className="page-heading-descr-decor"></div>
              </div>
            </div>
          </div>

          <div className="register-success">
            {code ? (
              <>
                <div className="register-success-label">Your team code</div>
                <div className="register-success-code">{code}</div>
                <div className="register-success-note">
                  {team ? `Team: ${team}` : ''}
                </div>
                <div className="register-success-venue">
                  <span className="register-success-venue-label">Venue</span>
                  <span className="register-success-venue-name">
                    ADITYA DEGREE COLLEGE, [CO-ED] GAJUWAKA CAMPUS
                  </span>
                </div>
                <div className="register-success-actions">
                  <button
                    type="button"
                    className="success-code-copy"
                    onClick={copy}
                  >
                    {copied ? 'Copied' : 'Copy code'}
                  </button>
                  <Link href="/" className="success-code-home">
                    Back to home
                  </Link>
                </div>
                <div className="register-success-note register-success-hint">
                  Note down or screenshot this code and carry it to the venue.
                  It identifies your team on event day.
                </div>
              </>
            ) : (
              <div className="register-success-note">
                Thank you! Your registration has been received. We could not
                load your team code — contact the organizers with your team
                name to confirm your registration.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}