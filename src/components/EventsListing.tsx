'use client';

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  EVENT_CATEGORIES,
  EVENT_ENTRY_FEE,
  EVENT_PRIZE_POOL,
  EVENTS,
  FEATURED_EVENT,
  type Event,
  type EventCategory,
} from '@/data/events';

const ARROW_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY0ODQgNC41MjE3M0MxMS4xMDU1IDQuNTIxNzMgMTAuNjY1NCA0Ljk2MTgzIDEwLjY2NTQgNS41MDQ3MlY3LjQ3MDY5QzEwLjY2NTQgOC4wMTM1OCAxMS4xMDU1IDguNDUzNjggMTEuNjQ4NCA4LjQ1MzY4SDEzLjEyMjlDMTMuNjY1OCA4LjQ1MzY4IDE0LjEwNTggOC44OTM3NyAxNC4xMDU4IDkuNDM2NjZWMTAuOTExMUMxNC4xMDU4IDExLjA1MDkgMTQuMTM1IDExLjE4MzkgMTQuMTg3NiAxMS4zMDQzSDUuNjUyMTZDNS4wMjc4NCAxMS4zMDQzIDQuNTIxNzMgMTEuODEwNSA0LjUyMTczIDEyLjQzNDhWMTMuNTY1MkM0LjUyMTczIDE0LjE4OTUgNS4wMjc4NCAxNC42OTU2IDUuNjUyMTYgMTQuNjk1NkgxMy44NTAzQzEzLjcwMzIgMTQuODY3NSAxMy42MTQ0IDE1LjA5MDcgMTMuNjE0NCAxNS4zMzQ2VjE2LjgwOTFDMTMuNjE0NCAxNy4zNTIgMTMuMTc0MyAxNy43OTIxIDEyLjYzMTQgMTcuNzkyMUgxMS4xNTY5QzEwLjYxNCAxNy43OTIxIDEwLjE3MzkgMTguMjMyMSAxMC4xNzM5IDE4Ljc3NVYyMC43NDFDMTAuMTczOSAyMS4yODM5IDEwLjYxNCAyMS43MjQgMTEuMTU2OSAyMS43MjRIMTMuMTIyOUMxMy42NjU4IDIxLjcyNCAxNC4xMDU4IDIxLjI4MzkgMTQuMTA1OCAyMC43NDFWMTkuMjY2NUMxNC4xMDU4IDE4LjcyMzYgMTQuNTQ1OSAxOC4yODM1IDE1LjA4ODggMTguMjgzNUgxNi41NjMzQzE3LjEwNjIgMTguMjgzNSAxNy41NDYzIDE3Ljg0MzQgMTcuNTQ2MyAxNy4zMDA2VjE2LjMxNzZDMTcuNTQ2MyAxNS43NzQ3IDE3Ljk4NjQgMTUuMzM0NiAxOC41MjkzIDE1LjMzNDZIMjAuNDk1M0MyMS4wMzgyIDE1LjMzNDYgMjEuNDc4MyAxNC44OTQ1IDIxLjQ3ODMgMTQuMzUxNlYxMi4zODU2QzIxLjQ3ODMgMTIuMTU2MiAyMS4zOTk2IDExLjk0NTEgMjEuMjY3OCAxMS43Nzc4QzIxLjA2MjggMTEuNDkxMiAyMC43MjcxIDExLjMwNDMgMjAuMzQ3OCAxMS4zMDQzSDE4LjU5MThDMTguMjYzOSAxMS4xNDUgMTguMDM3OCAxMC44MDg3IDE4LjAzNzggMTAuNDE5NlY4Ljk0NTE3QzE4LjAzNzggOC40MDIyOCAxNy41OTc3IDcuOTYyMTggMTcuMDU0OCA3Ljk2MjE4SDE1LjU4MDNDMTUuMDM3NCA3Ljk2MjE4IDE0LjU5NzMgNy41MjIwOCAxNC41OTczIDYuOTc5MlY1LjUwNDcyQzE0LjU5NzMgNC45NjE4MyAxNC4xNTcyIDQuNTIxNzMgMTMuNjE0NCA0LjUyMTczSDExLjY0ODRaIiBmaWxsPSIjMEUwRTBFIi8+Cjwvc3ZnPgo=';

function Stats({ teamSize, featured = false }: { teamSize: string; featured?: boolean }) {
  const items = [
    { value: EVENT_ENTRY_FEE, label: 'Entry Fee' },
    { value: EVENT_PRIZE_POOL, label: 'Prize Pool' },
    { value: teamSize, label: 'Team Size' },
  ];

  if (featured) {
    return (
      <div className="featured-card-data-list">
        {items.map((item) => (
          <div key={item.label} className="featured-card-data">
            <div className="featured-card-data-value">{item.value}</div>
            <div className="featured-card-data-name">{item.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="portfolio-item-list">
      {items.map((item) => (
        <div key={item.label} className="portfolio-item-info">
          <div className="portfolio-item-info-title">{item.value}</div>
          <div className="portfolio-item-info-descr">{item.label}</div>
        </div>
      ))}
      <div className="portfolio-item-info hide-in-tablet" />
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
          <div className="portfolio-item-name">{event.name}</div>
        </div>
        <div className="portfolio-item-bottom margin-top-auto">
          <Stats teamSize={event.teamSize} />
          <ArrowChip />
        </div>
      </Link>
    </div>
  );
}

export default function EventsListing() {
  const [category, setCategory] = useState<EventCategory | 'All'>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return EVENTS.filter((event) => {
      const categoryOk = category === 'All' || event.category === category;
      const searchOk =
        needle.length === 0 ||
        event.name.toLowerCase().includes(needle) ||
        event.category.toLowerCase().includes(needle) ||
        event.kind.toLowerCase().includes(needle);
      return categoryOk && searchOk;
    });
  }, [category, query]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="featured-block">
        <div className="featured-block-info">
          <div className="featured-block-descr-wrap">
            <div className="page-heading-descr">
              <div className="page-heading-descr-text">Meet our main event</div>
              <div className="page-heading-descr-decor" />
            </div>
          </div>
          <div className="total-projects-box">
            <div className="total-projects-title">Events</div>
            <div className="total-projects-nb">{EVENTS.length}</div>
          </div>
        </div>
        <div className="featured-block-col-middle">
          <div className="featured-block-illustration portfolio-featured-illustration">
            <div className="featured-block-illustration-decor pos-top-left" />
            <div className="featured-block-illustration-decor pos-top-right" />
            <div className="featured-block-illustration-decor pos-bottom-left" />
            <div className="featured-block-illustration-decor pos-bottom-right" />
          </div>
        </div>
        <div className="featured-block-post">
          <div className="collection-list-wrapper-6 w-dyn-list">
            <div role="list" className="collection-list-5 w-dyn-items">
              <div role="listitem" className="featured-card porfolio-item-link w-dyn-item">
                <div className="featured-card-labels">
                  <div className="featured-card-label is-marked">Main</div>
                  <div className="featured-card-label">{FEATURED_EVENT.category}</div>
                  <div className="featured-card-label">{FEATURED_EVENT.kind}</div>
                </div>
                <div className="featured-info">
                  <div className="featured-card-name">{FEATURED_EVENT.name}</div>
                  <div className="featured-card-short-info">{FEATURED_EVENT.blurb}</div>
                </div>
                <div className="featured-card-footer">
                  <Stats teamSize={FEATURED_EVENT.teamSize} featured />
                  <Link href={`/events/${FEATURED_EVENT.slug}`} className="porfolio-item-link--absolute">
                    <span className="sr-only">{FEATURED_EVENT.name}</span>
                  </Link>
                  <div className="featured-card-more-2 portfolio-item-link">
                    <img width={23} height={23} alt="" src={ARROW_SRC} className="portfolio-item-arrow item-arrow--hover-out" />
                    <img width={23} height={23} alt="" src={ARROW_SRC} className="portfolio-item-arrow item-arrow--hover-in" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="filters-panel w-form">
        <form className="filter-panel-inner" onSubmit={onSubmit} aria-label="Filter events">
          <div className="filters-list-mobile">
            <select
              id="event-category-mobile"
              className="filter-select-field-mobile w-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory | 'All')}
            >
              <option value="All">All</option>
              {EVENT_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="filters-list" role="radiogroup" aria-label="Event category">
            {(['All', ...EVENT_CATEGORIES] as const).map((item) => {
              const checked = category === item;
              return (
                <label key={item} className="radio-tab w-radio">
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
          <div className="filters-search-block">
            <input
              className="filter-search w-input"
              placeholder="Search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search events"
            />
            <svg className="filters-search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="9" cy="9" r="5.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <button
              type="button"
              className={`clear-search w-inline-block${query ? ' is-active' : ''}`}
              aria-label="Clear search"
              onClick={() => setQuery('')}
            >
              <svg className="clear-search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 7L17 17M17 7L7 17" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
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
