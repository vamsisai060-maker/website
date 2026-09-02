export type Event = {
  slug: string;
  name: string;
  category: string;
  entryFee: string;
  teamSize: string;
  prizePool: string;
  slotsLeft: number;
};

export const EVENTS: Event[] = [
  {
    slug: 'chain-reaction-ai',
    name: 'Chain Reaction AI',
    category: 'Hackathon',
    entryFee: '$50',
    teamSize: '2–4',
    prizePool: '$25,000',
    slotsLeft: 12,
  },
  {
    slug: 'web3-game-jam',
    name: 'Web3 Game Jam',
    category: 'Game Jam',
    entryFee: '$25',
    teamSize: '1–3',
    prizePool: '$10,000',
    slotsLeft: 28,
  },
  {
    slug: 'defi-builder-sprint',
    name: 'DeFi Builder Sprint',
    category: 'Hackathon',
    entryFee: '$75',
    teamSize: '3–5',
    prizePool: '$40,000',
    slotsLeft: 6,
  },
  {
    slug: 'pixel-punk-battle',
    name: 'Pixel Punk Battle',
    category: 'Game Jam',
    entryFee: 'Free',
    teamSize: 'Solo',
    prizePool: '$5,000',
    slotsLeft: 80,
  },
  {
    slug: 'onchain-art-fair',
    name: 'Onchain Art Fair',
    category: 'Showcase',
    entryFee: '$30',
    teamSize: '1–2',
    prizePool: '$15,000',
    slotsLeft: 40,
  },
  {
    slug: 'agent-arena',
    name: 'Agent Arena',
    category: 'Hackathon',
    entryFee: '$60',
    teamSize: '2–4',
    prizePool: '$30,000',
    slotsLeft: 18,
  },
];
