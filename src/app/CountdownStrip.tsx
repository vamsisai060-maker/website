'use client';

import { useEffect, useState } from 'react';

/** 1 Oct 2026, 00:00:00 India Standard Time (UTC+05:30) */
const TARGET_MS = Date.parse('2026-10-01T00:00:00+05:30');

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function remainingFrom(now: number): Remaining {
  const diff = Math.max(0, TARGET_MS - now);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

const UNITS: { key: keyof Omit<Remaining, 'done'>; label: string }[] = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

const INITIAL: Remaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  done: false,
};

export default function CountdownStrip() {
  const [time, setTime] = useState<Remaining>(INITIAL);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => setTime(remainingFrom(Date.now()));
    tick();
    setReady(true);
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="countdown-strip">
      <p className="countdown-kicker">The countdown begins</p>
      <div
        className="countdown-boxes"
        role="timer"
        aria-live="polite"
        aria-label={
          !ready
            ? 'Countdown to 1 October 2026, 00:00 India Standard Time'
            : time.done
              ? 'Countdown complete'
              : `Countdown to 1 October 2026, 00:00 India Standard Time: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`
        }
      >
        <div className="footer-decor fd-top-left"></div>
        <div className="footer-decor fd-top-right"></div>
        <div className="footer-decor fd-bottom-left"></div>
        <div className="footer-decor fd-bottom-right"></div>
        {UNITS.map((unit, i) => (
          <div key={unit.key} className="countdown-cell">
            {i > 0 ? <span className="countdown-colon" aria-hidden="true">:</span> : null}
            <span className="countdown-value">{pad(time[unit.key])}</span>
            <span className="countdown-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
