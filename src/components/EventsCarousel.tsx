'use client';

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENTS } from '@/data/events';

gsap.registerPlugin(ScrollTrigger);

const HEADING = 'Our Events';

function splitLetters(text: string) {
  return text.split('').map((ch, i) => (
    <span
      key={`${ch}-${i}`}
      className="events-letter"
      aria-hidden="true"
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));
}

export default function EventsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const count = EVENTS.length;
  const autoScrollTimerRef = useRef<number | null>(null);

  const scrollByStep = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const tick = () => scrollByStep(1);
    autoScrollTimerRef.current = window.setInterval(tick, 5000);
    return () => {
      if (autoScrollTimerRef.current !== null) {
        window.clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [scrollByStep]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>('.events-letter');
      if (letters.length === 0) return;

      gsap.set(letters, { opacity: 0, y: 30, display: 'inline-block' });

      const shuffled = [...letters].sort(() => Math.random() - 0.5);

      gsap.to(shuffled, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { each: 0.05, from: 'start' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="events-section"
      aria-label={HEADING}
    >
      <div className="events-section-bg" style={{ backgroundImage: 'url(/event%20bg.webp)' }} aria-hidden="true" />
      <div className="events-inner">
        <div className="events-header">
          <h2 ref={headingRef} className="events-kicker">
            <span className="events-kicker-dot" aria-hidden="true" />
            <span className="events-kicker-text">
              {splitLetters(HEADING)}
              <span className="sr-only">{HEADING}</span>
            </span>
          </h2>

          <Link href="/events" className="events-stat-card" aria-label={`${HEADING}, ${count} total`}>
            <span className="events-stat-label">{HEADING}</span>
            <span className="events-stat-value">{count}</span>
            <span className="events-arrow-chip" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </span>
          </Link>
        </div>

        <div className="events-carousel-controls">
          <button
            type="button"
            aria-label="Previous events"
            className="events-arrow-btn"
            onClick={() => scrollByStep(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next events"
            className="events-arrow-btn"
            onClick={() => scrollByStep(1)}
          >
            ›
          </button>
        </div>

        <div className="events-track" ref={trackRef}>
          {EVENTS.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="event-card"
            >
              <span className="event-card-tag">Incubation</span>
              <div className="event-card-body">
                <h3 className="event-card-name">{event.name}</h3>
                <p className="event-card-meta">
                  {event.category} · {event.teamSize}
                </p>
              </div>
              <div className="event-card-stats">
                <div className="event-card-stat">
                  <span className="event-card-stat-value">{event.entryFee}</span>
                  <span className="event-card-stat-label">Entry Fee</span>
                </div>
                <div className="event-card-stat">
                  <span className="event-card-stat-value">{event.prizePool}</span>
                  <span className="event-card-stat-label">Prize Pool</span>
                </div>
                <div className="event-card-stat">
                  <span className="event-card-stat-value">{event.slotsLeft}</span>
                  <span className="event-card-stat-label">Slots Left</span>
                </div>
                <div className="event-card-stat event-card-stat-apply">
                  <span className="event-card-stat-value event-card-stat-arrow" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 11L11 3M11 3H4.5M11 3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </span>
                  <span className="event-card-stat-label">Apply</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
