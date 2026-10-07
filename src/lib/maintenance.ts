/**
 * Single source of truth for maintenance mode.
 *
 * The proxy (which rewrites every page request to /maintenance) reads this one
 * flag, so no route can render while registrations are closed.
 *
 * REGISTRATIONS ARE OPEN. To close them again, set this to true and redeploy.
 * Nothing else needs editing.
 */
export const MAINTENANCE_MODE = false;

/** Shown on the maintenance page and returned by /api/register while closed. */
export const MAINTENANCE_BACK_AT = 'Registrations closed';

export const MAINTENANCE_MESSAGE = `Registrations are now closed.`;
