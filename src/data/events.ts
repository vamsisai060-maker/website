export type EventCategory = 'Internal';

export const EVENT_SESSIONS = ['Morning', 'Afternoon'] as const;

export type EventSession = (typeof EVENT_SESSIONS)[number];

export const SESSION_TIMES: Record<EventSession, string> = {
  Morning: '9:30 AM',
  Afternoon: '1:30 PM',
};

export type Event = {
  slug: string;
  name: string;
  category: EventCategory;
  session: EventSession;
  teamSize: string;
  date: string;
  blurb: string;
  description: string;
  image: string;
};

export const EVENT_ENTRY_FEE = 'FREE';
export const EVENT_PRIZE_POOL = 'Certificate';

const dateKey = (date: string) => {
  const [d, m, y] = date.split('-').map(Number);
  return y * 10000 + m * 100 + d;
};

const eventsByDate: Event[] = [
  {
    slug: 'game-verse',
    name: 'Game Verse',
    category: 'Internal',
    session: 'Afternoon',
    teamSize: '2',
    date: '06-10-2026',
    blurb: 'A competitive gaming challenge for teams of two. Laptop required, and teammates from the same college are not allowed.',
    description:
      'Game Verse is a competitive gaming challenge built for teams of exactly two. Each team must bring a laptop, and teammates from the same college are not allowed, so you will be pushed to compete alongside someone new. The event rewards coordination, quick decision-making, and head-to-head performance.',
    image: '/gameverse.png',
  },
  {
    slug: '3minds-1mission',
    name: '3Minds 1Mission',
    category: 'Internal',
    session: 'Morning',
    teamSize: '3',
    date: '06-10-2026',
    blurb: 'A three-member team challenge built on collaboration and problem-solving. Exactly three members are compulsory, at least one laptop is required, and the team leader registers all members.',
    description:
      '3Minds 1Mission is a collaborative problem-solving challenge played by teams of exactly three. A full team of three is compulsory, and at least one laptop is required per team. One member acts as the team leader and registers all members, keeping the entire team under a single registration.',
    image: '/3minds%201%20mission.png',
  },
  {
    slug: 'slides-on-spot',
    name: 'Slides On Spot',
    category: 'Internal',
    session: 'Morning',
    teamSize: '2',
    date: '06-10-2026',
    blurb: 'A two-member presentation event where the topic is handed to you on the spot. A laptop and a team leader are required.',
    description:
      'Slides On Spot is a two-member presentation challenge. Teams receive a topic on the spot, then build and present a slide deck on it — testing how fast a pair can think, structure, and speak. A laptop is required to prepare and present the deck. As with every team event, a team leader is required to register the pair.',
    image: '/slides-on-spot.png',
  },
  {
    slug: 'logical-duo',
    name: 'Logical Duo',
    category: 'Internal',
    session: 'Morning',
    teamSize: '2',
    date: '07-10-2026',
    blurb: 'A two-member logical thinking challenge that tests teamwork and reasoning. No laptop required, but a team leader is required.',
    description:
      'Logical Duo is a two-member challenge centred on teamwork and reasoning. No laptop is required, so the focus stays purely on logic, communication, and quick thinking. As with every team event, a team leader is required to register the pair.',
    image: '/logical%20duo.png',
  },
  {
    slug: 'error-404',
    name: 'Error 404',
    category: 'Internal',
    session: 'Afternoon',
    teamSize: '1',
    date: '07-10-2026',
    blurb: 'A solo debugging sprint to find what broke and fix it before the clock runs out. A laptop is optional.',
    description:
      'Error 404 is a solo debugging sprint. You are handed a broken build and a ticking timer, and the only way out is to trace the fault, repair it, and ship the fix. There are no teammates to fall back on, so every decision is yours. A laptop is optional — the round is set up so you can still take part without one.',
    image: '/error-404.png',
  },
  {
    slug: 'see-it-prompt-it',
    name: 'See It, Prompt It',
    category: 'Internal',
    session: 'Morning',
    teamSize: '1',
    date: '07-10-2026',
    blurb: 'A solo prompt-engineering challenge where participants turn what they see into effective prompts. Laptop required.',
    description:
      'See It, Prompt It is a solo prompt-engineering challenge. Participants look at what they see, then turn it into an effective prompt — testing observation, clarity, and control over AI output. A laptop is required, and each participant competes entirely on their own.',
    image: '/seeit%20promptit.png',
  },
];

export const EVENTS: Event[] = [...eventsByDate].sort(
  (a, b) => dateKey(a.date) - dateKey(b.date)
);

/* ------------------------------------------------------------------ *
 * Session slots — the rule the whole site is built around
 * ------------------------------------------------------------------ */

/**
 * Two events clash when they run in the same slot, i.e. the same day *and* the
 * same session. A person may hold one registration per slot and no more, so
 * the current timetable gives every participant at most four registrations:
 *
 *   06-10-2026  Morning    9:30 AM   3Minds 1Mission | Slides On Spot
 *   06-10-2026  Afternoon  1:30 PM   Game Verse
 *   07-10-2026  Morning    9:30 AM   Logical Duo     | See It, Prompt It
 *   07-10-2026  Afternoon  1:30 PM   Error 404
 *
 * Keep this in step with EVENT_TABS in google-apps-script/Code.gs, which
 * enforces the same rule on the sheet.
 */
export type EventSlot = { date: string; session: EventSession; time: string };

export function slotOf(slug: string): EventSlot | undefined {
  const event = EVENTS.find((item) => item.slug === slug);
  if (!event) return undefined;
  return { date: event.date, session: event.session, time: SESSION_TIMES[event.session] };
}

const slotKey = (date: string, session: EventSession) => `${date}|${session}`;

/** Events that run at the very same hour as `slug`, so a team cannot span them. */
export function clashingEvents(slug: string): Event[] {
  const event = EVENTS.find((item) => item.slug === slug);
  if (!event) return [];
  const key = slotKey(event.date, event.session);
  return EVENTS.filter((item) => item.slug !== slug && slotKey(item.date, item.session) === key);
}

/** Events a participant can still register for once they hold `slug`. */
export function otherSlots(slug: string): Event[] {
  const event = EVENTS.find((item) => item.slug === slug);
  if (!event) return [];
  const key = slotKey(event.date, event.session);
  return EVENTS.filter((item) => slotKey(item.date, item.session) !== key);
}