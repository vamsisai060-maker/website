export type EventCategory = 'External';

export type Event = {
  slug: string;
  name: string;
  category: EventCategory;
  teamSize: string;
  date: string;
  blurb: string;
  image: string;
};

export const EVENT_CATEGORIES: EventCategory[] = ['External'];

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
    category: 'External',
    teamSize: '2',
    date: '28-09-2026',
    blurb: 'A competitive gaming challenge for teams of two. Laptop required, and teammates from the same college are not allowed.',
    image: '/gameverse.png',
  },
  {
    slug: '3minds-1mission',
    name: '3Minds 1Mission',
    category: 'External',
    teamSize: '3',
    date: '28-09-2026',
    blurb: 'A three-member team challenge built on collaboration and problem-solving. Exactly three members are compulsory, at least one laptop is required, and the team leader registers all members.',
    image: '/3minds%201%20mission.png',
  },
  {
    slug: 'see-it-prompt-it',
    name: 'See It, Prompt It',
    category: 'External',
    teamSize: '1',
    date: '29-09-2026',
    blurb: 'A solo prompt-engineering challenge where participants turn what they see into effective prompts. Laptop required.',
    image: '/seeit%20promptit.png',
  },
  {
    slug: 'logical-duo',
    name: 'Logical Duo',
    category: 'External',
    teamSize: '2',
    date: '29-09-2026',
    blurb: 'A two-member logical thinking challenge that tests teamwork and reasoning. No laptop required, but a team leader is required.',
    image: '/logical%20duo.png',
  },
  {
    slug: 'error-404',
    name: 'ERROR 404',
    category: 'External',
    teamSize: '1',
    date: '28-09-2026',
    blurb: 'A wrong-answers challenge where participants give unexpected answers. No laptop required.',
    image: '/404error.png',
  },
];

export const EVENTS: Event[] = [...eventsByDate].sort(
  (a, b) => dateKey(a.date) - dateKey(b.date)
);