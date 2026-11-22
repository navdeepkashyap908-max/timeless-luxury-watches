import React from "react";
import { TESTIMONIALS } from "../../data/watchesData";

export default function Testimonials() {
  return (
    <section className="w-full px-margin-mobile py-space-xl flex flex-col gap-space-md max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
          Collector Reverence
        </span>
        <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
          Voices of the Connoisseurs
        </h2>
      </div>

      <div className="flex flex-col gap-space-sm md:gap-space-md">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm border border-outline-variant/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-title-md text-primary font-bold">
                  {t.initials}
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">
                    {t.name}
                  </span>
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                    {t.location} • {t.piece}
                  </span>
                </div>
              </div>
              <div className="flex text-primary">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[16px]">
                    star
                  </span>
                ))}
              </div>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">
              "{t.quote}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
