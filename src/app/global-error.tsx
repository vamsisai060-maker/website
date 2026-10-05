'use client';

import Maintenance from '@/components/Maintenance';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body>
        <Maintenance />
      </body>
    </html>
  );
}