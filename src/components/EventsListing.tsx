'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  EVENT_CATEGORIES,
  EVENT_ENTRY_FEE,
  EVENT_PRIZE_POOL,
  EVENTS,
  type Event,
  type EventCategory,
} from '@/data/events';

const ARROW_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44NTAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTY5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSIjMEUwRTBFIi8+Cjwvc3ZnPgo=';

function Stats({ teamSize, date }: { teamSize: string; date: string }) {
  const items = [
    { value: EVENT_ENTRY_FEE, label: 'Entry Fee' },
    { value: EVENT_PRIZE_POOL, label: 'Prize Pool' },
    { value: teamSize, label: 'Team Size' },
    { value: date, label: 'Date' },
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
          <div className="portfolio-item-category">{event.category}</div>
          <div className="portfolio-item-name" style={{ fontFamily: 'Arial, sans-serif' }}>
            {event.name}
          </div>
        </div>
        <div className="portfolio-item-bottom margin-top-auto">
          <Stats teamSize={event.teamSize} date={event.date} />
          <ArrowChip />
        </div>
      </Link>
    </div>
  );
}

export default function EventsListing() {
  const [category, setCategory] = useState<EventCategory | 'All'>('All');

  const filtered = useMemo(() => {
    return EVENTS.filter((event) => category === 'All' || event.category === category);
  }, [category]);

  return (
    <>
      <div className="filters-panel w-form">
        <form className="filter-panel-inner" aria-label="Filter events">
          <div className="filters-list" role="radiogroup" aria-label="Event category">
            {(['All', ...EVENT_CATEGORIES] as const).map((item) => {
              const checked = category === item;
              return (
                <label
                  key={item}
                  className={`radio-tab events-filter-tab${checked ? ' is-active' : ''}`}
                >
                  <div
                    className={`w-form-formradioinput w-form-formradioinput--inputType-custom radio-tab-button radio-tab-button-alt w-radio-input${
                      checked ? ' w--redirected-checked' : ''
                    }`}
                  />
                  <input
                    type="radio"
                    name="Categories"
                    value={item}
                    checked={checked}
                    onChange={() => setCategory(item)}
                    style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
                  />
                  <span className="radio-tab-label w-form-label">{item}</span>
                </label>
              );
            })}
          </div>
        </form>
      </div>

      <div className="w-dyn-list">
        <div role="list" className="portfolio-listing w-dyn-items">
          {filtered.length === 0 ? (
            <p className="events-empty">No events match that filter.</p>
          ) : (
            filtered.map((event) => <EventCard key={event.slug} event={event} />)
          )}
        </div>
      </div>
    </>
  );
}