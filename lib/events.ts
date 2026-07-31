import { daysFromNow, formatLongDate, nextFirstWeekdayOfMonth } from "@/lib/relativeDates";

/** Friday = 5 (first Friday of the month — matches marketing copy) */
const FRIDAY = 5;

// Two upcoming "first Friday of the month" consultation dates, guaranteed
// to be a full calendar month apart regardless of whether this month's has
// already passed (nextFirstWeekdayOfMonth(_, 0) may itself roll to next month).
const firstConsultation = nextFirstWeekdayOfMonth(FRIDAY, 0);
const monthsUntilFirst =
  (firstConsultation.getFullYear() - new Date().getFullYear()) * 12 +
  (firstConsultation.getMonth() - new Date().getMonth());
const secondConsultation = nextFirstWeekdayOfMonth(FRIDAY, monthsUntilFirst + 1);

export interface CircleEvent {
  id: number;
  title: string;
  date: string;
  startTime: string; // "9:00" 24h-ish label used to build the .ics file
  time: string;
  format: string;
  category: string;
  description: string;
  ceus: number | null;
  rsvp: boolean;
  spots: number | null;
  startHour: number; // for .ics generation
  durationMinutes: number;
}

export const EVENTS: CircleEvent[] = [
  {
    id: 1,
    title: "Monthly case consultation",
    date: formatLongDate(firstConsultation),
    startTime: "9:00am",
    time: "9:00 – 11:00am",
    format: "Virtual (Zoom)",
    category: "Consultation",
    description: "Our monthly group case consultation. Bring a case you're working with, or come to support peers. Led by Sarah Arnold, LPC-S. Zoom link sent 24 hours before.",
    ceus: 1.5,
    rsvp: true,
    spots: null,
    startHour: 9,
    durationMinutes: 120,
  },
  {
    id: 2,
    title: "Practice building workshop: Setting your fee",
    date: formatLongDate(daysFromNow(22)),
    startTime: "12:00pm",
    time: "12:00 – 1:00pm",
    format: "Virtual (Zoom)",
    category: "Workshop",
    description: "A practical workshop on fee setting, sliding scale considerations, and communicating rates with confidence. Led by Sarah Arnold.",
    ceus: null,
    rsvp: false,
    spots: 20,
    startHour: 12,
    durationMinutes: 60,
  },
  {
    id: 3,
    title: "Trauma-informed care: CEU training",
    date: formatLongDate(daysFromNow(31)),
    startTime: "10:00am",
    time: "10:00am – 12:00pm",
    format: "Virtual (Zoom)",
    category: "CEU",
    description: "A 2-hour CEU training on applying trauma-informed principles across clinical presentations. Guest presenter TBD. 2.0 CEU credits.",
    ceus: 2.0,
    rsvp: false,
    spots: 30,
    startHour: 10,
    durationMinutes: 120,
  },
  {
    id: 4,
    title: "Monthly case consultation",
    date: formatLongDate(secondConsultation),
    startTime: "9:00am",
    time: "9:00 – 11:00am",
    format: "Virtual (Zoom)",
    category: "Consultation",
    description: "Monthly case consultation group.",
    ceus: 1.5,
    rsvp: false,
    spots: null,
    startHour: 9,
    durationMinutes: 120,
  },
  {
    id: 5,
    title: "Burnout prevention: clinician self-care",
    date: formatLongDate(daysFromNow(56)),
    startTime: "1:00pm",
    time: "1:00 – 2:30pm",
    format: "Virtual (Zoom)",
    category: "Self-Care",
    description: "A workshop focused on sustainable clinical practice, identifying early burnout signs and building personal structures for longevity.",
    ceus: null,
    rsvp: false,
    spots: 25,
    startHour: 13,
    durationMinutes: 90,
  },
];
