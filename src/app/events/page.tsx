import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import EventsListing from '@/components/EventsListing';

export const metadata: Metadata = {
  title: 'All Events | ChainGPT Labs',
  description: 'Browse upcoming internal and external events from ChainGPT Labs.',
};

export default function EventsIndexPage() {
  return (
    <div className="events-page">
      <SiteHeader />
      <EventsListing />
    </div>
  );
}
