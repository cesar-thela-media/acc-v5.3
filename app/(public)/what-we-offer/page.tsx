import type { Metadata } from "next";
import Link from "next/link";
import { Mail, PlusIcon, MinusIcon } from "lucide-react";
import { Separator } from "@/components/ui/shadcn/separator";
import { Button } from "@/components/ui/shadcn/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/shadcn/accordion";
import { MEMBERSHIP_BENEFITS } from "@/lib/membershipBenefits";

const SAGE_800 = "#4A5E48";
const SAGE_600 = "#4A5E48";
const AMBER = "#C2963A";

const pricingFeatures = MEMBERSHIP_BENEFITS;

const offerDetails = [
  "A structured consultation group meets the first Friday of every month from 9:00 to 11:00am. Bring your difficult cases, process with trusted peers, and leave with a new perspective.",
  "Access to continuing education content aligned with your licensure requirements. Curated for practicing clinicians and designed for professional growth.",
  "A member directory (launching soon) searchable by specialty, modality, location, and availability, so referrals stay within a trusted clinical community.",
  "Mindfulness practices and burnout prevention structures designed specifically for therapists carrying heavy caseloads. Because your sustainability matters too.",
];

const faqs = [
  {
    q: "Who is Austin Clinician Circle for?",
    a: "Austin Clinician Circle is for licensed therapists, LPC, LCSW, LMFT, PhD, and PsyD, who are in independent or group private practice. Pre-licensed associates are not currently eligible for full membership.",
  },
  {
    q: "Is this for Austin only?",
    a: "No. While Austin Clinician Circle is based in Austin, we provide connection and support for clinicians all across Texas.",
  },
  {
    q: "How does the consultation group work?",
    a: "The monthly group meets virtually on the first Friday of each month, 9:00 to 11:00am. Members may present cases for discussion, and various topics will be covered for CEUs. The group is kept intentionally small for the quality of discussion.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. There is no long-term contract, and you can cancel at any time from your billing settings.",
  },
  {
    q: "How do I reach Sarah?",
    a: "By email, sarah@restoredfamily.com",
  },
];

function AmberCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="8" fill={AMBER} />
      <path d="M4.5 8l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "What We Offer | Austin Clinician Circle",
  description:
    "Membership gives you full access to clinical support, professional development, and community. Monthly case consultation, Continuing Education Credits, resource library, and more.",
};

export default function WhatWeOfferPage() {
  return (
    <>
      {/* Two-column: offer summary + pricing-14's actual card */}
      <section style={{ background: SAGE_600, padding: "clamp(3rem,6vw,5rem) 0" }}>
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch max-w-5xl mx-auto">
            {/* Left: offer detail, plain on the green section (no card), center-aligned per client request */}
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-5" style={{ color: AMBER }}>
                What we offer
              </p>
              <h1
                className="leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)", fontWeight: 400, color: "#fff" }}
              >
                Membership gives you full access to clinical support, professional development, and community.
              </h1>
              <ul className="flex flex-col gap-4 w-full text-left">
                {offerDetails.map((detail) => (
                  <li key={detail}>
                    <span className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right card — pricing-14's actual card, this page's own price content — stays white */}
            <div
              className="rounded-2xl flex flex-col gap-8"
              style={{ background: "#fff", border: "1px solid rgba(194,150,58,0.22)", padding: "2rem" }}
            >
              <div className="flex items-baseline gap-1">
                <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(3rem, 6vw, 4rem)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1, color: SAGE_800 }}>
                  $79
                </span>
                <span style={{ fontSize: 14, color: "#7A7A6E" }}>/ month</span>
              </div>

              <Separator style={{ background: "rgba(194,150,58,0.2)" }} />

              <ul className="flex flex-col gap-4">
                {pricingFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <AmberCheck />
                    <span style={{ fontSize: 14, color: "#3D4A3B" }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/join"
                className="block text-center w-full rounded-lg text-sm font-medium"
                style={{ background: AMBER, color: "#fff", padding: "0.7rem 1.5rem" }}
              >
                Apply for membership
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — faq-04's structure */}
      <section style={{ background: "#fff", padding: "clamp(3rem,6vw,5rem) 0" }}>
        <div className="container-fluid max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] mb-4" style={{ color: AMBER }}>FAQ</p>
            <h2
              className="leading-tight whitespace-nowrap"
              style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: "clamp(1.35rem, 4.2vw, 3rem)", fontWeight: 400, color: SAGE_800 }}
            >
              You probably have questions.
            </h2>
          </div>
          <div className="flex md:flex-row flex-col md:gap-10 gap-6">
            {/* Left: real contact card, no fabricated team avatars */}
            <div className="max-w-sm w-full">
              <div
                className="h-full md:px-8 px-6 md:py-10 py-8 rounded-2xl flex flex-col gap-4"
                style={{ border: "1px solid rgba(194,150,58,0.28)", background: SAGE_800 }}
              >
                <h4 className="text-2xl font-medium" style={{ color: "#fff" }}>
                  Still have questions?
                </h4>
                <Button
                  render={<a href="https://mail.google.com/mail/?view=cm&fs=1&to=sarah@restoredfamily.com" target="_blank" rel="noopener noreferrer" />}
                  nativeButton={false}
                  className="flex gap-2 items-center w-full rounded-full min-h-12 cursor-pointer"
                  style={{ background: AMBER, color: "#fff" }}
                >
                  <Mail className="size-4.5" />
                  Email Sarah
                </Button>
              </div>
            </div>

            {/* Right: real 5-item accordion */}
            <Accordion className="w-full flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${index}`}
                  className="md:px-8 px-4 py-5 rounded-2xl flex flex-col gap-3"
                  style={{ border: "1px solid rgba(194,150,58,0.18)" }}
                >
                  <AccordionTrigger className="p-0 md:text-lg text-base font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden cursor-pointer" style={{ color: SAGE_800 }}>
                    <div className="flex gap-4 items-center min-h-12">
                      <span style={{ color: AMBER }}>{String(index + 1).padStart(2, "0")}</span>
                      {faq.q}
                    </div>
                    <PlusIcon className="w-5 h-5 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:hidden" />
                    <MinusIcon className="w-5 h-5 shrink-0 transition-transform duration-200 hidden group-aria-expanded/accordion-trigger:inline" />
                  </AccordionTrigger>
                  <AccordionContent className="p-0 text-base" style={{ color: "var(--color-text-secondary)" }}>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
