/**
 * Single source of truth for maintenance mode.
 *
 * Both the proxy (which rewrites every page request to /maintenance) and the
 * registration endpoint (which returns 503) read this one flag, so they can
 * never disagree and leave the site half-open.
 *
 * To bring registrations back, set this to false. Nothing else needs editing.
 */
export const MAINTENANCE_MODE = true;

/** Shown on the maintenance page and returned by /api/register while closed. */
export const MAINTENANCE_BACK_AT = '8 PM today';

export const MAINTENANCE_MESSAGE = `Registrations are temporarily stopped. We will be back at ${MAINTENANCE_BACK_AT}.`;
