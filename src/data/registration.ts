export type FieldKey = 'name' | 'phone' | 'email' | 'branch' | 'year' | 'college';

export type RegisterField = {
  key: FieldKey;
  label: string;
  placeholder: string;
  type: 'text' | 'tel' | 'email';
  required?: boolean;
  numeric?: boolean;
  maxLength?: number;
  options?: string[];
  selectPlaceholder?: string;
};

export type RegistrationConfig = {
  slug: string;
  eventName: string;
  memberSlots: number;
  laptop: string;
  teamLeaderRequired: boolean;
  notes: string;
};

export const CAMPUSES = [
  "ADITYA DEGREE COLLEGE, Gopalapatnam",
  "ADITYA DEGREE COLLEGE, Gopalapatnam Women's",
  "ADITYA DEGREE COLLEGE, Asilmetta",
  "ADITYA DEGREE COLLEGE, Ramnagar",
  "ADITYA DEGREE COLLEGE, Dabagardens",
  "ADITYA DEGREE COLLEGE, Dabagardens Women's",
  "ADITYA DEGREE COLLEGE, Gajuwaka Women's",
];

export const YEARS = ['1st Year', '2nd Year', '3rd Year'];

export const MEMBER_FIELDS: RegisterField[] = [
  { key: 'name', label: 'Full Name', placeholder: '[Name]', type: 'text', required: true },
  { key: 'phone', label: 'Phone', placeholder: '[10-digit number]', type: 'tel', required: true, numeric: true, maxLength: 10 },
  { key: 'email', label: 'Email Address', placeholder: '[you@mail.com]', type: 'email', required: true },
  { key: 'branch', label: 'Branch', placeholder: '[e.g. CSE]', type: 'text', required: true },
  { key: 'year', label: 'Year', placeholder: '[e.g. 3rd]', type: 'text', required: true, options: YEARS, selectPlaceholder: 'Select year' },
  { key: 'college', label: 'Campus', placeholder: '[Campus]', type: 'text', required: true, options: CAMPUSES, selectPlaceholder: 'Select campus' },
];

export const REGISTRATIONS: Record<string, RegistrationConfig> = {
  'game-verse': {
    slug: 'game-verse',
    eventName: 'Game Verse',
    memberSlots: 2,
    laptop: 'Laptop required',
    teamLeaderRequired: true,
    notes: 'Teammates must be from different colleges. Team leader registers all members.',
  },
  '3minds-1mission': {
    slug: '3minds-1mission',
    eventName: '3 Minds 1 Mission',
    memberSlots: 3,
    laptop: 'At least one laptop per team',
    teamLeaderRequired: true,
    notes: 'Team leader registers all members on behalf of the team.',
  },
  'see-it-prompt-it': {
    slug: 'see-it-prompt-it',
    eventName: 'See It Prompt It',
    memberSlots: 3,
    laptop: 'Laptop required',
    teamLeaderRequired: true,
    notes: 'Exact team size and final details to be announced.',
  },
  'logical-duo': {
    slug: 'logical-duo',
    eventName: 'Logical Duo',
    memberSlots: 2,
    laptop: 'No laptop required',
    teamLeaderRequired: true,
    notes: 'A team leader is required to register.',
  },
  'error-404': {
    slug: 'error-404',
    eventName: 'Error 404',
    memberSlots: 3,
    laptop: 'No laptop required',
    teamLeaderRequired: true,
    notes: 'Exact team size and final details to be announced.',
  },
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateField(field: RegisterField, value: string): string | null {
  const trimmed = value.trim();
  if (field.required && trimmed === '') {
    return 'This field is required';
  }
  if (trimmed === '') {
    return null;
  }
  if (field.key === 'phone' && !/^\d{10}$/.test(trimmed)) {
    return 'Enter a valid 10-digit mobile number';
  }
  if (field.key === 'email' && !EMAIL_RE.test(trimmed)) {
    return 'Enter a valid email address';
  }
  return null;
}