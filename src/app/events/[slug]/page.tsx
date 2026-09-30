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

const ARROW_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44MDAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTU5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSIjMEUwRTBFIi8+Cjwvc3ZnPgo=';

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

  const registerHref = `/register/${event.slug}`;
  const stats = [
    { value: EVENT_ENTRY_FEE, label: 'Entry Fee' },
    { value: EVENT_PRIZE_POOL, label: 'Prize Pool' },
    { value: event.teamSize, label: 'Team Size' },
    { value: event.date, label: 'Date' },
  ];

  return (
    <div className="events-page">
      <SiteHeader />
      <div className="filters-panel w-form">
        <div className="filter-panel-inner">
          <div className="filters-list">
            <Link href="/events" className="radio-tab events-filter-tab">
              <div className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-tab-button radio-tab-button-alt w-radio-input" />
              <span className="radio-tab-label w-form-label">All Events</span>
            </Link>
            <div className="radio-tab events-filter-tab is-active" aria-current="page">
              <div className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-tab-button radio-tab-button-alt w-radio-input w--redirected-checked" />
              <span className="radio-tab-label w-form-label">{event.category}</span>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div role="list" className="portfolio-listing w-dyn-items">
          <div
            role="listitem"
            className="portfolio-listing-item w-dyn-item"
            style={{ gridColumn: '1 / -1' }}
          >
            <article className="portfolio-item layout-diff">
              <div className="portfolio-item-thumb">
                <img
                  src={event.image}
                  alt={event.name}
                  loading="lazy"
                  className="portfolio-item-image"
                />
                <div className="event-detail-divider" aria-hidden="true"></div>
                <h1 className="portfolio-item-name event-detail-name">{event.name}</h1>
                <Link href={registerHref} className="button-primary w-inline-block">
                  <div className="button-primary-border">
                    <div className="button-primary-text">Register</div>
                  </div>
                </Link>
                {event.description && (
                  <div className="event-detail-about">
                    <p>{event.description}</p>
                  </div>
                )}
              </div>
              <Link href={registerHref} className="portfolio-item-bottom margin-top-auto">
                <div className="portfolio-item-list">
                  {stats.map((item) => (
                    <div key={item.label} className="portfolio-item-info">
                      <div className="portfolio-item-info-title">{item.value}</div>
                      <div className="portfolio-item-info-descr">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="portfolio-item-link-2 portfolio-item-link">
                  <img width={23} height={23} alt="" src={ARROW_SRC} className="portfolio-item-arrow item-arrow--hover-out" />
                  <img width={23} height={23} alt="" src={ARROW_SRC} className="portfolio-item-arrow item-arrow--hover-in" />
                </div>
              </Link>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}
