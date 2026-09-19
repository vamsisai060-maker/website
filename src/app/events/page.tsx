import type { Metadata } from 'next';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteHeader from '@/components/SiteHeader';
import EventsListing from '@/components/EventsListing';

export const metadata: Metadata = {
  title: 'All Events | ChainGPT Labs',
  description: 'Browse upcoming hackathons, game jams, and showcases from ChainGPT Labs.',
};

export default function EventsIndexPage() {
  return (
    <div className="events-page">
      <SiteHeader />
      <div className="mobile-staggered-menu">
        <StaggeredMenu
          position="right"
          colors={['#0e0e0e', '#1b1b1b']}
          items={[
            { label: 'Home', link: '/' },
            { label: 'Our Events', link: '/events' },
            { label: 'Our Visionaries', link: '/#team-section' },
          ]}
          accentColor="#ff7120"
          menuButtonColor="#0e0e0e"
          openMenuButtonColor="#0e0e0e"
          displaySocials={false}
          displayItemNumbering={true}
          isFixed={true}
          logoUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
      </div>
      <EventsListing />
    </div>
  );
}
