export type EventCategory = 'External';

export type Event = {
  slug: string;
  name: string;
  category: EventCategory;
  teamSize: string;
  date: string;
  blurb: string;
};

export const EVENT_CATEGORIES: EventCategory[] = ['External'];

export const EVENT_ENTRY_FEE = 'FREE';
export const EVENT_PRIZE_POOL = 'Certificate';

export const EVENTS: Event[] = [
  {
    slug: 'game-verse',
    name: 'Game Verse',
    category: 'External',
    teamSize: '2',
    date: '30-09-2026',
    blurb: 'A competitive gaming challenge for teams of two. Laptop required, and teammates from the same college are not allowed.',
  },
  {
    slug: '3minds-1mission',
    name: '3Minds 1Mission',
    category: 'External',
    teamSize: '3',
    date: '30-09-2026',
    blurb: 'A three-member team challenge built on collaboration and problem-solving. Exactly three members are compulsory, at least one laptop is required, and the team leader registers all members.',
  },
  {
    slug: 'see-it-prompt-it',
    name: 'See It, Prompt It',
    category: 'External',
    // teamSize unconfirmed
    teamSize: 'TBD',
    date: '30-09-2026',
    blurb: 'A team prompt-engineering challenge where participants turn what they see into effective prompts. Laptop required.',
  },
  {
    slug: 'logical-duo',
    name: 'Logical Duo',
    category: 'External',
    teamSize: '2',
    date: '30-09-2026',
    blurb: 'A two-member logical thinking challenge that tests teamwork and reasoning. No laptop required, but a team leader is required.',
  },
  {
    slug: 'error-404',
    name: 'ERROR 404',
    category: 'External',
    // teamSize unconfirmed
    teamSize: 'TBD',
    date: '30-09-2026',
    blurb: 'A wrong-answers challenge where teams give unexpected answers. No laptop required.',
  },
];