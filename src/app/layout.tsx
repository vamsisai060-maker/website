import type { Metadata } from 'next';
import './globals.css';
import './webflow.css';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'ChainGPT Labs Replica | Next.js Engine',
  description: 'AI & Web3 Incubation Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--lightgrey)] text-[var(--dark)] antialiased selection:bg-orange-500 selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
