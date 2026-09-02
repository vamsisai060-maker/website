import Link from 'next/link';
import { EVENTS } from '@/data/events';

export const metadata = {
  title: 'All Events | ChainGPT Labs',
  description: 'Browse upcoming hackathons, game jams, and showcases from ChainGPT Labs.',
};

export default function EventsIndexPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--lightgrey)',
        color: 'var(--darklighter)',
        padding: '6rem 1.5rem 4rem',
        fontFamily: 'LabsAmiga, sans-serif',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            margin: '0 0 2rem',
            borderBottom: '1px solid var(--grey)',
            paddingBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          All Events
        </h1>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {EVENTS.map((event) => (
            <li
              key={event.slug}
              style={{
                padding: '1.25rem 0',
                borderBottom: '1px solid var(--grey)',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                <Link
                  href={`/events/${event.slug}`}
                  style={{ color: 'var(--dark)', textDecoration: 'none' }}
                >
                  {event.name}
                </Link>
              </h2>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--dark-60)' }}>
                {event.name} — details coming soon.
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
