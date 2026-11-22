import React from "react";
import { TESTIMONIALS } from "../../data/watchesData";

export default function ConnoisseurReviews() {
  return (
    <div className="px-margin-mobile mt-8 flex flex-col max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-title-md text-title-md text-on-surface uppercase tracking-wider font-semibold">
            Connoisseur Impressions
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Validated provenance &amp; owners salon
          </p>
        </div>
        <button className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold hover:underline">
          View All 48
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {TESTIMONIALS.slice(0, 2).map((t, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2.5 border border-outline-variant/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-headline-sm text-body-sm text-primary font-bold">
                  {t.initials}
                </div>
                <div>
                  <span className="font-title-md text-body-sm text-on-surface font-semibold block leading-tight">
                    {t.name}
                  </span>
                  <span className="font-label-sm text-[10px] text-secondary">
                    {t.location}, India • Collected {t.date}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                Verified Owner
              </span>
            </div>

            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>

            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              "{t.quote}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
