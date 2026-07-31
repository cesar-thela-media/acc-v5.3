/**
 * Shared demo events for admin calendar ↔ member events.
 * Client-only localStorage — presentation walkthrough, no backend.
 */

import {
  daysFromNow,
  formatAbbrevDate,
  nextFirstWeekdayOfMonth,
} from "@/lib/relativeDates";

export const DEMO_EVENTS_KEY = "acc-demo-events";

/** Friday = 5 (first Friday of the month — matches marketing copy) */
const FRIDAY = 5;
const firstConsultation = nextFirstWeekdayOfMonth(FRIDAY, 0);
const monthsUntilFirst =
  (firstConsultation.getFullYear() - new Date().getFullYear()) * 12 +
  (firstConsultation.getMonth() - new Date().getMonth());
const secondConsultation = nextFirstWeekdayOfMonth(FRIDAY, monthsUntilFirst + 1);

export type DemoEvent = {
  id: number;
  title: string;
  /** Abbrev label e.g. "Aug 6, 2026" — used by admin grid + member list */
  date: string;
  time: string;
  format: string;
  category: string;
  description: string;
  ceus: number | null;
  rsvpCount: number;
  spots: number | null;
  startTime: string;
  startHour: number;
  durationMinutes: number;
};

export const SEED_DEMO_EVENTS: DemoEvent[] = [
  {
    id: 1,
    title: "Monthly case consultation",
    date: formatAbbrevDate(firstConsultation),
    time: "9:00 – 11:00am",
    format: "Virtual (Zoom)",
    category: "Consultation",
    description:
      "Our monthly group case consultation. Bring a case you're working with, or come to support peers. Led by Sarah Arnold, LPC-S. Zoom link sent 24 hours before.",
    ceus: 1.5,
    rsvpCount: 9,
    spots: null,
    startTime: "9:00am",
    startHour: 9,
    durationMinutes: 120,
  },
  {
    id: 2,
    title: "Practice building workshop: Setting your fee",
    date: formatAbbrevDate(daysFromNow(22)),
    time: "12:00 – 1:00pm",
    format: "Virtual (Zoom)",
    category: "Workshop",
    description:
      "A practical workshop on fee setting, sliding scale considerations, and communicating rates with confidence. Led by Sarah Arnold.",
    ceus: null,
    rsvpCount: 4,
    spots: 20,
    startTime: "12:00pm",
    startHour: 12,
    durationMinutes: 60,
  },
  {
    id: 3,
    title: "Trauma-informed care: CEU training",
    date: formatAbbrevDate(daysFromNow(31)),
    time: "10:00am – 12:00pm",
    format: "Virtual (Zoom)",
    category: "CEU",
    description:
      "A 2-hour CEU training on applying trauma-informed principles across clinical presentations. 2.0 CEU credits.",
    ceus: 2.0,
    rsvpCount: 11,
    spots: 30,
    startTime: "10:00am",
    startHour: 10,
    durationMinutes: 120,
  },
  {
    id: 4,
    title: "Monthly case consultation",
    date: formatAbbrevDate(secondConsultation),
    time: "9:00 – 11:00am",
    format: "Virtual (Zoom)",
    category: "Consultation",
    description: "Monthly case consultation group.",
    ceus: 1.5,
    rsvpCount: 0,
    spots: null,
    startTime: "9:00am",
    startHour: 9,
    durationMinutes: 120,
  },
  {
    id: 5,
    title: "Burnout prevention: clinician self-care",
    date: formatAbbrevDate(daysFromNow(56)),
    time: "1:00 – 2:30pm",
    format: "Virtual (Zoom)",
    category: "Self-Care",
    description:
      "A workshop focused on sustainable clinical practice, identifying early burnout signs and building personal structures for longevity.",
    ceus: null,
    rsvpCount: 2,
    spots: 25,
    startTime: "1:00pm",
    startHour: 13,
    durationMinutes: 90,
  },
];

export function defaultDescription(category: string, title: string) {
  return `${title}. ${category} session for Austin Clinician Circle members.`;
}
