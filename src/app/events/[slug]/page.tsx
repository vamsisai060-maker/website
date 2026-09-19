import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import { EVENT_ENTRY_FEE, EVENT_PRIZE_POOL, EVENTS } from '@/data/events';

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = EVENTS.find((item) => item.slug === slug);
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
  const event = EVENTS.find((item) => item.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="events-page">
      <SiteHeader />
      <main className="featured-block-descr-wrap" style={{ maxWidth: '52rem', margin: '0 auto', paddingTop: '7rem', paddingBottom: '4rem' }}>
        <p style={{ margin: '0 0 1rem', fontSize: '0.875rem' }}>
          <Link href="/events" style={{ color: 'var(--dark)' }}>
            All Events
          </Link>
        </p>
        <div className="featured-card-labels" style={{ marginBottom: '1.25rem' }}>
          <div className="featured-card-label is-marked">{event.category}</div>
        </div>
        <h1
          style={{
            fontFamily: 'LabsAmiga, sans-serif',
            fontSize: '2.5rem',
            margin: '0 0 1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
          }}
        >
          {event.name}
        </h1>
        <p style={{ margin: '0 0 2rem', color: 'var(--dark-60)', maxWidth: '40rem' }}>{event.blurb}</p>
        <div className="featured-card-data-list" style={{ paddingLeft: 0, paddingRight: 0, maxWidth: '28rem' }}>
          <div className="featured-card-data">
            <div className="featured-card-data-value">{EVENT_ENTRY_FEE}</div>
            <div className="featured-card-data-name">Entry Fee</div>
          </div>
          <div className="featured-card-data">
            <div className="featured-card-data-value">{EVENT_PRIZE_POOL}</div>
            <div className="featured-card-data-name">Prize Pool</div>
          </div>
          <div className="featured-card-data">
            <div className="featured-card-data-value">{event.teamSize}</div>
            <div className="featured-card-data-name">Team Size</div>
          </div>
        </div>
        <Link
          href={`/register/${event.slug}`}
          className="button-primary w-inline-block"
          style={{ display: 'inline-block', marginTop: '2rem' }}
        >
          <div className="button-primary-border">
            <div className="button-primary-text">Register</div>
          </div>
        </Link>
      </main>
    </div>
  );
}
