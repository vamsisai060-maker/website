import Link from 'next/link';
import {
  EVENT_ENTRY_FEE,
  EVENTS,
  SESSION_TIMES,
  type Event,
  type EventSession,
} from '@/data/events';

const ARROW_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44NTAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTY5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSIjMEUwRTBFIi8+Cjwvc3ZnPgo=';

function Stats({ teamSize, date, session }: { teamSize: string; date: string; session: EventSession }) {
  const items = [
    { value: EVENT_ENTRY_FEE, label: 'Entry Fee' },
    { value: teamSize, label: 'Team Size' },
    { value: date, label: 'Date' },
    { value: SESSION_TIMES[session], label: 'Starts' },
  ];

  return (
    <div className="portfolio-item-list">
      {items.map((item) => (
        <div key={item.label} className="portfolio-item-info">
          <div className="portfolio-item-info-title">{item.value}</div>
          <div className="portfolio-item-info-descr">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function ArrowChip() {
  return (
    <div className="portfolio-item-link-2 portfolio-item-link">
      <img width={23} height={23} alt="" src={ARROW_SRC} className="portfolio-item-arrow item-arrow--hover-out" />
      <img width={23} height={23} alt="" src={ARROW_SRC} className="portfolio-item-arrow item-arrow--hover-in" />
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <div role="listitem" className="portfolio-listing-item w-dyn-item">
      <Link href={`/events/${event.slug}`} className="portfolio-item layout-diff w-inline-block">
        <div className="portfolio-item-thumb">
          <img src={event.image} alt={event.name} loading="lazy" className="portfolio-item-image" />
        </div>
        <div className="portfolio-item-bottom margin-top-auto">
          <Stats teamSize={event.teamSize} date={event.date} session={event.session} />
          <ArrowChip />
        </div>
      </Link>
    </div>
  );
}

export default function EventsListing() {
  // EVENTS is already sorted by date, so the whole fest reads as one timeline.
  return (
    <div className="w-dyn-list">
      <div role="list" className="portfolio-listing w-dyn-items">
        {EVENTS.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}