import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { MEMBERSHIP_BENEFITS } from "./membershipBenefits";
import {
  CTA_FILMSTRIP,
  MEMBERSHIP_ITEMS,
  homepageMajorImagePaths,
} from "./membershipAssets";
import { findDuplicateImagePaths } from "./navShell";

const ROOT = join(import.meta.dirname, "..");

/** Exact 10-item list from Sarah’s reference image (CEU → Continuing Education Credits). */
const EXPECTED_TEN = [
  "Monthly case consultation group",
  "Continuing Education Credits",
  "Curated resource library",
  "Public clinician directory listing",
  "Vetted referral network access",
  "Practice marketing and business guidance",
  "Mindfulness and burnout prevention resources",
  "Discounted coaching with Sarah Arnold, LPC-S",
  "Professional Will designation",
  "Private online community for real-time support",
] as const;

describe("MEMBERSHIP_BENEFITS (shipped checklist)", () => {
  it("is the 10-item Sarah reference list in order", () => {
    assert.equal(MEMBERSHIP_BENEFITS.length, 10);
    assert.deepEqual([...MEMBERSHIP_BENEFITS], [...EXPECTED_TEN]);
  });

  it("puts Continuing Education Credits second; no legacy CEU/discount labels", () => {
    assert.equal(MEMBERSHIP_BENEFITS[0], "Monthly case consultation group");
    assert.equal(MEMBERSHIP_BENEFITS[1], "Continuing Education Credits");
    const joined = MEMBERSHIP_BENEFITS.join(" | ").toLowerCase();
    assert.equal(joined.includes("ceu trainings"), false);
    assert.equal(joined.includes("continuing education discounts"), false);
  });

  it("is imported by home and What We Offer pricing pages", () => {
    const home = readFileSync(join(ROOT, "app/(public)/page.tsx"), "utf8");
    const offer = readFileSync(join(ROOT, "app/(public)/what-we-offer/page.tsx"), "utf8");
    assert.match(home, /MEMBERSHIP_BENEFITS/);
    assert.match(offer, /MEMBERSHIP_BENEFITS/);
    assert.match(home, /Membership Benefits/);
    assert.equal(home.includes("Simple, all-inclusive pricing"), false);
    assert.equal(home.includes("all-inclusive pricing"), false);
  });
});

describe("Public playbook unlisted", () => {
  it("removes Free playbook from PublicNav and sitemap; leadmagnet redirects", () => {
    const nav = readFileSync(join(ROOT, "components/layout/PublicNav.tsx"), "utf8");
    const sitemap = readFileSync(join(ROOT, "app/sitemap.ts"), "utf8");
    const lead = readFileSync(join(ROOT, "app/(public)/leadmagnet/page.tsx"), "utf8");
    assert.equal(nav.includes("Free playbook"), false);
    assert.equal(nav.includes("/leadmagnet"), false);
    assert.equal(sitemap.includes("/leadmagnet"), false);
    assert.match(lead, /HIDE_LEADMAGNET/);
    assert.match(lead, /handleSubmit/);
    assert.match(lead, /redirect\(/);
  });
});

describe("Consultation window 9–11am Friday", () => {
  it("states first Friday 9–11am on What We Offer + FAQ (not Thursday/10:30)", () => {
    const offer = readFileSync(join(ROOT, "app/(public)/what-we-offer/page.tsx"), "utf8");
    assert.match(offer, /9:00 to 11:00am/);
    const consultationBlocks = offer.match(/first Friday[\s\S]{0,220}/g) ?? [];
    assert.ok(consultationBlocks.length >= 2);
    for (const block of consultationBlocks) {
      assert.equal(block.includes("10:30"), false, block);
      assert.equal(block.includes("Thursday"), false, block);
      assert.match(block, /11:00am|9:00 to 11/);
    }
    assert.equal(offer.includes("first Thursday"), false);
  });

  it("uses 9:00 – 11:00am and Friday weekday for demo consultation events", () => {
    const demo = readFileSync(join(ROOT, "lib/demo-events.ts"), "utf8");
    const events = readFileSync(join(ROOT, "lib/events.ts"), "utf8");
    assert.equal(demo.includes("10:30"), false);
    assert.equal(events.includes("10:30"), false);
    assert.match(demo, /9:00 – 11:00am/);
    assert.match(events, /9:00 – 11:00am/);
    assert.match(demo, /FRIDAY\s*=\s*5/);
    assert.match(events, /FRIDAY\s*=\s*5/);
  });
});

describe("MembershipCarousel text position", () => {
  it("shows full body copy without line-clamp ellipsis", () => {
    const src = readFileSync(join(ROOT, "components/landing/MembershipCarousel.tsx"), "utf8");
    // Tailwind clamp utilities (not the word in a comment)
    assert.equal(/\bline-clamp-\d+\b/.test(src), false, "line-clamp-N causes Sarah-visible … truncation");
    assert.match(src, /slide\.description/);
    assert.equal(src.includes("bottom-4 left-3"), false);
  });
});

describe("MEMBERSHIP_ITEMS public images", () => {
  it("maps 8 slides to existing non-empty public JPEGs with unique paths", () => {
    assert.equal(MEMBERSHIP_ITEMS.length, 8);
    const paths = MEMBERSHIP_ITEMS.map((i) => i.img);
    assert.equal(new Set(paths).size, paths.length, "duplicate img paths");
    for (const item of MEMBERSHIP_ITEMS) {
      assert.match(item.img, /^\/membership-.+\.jpg$/);
      const abs = join(ROOT, "public", item.img.replace(/^\//, ""));
      assert.equal(existsSync(abs), true, `missing ${item.img}`);
      const st = statSync(abs);
      assert.ok(st.size > 10_000, `${item.img} too small (${st.size})`);
      // JPEG SOI marker
      const buf = readFileSync(abs);
      assert.equal(buf[0], 0xff);
      assert.equal(buf[1], 0xd8);
    }
  });

  it("has no Peer consultation card; Referrals + Private community stay distinct", () => {
    const referrals = MEMBERSHIP_ITEMS.find((i) => i.badge === "Referrals");
    const community = MEMBERSHIP_ITEMS.find((i) => i.badge === "Community");
    const dir = MEMBERSHIP_ITEMS.find((i) => i.badge === "Directory");
    assert.ok(referrals, "Referrals badge must exist (v5 text parity)");
    assert.ok(community, "Community badge must exist");
    assert.equal(MEMBERSHIP_ITEMS.some((i) => i.badge === "Peers"), false, "Peers badge was unsolicited");
    assert.equal(
      MEMBERSHIP_ITEMS.some((i) => /peer consultation/i.test(i.title)),
      false,
      "Peer consultation community card must be removed",
    );
    assert.equal(referrals!.title, "Referral network");
    assert.match(referrals!.body, /vetted|refer/i);
    assert.equal(community!.title, "Private online community");
    assert.match(community!.body, /private online community for real-time support/i);
    // Garden/patio art lives on Private online community (Sarah image swap)
    assert.equal(community!.img, "/membership-peers-d.jpg");
    assert.notEqual(referrals!.img, community!.img);
    assert.ok(dir);
    assert.notEqual(referrals!.img, dir!.img);
    const refAbs = join(ROOT, "public", referrals!.img.replace(/^\//, ""));
    assert.equal(existsSync(refAbs), true, `missing ${referrals!.img}`);
    const comAbs = join(ROOT, "public", community!.img.replace(/^\//, ""));
    assert.equal(existsSync(comAbs), true, `missing ${community!.img}`);
  });

  it("Member Directory keeps title family and restores v5 description copy", () => {
    const dir = MEMBERSHIP_ITEMS.find((i) => i.badge === "Directory");
    assert.ok(dir);
    assert.match(dir!.title, /^Member [Dd]irectory/);
    assert.equal(
      dir!.body,
      "A professionally crafted listing in our public clinician directory, searchable by specialty, format, and availability. Clients find you here.",
    );
    // Not the tentative “at launch / focus stays on consultation” rewrite
    assert.equal(dir!.body.toLowerCase().includes("planned for launch"), false);
    assert.equal(dir!.body.toLowerCase().includes("until then"), false);
  });

  it("consultation is not the admin-login chair still-life", () => {
    const consult = MEMBERSHIP_ITEMS.find((i) => i.badge === "Consultation");
    assert.ok(consult);
    assert.notEqual(consult!.img, "/admin-login-bg.jpg");
    assert.notEqual(consult!.img, "/membership-consultation-c.jpg");
    const consultBuf = readFileSync(join(ROOT, "public", consult!.img.replace(/^\//, "")));
    const adminBuf = readFileSync(join(ROOT, "public/admin-login-bg.jpg"));
    assert.equal(consultBuf.equals(adminBuf), false, "Consultation ≠ admin login bg");
  });

  it("CEUs uses warm laptop JPEG, not corporate whiteboard (believe-clinical)", () => {
    const ce = MEMBERSHIP_ITEMS.find((i) => i.badge === "CEUs");
    assert.ok(ce, "CEUs slide must exist in MEMBERSHIP_ITEMS");
    // Dedicated path (not historically cached whiteboard URL)
    assert.match(ce!.img, /^\/membership-ce/);
    assert.notEqual(ce!.img, "/believe-clinical.jpg");
    assert.notEqual(ce!.img, "/membership-consultation-b.jpg");
    const ceAbs = join(ROOT, "public", ce!.img.replace(/^\//, ""));
    assert.equal(existsSync(ceAbs), true, `missing ${ce!.img}`);
    const ceBuf = readFileSync(ceAbs);
    assert.ok(ceBuf.length > 20_000);
    assert.equal(ceBuf[0], 0xff);
    assert.equal(ceBuf[1], 0xd8);
    const wbAbs = join(ROOT, "public/believe-clinical.jpg");
    assert.equal(existsSync(wbAbs), true);
    const wbBuf = readFileSync(wbAbs);
    assert.equal(ceBuf.equals(wbBuf), false, "CEUs must not be whiteboard believe-clinical bytes");
    // Homepage maps MEMBERSHIP_ITEMS.img straight into the carousel
    const home = readFileSync(join(ROOT, "app/(public)/page.tsx"), "utf8");
    assert.match(home, /MEMBERSHIP_ITEMS/);
    assert.match(home, /image:\s*item\.img/);
  });

  it("homepage major slots have unique paths (carousel + filmstrip + section photos)", () => {
    const paths = homepageMajorImagePaths();
    assert.ok(paths.length >= 8 + 6);
    assert.deepEqual(
      findDuplicateImagePaths(paths),
      [],
      `duplicate homepage paths: ${findDuplicateImagePaths(paths).join(", ")}`,
    );
    // Filmstrip must not point at carousel-only still-life / community reserves
    const film = CTA_FILMSTRIP.map((i) => i.src);
    assert.equal(film.includes("/cta-2.jpg"), false, "cta-2 reserved as resources still-life source");
    assert.equal(film.includes("/cta-5.jpg"), false, "cta-5 reserved as community source");
    assert.equal(film.includes("/private-practice-can.jpg"), false);
  });
});

describe("No Thursday in user-facing UI copy", () => {
  it("public + dashboard + admin + components never ship the word Thursday", () => {
    const files: string[] = [];
    function walkAbs(abs: string) {
      let st;
      try {
        st = statSync(abs);
      } catch {
        return;
      }
      if (st.isFile()) {
        if (/\.(tsx?|jsx?)$/.test(abs) && !abs.endsWith(".test.ts")) files.push(abs);
        return;
      }
      if (!st.isDirectory()) return;
      for (const name of readdirSync(abs)) {
        if (name === "node_modules" || name === ".next") continue;
        walkAbs(join(abs, name));
      }
    }
    for (const r of ["app/(public)", "app/(dashboard)", "app/(admin)", "components"]) {
      walkAbs(join(ROOT, r));
    }
    for (const f of [
      "lib/events.ts",
      "lib/demo-events.ts",
      "lib/membershipAssets.ts",
      "lib/membershipBenefits.ts",
      "lib/relativeDates.ts",
      "lib/ics.ts",
    ]) {
      walkAbs(join(ROOT, f));
    }

    assert.ok(files.length > 20, `expected to scan UI sources, got ${files.length}`);

    const offenders: string[] = [];
    for (const f of files) {
      const text = readFileSync(f, "utf8")
        // Calendar column headers only (not consultation day)
        .replace(/\["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"\]/g, "")
        .replace(/\["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"\]/g, "");
      if (/Thursday/i.test(text)) {
        offenders.push(f.slice(ROOT.length + 1).replace(/\\/g, "/"));
      }
    }
    assert.deepEqual(offenders, [], `Unexpected Thursday in UI sources: ${offenders.join(", ")}`);
  });
});

describe("Member events header", () => {
  it("does not mention admin calendar matching", () => {
    const src = readFileSync(join(ROOT, "app/(dashboard)/dashboard/events/EventsClient.tsx"), "utf8");
    assert.equal(src.includes("Sarah manages in admin"), false);
    assert.equal(src.toLowerCase().includes("same calendar"), false);
  });
});

describe("MembershipCarousel controls", () => {
  it("ships prev/next buttons wired to slide stepping", () => {
    const src = readFileSync(join(ROOT, "components/landing/MembershipCarousel.tsx"), "utf8");
    assert.match(src, /Previous membership benefit/);
    assert.match(src, /Next membership benefit/);
    assert.match(src, /stepSlide/);
    assert.match(src, /scrollProgress\.get\(\)/);
    assert.match(src, /goToSlideIndex/);
    assert.match(src, /ChevronLeft/);
    assert.match(src, /ChevronRight/);
  });
});
