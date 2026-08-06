/**
 * Canonical membership carousel slides + public image paths.
 * Keep paths here so homepage (and any reuse) cannot drift.
 *
 * Images live in /public as optimized JPEGs. Raw designer dumps go in
 * _source-assets/ (gitignored) — never commit multi‑MB source PNGs.
 *
 * Image direction (Sarah): more variety, less corporate “lots of people.”
 * Keep the feel of CE, directory, and private coaching; prefer new art for
 * resource library + consultation or online community when dumps change.
 *
 * Uniqueness: every major homepage path is listed once in
 * `homepageMajorImagePaths()`. Do not reuse `/private-practice-can.jpg`
 * (section 2) or CTA filmstrip sources inside the carousel.
 */

export type MembershipItem = {
  title: string;
  badge: string;
  body: string;
  /** Absolute public path, e.g. /membership-consultation.jpg */
  img: string;
};

export const MEMBERSHIP_ITEMS: MembershipItem[] = [
  {
    title: "Monthly case consultation",
    badge: "Consultation",
    body: "A structured consultation group led by Sarah Arnold, LPC-S. Bring a real case, get real support from peers who understand the clinical realities of your work.",
    // Generated warm peer case discussion — NOT admin-login-bg chair still-life
    img: "/membership-consultation-d.jpg",
  },
  {
    title: "Curated resource library",
    badge: "Resources",
    body: "Clinical tools, handouts, and business guides, organized, downloadable, and built for active private practice.",
    // Still-life tools/planner — reserved for carousel (not CTA filmstrip)
    img: "/membership-resources-b.jpg",
  },
  {
    // Referrals (not a second “community” card). Garden art moved to Private online community per Sarah.
    title: "Referral network",
    badge: "Referrals",
    body: "A trusted, vetted circle of clinicians. Get referred, refer with confidence. Build relationships that last longer than a single consult.",
    img: "/membership-referral.jpg",
  },
  {
    title: "Continuing education",
    badge: "CEUs",
    body: "CEU trainings each month on clinical and business topics, all virtual, all archived, and all included in your membership.",
    // Warm solo laptop (Sarah-liked feel) — new path so Next never serves cached whiteboard
    img: "/membership-ce-b.jpg",
  },
  {
    // Title: Member Directory (Sarah OK). Body restored from v5 “previous version” screenshot.
    title: "Member Directory",
    badge: "Directory",
    body: "A professionally crafted listing in our public clinician directory, searchable by specialty, format, and availability. Clients find you here.",
    // Generated warm still-life (notebook + cards) — not Yellowstone map, not peers photo
    img: "/membership-directory-c.jpg",
  },
  {
    title: "Practice coaching access",
    badge: "Coaching",
    body: "Discounted one-on-one practice-building sessions with Sarah Arnold, LPC-S on fees, marketing, burnout, and long-term sustainability.",
    img: "/membership-coaching.jpg",
  },
  {
    title: "Professional Will designation",
    badge: "Will Planning",
    body: "Guidance and structure for putting a professional will in place so your practice is cared for responsibly.",
    img: "/membership-will.jpg",
  },
  {
    title: "Private online community",
    badge: "Community",
    body: "A private online community for real-time support, connection, and steady encouragement between meetings.",
    // Sarah: use garden/patio image (was on Peer consultation card) — keep this wording
    img: "/membership-peers-d.jpg",
  },
];

/**
 * Homepage CTA filmstrip. Must not reuse carousel filenames or
 * `/private-practice-can.jpg`. Avoid cta-2 / cta-5 — those pixels were
 * copied into membership-resources-b / membership-community-b.
 */
export const CTA_FILMSTRIP = [
  { src: "/cta-1.jpg", height: "h-[154px] md:h-[214px]" },
  { src: "/cta-3.jpg", height: "h-[244px] md:h-[324px]" },
  { src: "/cta-4.jpg", height: "h-[176px] md:h-[226px]" },
  { src: "/cta-6.jpg", height: "h-[230px] md:h-[300px]" },
  { src: "/believe-professional.jpg", height: "h-[154px] md:h-[214px]" },
  { src: "/believe-sustainable.jpg", height: "h-[188px] md:h-[268px]" },
] as const;

/** Major homepage photo slots — paths must be unique (one use each). */
export function homepageMajorImagePaths(): string[] {
  return [
    "/private-practice-can.jpg",
    "/hero-bg-2.jpg",
    "/pricing-bg.jpg",
    "/testimonials-cta-bg.jpg",
    ...MEMBERSHIP_ITEMS.map((i) => i.img),
    ...CTA_FILMSTRIP.map((i) => i.src),
  ];
}
