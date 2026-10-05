'use client';

import { MAINTENANCE_BACK_AT } from '@/lib/maintenance';

export default function Maintenance() {
  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-[var(--lightgrey)] px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Website Under Maintenance
        </h1>
        <p className="text-lg md:text-xl mb-4">
          Registrations have been temporarily stopped.
        </p>
        <p className="text-base md:text-lg mb-8">
          We&apos;ll be back at <strong>{MAINTENANCE_BACK_AT}</strong>.
        </p>
        <p className="text-sm text-gray-600">Thank you for your patience!</p>
      </div>
    </div>
  );
}
