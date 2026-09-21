import type { Metadata } from 'next';
import './globals.css';
import './webflow.css';
import SmoothScroll from '@/components/SmoothScroll';
import PageTransition from '@/components/PageTransition';
import PageTransitionView from '@/components/PageTransitionView';
import Preloader from '@/components/Preloader';

export const metadata: Metadata = {
  title: 'Astra 2K26',
  description: 'AI & Web3 Incubation Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--lightgrey)] text-[var(--dark)] antialiased selection:bg-orange-500 selection:text-white">
        <SmoothScroll>
          <Preloader />
          <PageTransitionView>{children}</PageTransitionView>
          <PageTransition />
        </SmoothScroll>
      </body>
    </html>
  );
}
