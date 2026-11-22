import React from "react";
import { formatINR } from "../../data/watchesData";

export default function ProductPricing({ watch, currentPrice }) {
  const displayPrice = currentPrice || watch.price;

  return (
    <div className="px-margin-mobile pt-5 flex flex-col max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
          {watch.brand}
        </span>
        <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full border border-outline-variant/30">
          <span
            className="material-symbols-outlined text-[14px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-title-md text-body-sm font-semibold text-on-surface">
            {watch.rating}
          </span>
          <span className="font-body-sm text-label-sm text-secondary">
            ({watch.reviewsCount} verified)
          </span>
        </div>
      </div>

      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mt-1.5 leading-snug">
        {watch.name}
      </h1>

      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
        {watch.fullDescription || watch.subtitle}
      </p>

      {/* Pricing Card */}
      <div className="mt-4 p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-1.5 border border-outline-variant/30">
        <div className="flex items-baseline gap-2.5">
          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
            {formatINR(displayPrice)}
          </span>
          {watch.originalPrice && (
            <span className="font-body-sm text-body-sm text-secondary line-through">
              {formatINR(watch.originalPrice)}
            </span>
          )}
          {watch.privilegeBadge && (
            <span className="font-label-sm text-label-sm text-primary font-bold px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
              {watch.privilegeBadge}
            </span>
          )}
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
          Inclusive of GST, customs, and complimentary insured armored escort across India.
        </p>
      </div>
    </div>
  );
}
