// Generates a minimal RFC 5545 .ics file client-side — no server/DB needed,
// works for any event with a real date + start hour/duration.

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIcsDate(d: Date) {
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    "00Z"
  );
}

export function downloadIcsEvent(params: {
  title: string;
  description: string;
  dateLabel: string; // e.g. "Friday, May 1, 2026" — parsed to get the calendar date
  startHour: number;
  durationMinutes: number;
}) {
  const parsed = new Date(params.dateLabel);
  parsed.setHours(params.startHour, 0, 0, 0);
  const start = parsed;
  const end = new Date(start.getTime() + params.durationMinutes * 60000);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Austin Clinician Circle//Events//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@thecircle`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${params.title}`,
    `DESCRIPTION:${params.description.replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${params.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
