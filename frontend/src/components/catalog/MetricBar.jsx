import React from "react";

export default function MetricBar() {
  return (
    <section className="px-margin-mobile mt-4 max-w-5xl mx-auto w-full">
      <div className="bg-surface-container-low rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-on-surface-variant border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-medium">
            Fully Insured Worldwide Delivery
          </span>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-medium">
            Bespoke INR ₹ Invoicing &amp; Armored Transit
          </span>
        </div>
      </div>
    </section>
  );
}
