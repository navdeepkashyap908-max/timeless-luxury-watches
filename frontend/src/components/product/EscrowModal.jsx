import React from "react";
import { useStore } from "../../context/StoreContext";
import { formatINR } from "../../data/watchesData";

export default function EscrowModal() {
  const { escrowModalWatch, setEscrowModalWatch, showToast } = useStore();

  if (!escrowModalWatch) return null;

  const handleConfirm = () => {
    showToast("Escrow custody allocation generated. Private Client Director notified.");
    setEscrowModalWatch(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
        onClick={() => setEscrowModalWatch(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl z-10 border border-primary-container/40 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              shield_with_heart
            </span>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                Private Escrow Settlement
              </h3>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline">
                Tier-1 Institutional Custody
              </span>
            </div>
          </div>
          <button
            onClick={() => setEscrowModalWatch(null)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block">
                Target Allocation
              </span>
              <span className="font-title-md text-body-md font-semibold text-on-surface">
                {escrowModalWatch.name}
              </span>
              <span className="font-body-sm text-[11px] text-secondary block">
                {escrowModalWatch.reference}
              </span>
            </div>
            <span className="font-title-md text-title-md font-bold text-primary">
              {formatINR(escrowModalWatch.price)}
            </span>
          </div>

          {/* Escrow Workflow Protocol */}
          <div className="flex flex-col gap-3">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline">
              Haute Horlogerie Escrow Protocol
            </span>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-body-sm font-semibold text-on-surface">
                  Dedicated Escrow Sub-Account
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  Funds held safely in an RBI-regulated Tier-1 institutional escrow until physical handover.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-body-sm font-semibold text-on-surface">
                  Armored Escort Handover &amp; Inspection
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  Timepiece delivered in a biometric safe-box with a certified horologist present for unboxing and provenance deed review.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-body-sm font-semibold text-on-surface">
                  Release on Collector Authentication
                </span>
                <span className="font-body-sm text-[11px] text-on-surface-variant">
                  Escrow settlement is finalized solely after your personal satisfaction and digital signature on the Ethereum provenance deed.
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-surface-container-high rounded-lg flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">lock</span>
            <span className="font-label-sm text-[10px] text-on-surface uppercase tracking-wider">
              256-bit Encrypted Private Settlement • Zero Disintermediation
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => setEscrowModalWatch(null)}
              className="h-11 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="h-11 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Initiate Escrow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
