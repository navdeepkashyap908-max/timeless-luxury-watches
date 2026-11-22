import React from "react";
import { ATELIER_IMAGE } from "../../data/watchesData";

export default function BrandStory() {
  return (
    <section className="w-full px-margin-mobile py-space-xl bg-surface-container-low flex flex-col gap-space-md border-y border-outline-variant/20">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-space-md">
        <div className="flex flex-col gap-1">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Maison Heritage
          </span>
          <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
            The Art of Seconds: Crafted in Le Locle
          </h2>
        </div>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-sm bg-surface-container border border-outline-variant/30">
          <img
            className="w-full h-full object-cover"
            alt="Swiss watchmaker in a traditional atelier in Le Locle assembling a fine tourbillon balance bridge"
            src={ATELIER_IMAGE}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent flex items-end p-space-md md:p-space-lg">
            <span className="font-headline-sm md:font-headline-md text-title-lg md:text-headline-sm text-on-primary">
              Over 140 Years of Mechanical Precision &amp; Haute Horlogerie
            </span>
          </div>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Every timepiece in the TIMELESS vault represents hundreds of hours of patient hand-finishing—from anglage chamfering to mirror polishing. Curated for the discerning collector in India with armored insured transit, bespoke INR ₹ invoicing, and certified provenance.
        </p>

        <div className="grid grid-cols-2 gap-space-sm md:gap-space-md pt-space-xs">
          <div className="bg-surface-container-lowest p-space-sm md:p-space-md rounded-lg shadow-sm flex flex-col gap-1 border border-outline-variant/30">
            <span className="font-headline-sm md:font-headline-md text-headline-sm text-primary">
              0.02mm
            </span>
            <span className="font-label-sm text-[11px] text-on-surface font-semibold uppercase tracking-wider">
              Microscopic Tolerance
            </span>
            <span className="font-body-sm text-[12px] text-secondary">
              Laser-measured balance wheels &amp; hand-polished pinions
            </span>
          </div>
          <div className="bg-surface-container-lowest p-space-sm md:p-space-md rounded-lg shadow-sm flex flex-col gap-1 border border-outline-variant/30">
            <span className="font-headline-sm md:font-headline-md text-headline-sm text-primary">
              100%
            </span>
            <span className="font-label-sm text-[11px] text-on-surface font-semibold uppercase tracking-wider">
              Insured Transit
            </span>
            <span className="font-body-sm text-[12px] text-secondary">
              Armored door-to-door escort across all Indian metros
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
