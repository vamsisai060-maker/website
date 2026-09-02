import { notFound } from 'next/navigation';
import { EVENTS } from '@/data/events';

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  return {
    title: event ? `${event.name} | ChainGPT Labs` : 'Event not found',
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

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
            margin: '0 0 1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {event.name}
        </h1>
        <p style={{ margin: 0, color: 'var(--dark-60)' }}>
          This is the {event.name} page — details coming soon.
        </p>
      </div>
    </main>
  );
}
