export type EventCategory = 'Internal' | 'External';

export type Event = {
  slug: string;
  name: string;
  category: EventCategory;
  teamSize: string;
  date: string;
  blurb: string;
};

export const EVENT_CATEGORIES: EventCategory[] = ['Internal', 'External'];

export const EVENT_ENTRY_FEE = 'FREE';
export const EVENT_PRIZE_POOL = 'Certificate';

export const EVENTS: Event[] = [
  {
    slug: 'chain-reaction-ai',
    name: 'Chain Reaction AI',
    category: 'Internal',
    teamSize: '2–4',
    date: '30-09-2026',
    blurb: 'Build agentic products on-chain in our flagship internal hackathon. Ship a working demo, present to mentors, and leave with a participation certificate.',
  },
  {
    slug: 'web3-game-jam',
    name: 'Web3 Game Jam',
    category: 'External',
    teamSize: '1–3',
    date: '30-09-2026',
    blurb: 'A weekend jam for playable prototypes that mix AI, crypto, and game design. Open to studios and solo builders.',
  },
  {
    slug: 'defi-builder-sprint',
    name: 'DeFi Builder Sprint',
    category: 'Internal',
    teamSize: '3–5',
    date: '30-09-2026',
    blurb: 'An internal Labs sprint focused on DeFi primitives, risk tooling, and on-chain UX.',
  },
  {
    slug: 'pixel-punk-battle',
    name: 'Pixel Punk Battle',
    category: 'External',
    teamSize: 'Solo',
    date: '30-09-2026',
    blurb: 'A community pixel-art battle. Ship a tiny playable in 48 hours and compete for bragging rights.',
  },
  {
    slug: 'onchain-art-fair',
    name: 'Onchain Art Fair',
    category: 'External',
    teamSize: '1–2',
    date: '30-09-2026',
    blurb: 'A public showcase for generative and on-chain art. Exhibit work, meet collectors, and swap process notes.',
  },
  {
    slug: 'agent-arena',
    name: 'Agent Arena',
    category: 'External',
    teamSize: '2–4',
    date: '30-09-2026',
    blurb: 'Open arena for autonomous agents. Pit models against tasks, then demo your stack to the room.',
  },
  {
    slug: 'pixel-forge-cup',
    name: 'Pixel Forge Cup',
    category: 'External',
    teamSize: '1–4',
    date: '30-09-2026',
    blurb: 'External cup for arcade-scale Web3 games. Prototype first, polish later, certificate for every team that ships.',
  },
  {
    slug: 'labs-resident-challenge',
    name: 'Labs Resident Challenge',
    category: 'Internal',
    teamSize: '2–4',
    date: '30-09-2026',
    blurb: 'Internal challenge for Labs residents. Pair with mentors, stress-test your thesis, and present to the cohort.',
  },
];