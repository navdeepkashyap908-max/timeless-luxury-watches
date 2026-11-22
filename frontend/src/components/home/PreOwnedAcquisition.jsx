import React from "react";
import { useNavigate } from "react-router-dom";

export default function PreOwnedAcquisition() {
  const navigate = useNavigate();

  return (
    <section className="w-full px-margin-mobile py-space-xl max-w-5xl mx-auto">
      <div className="bg-surface-container-high rounded-xl p-space-md md:p-space-lg shadow-md flex flex-col gap-space-md border border-outline-variant/30">
        <div className="flex flex-col gap-1 text-center items-center">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Pre-Owned Acquisition Salon
          </span>
          <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
            Liquidate or Trade-In Your Timepiece
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Receive an instant, transparent valuation from our Geneva-trained master horologists with confidential settlement.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-space-xs">
          <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg bg-surface-container-low/50">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">
                add_photo_alternate
              </span>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">
              1. Submit Details
            </span>
            <span className="font-body-sm text-[12px] text-secondary">
              High-res photos, calibre &amp; box/papers status
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg bg-surface-container-low/50">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">biotech</span>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">
              2. Assessment
            </span>
            <span className="font-body-sm text-[12px] text-secondary">
              Authenticity, chronometric rate &amp; provenance audit
            </span>
          </div>

          <div className="flex flex-col items-center text-center gap-1.5 p-3 rounded-lg bg-surface-container-low/50">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">
                account_balance
              </span>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-on-surface uppercase tracking-wider">
              3. Instant Wire
            </span>
            <span className="font-body-sm text-[12px] text-secondary">
              Same-day bank wire payout in INR ₹ or trade equity
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/sell")}
          className="w-full h-12 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg shadow-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Value Your Watch Now</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </section>
  );
}
