import React from "react";
import { formatINR } from "../../data/watchesData";
import { useStore } from "../../context/StoreContext";

export default function StickyConciergeBar({ watch, currentPrice, selectedStrap, selectedDial }) {
  const { addToBag, showToast } = useStore();
  const displayPrice = currentPrice || watch.price;

  const handleAcquire = () => {
    addToBag(watch.id, 1, selectedStrap, selectedDial, currentPrice);
  };

  const handleConcierge = () => {
    showToast("Connecting to Haute Horlogerie Concierge Specialist...");
  };

  return (
    <div className="sticky bottom-20 md:bottom-0 z-40 w-full bg-surface/95 backdrop-blur-md px-margin-mobile py-2.5 shadow-lg flex items-center justify-between gap-3 border-t border-outline-variant/30 max-w-2xl mx-auto">
      <div className="flex flex-col min-w-0">
        <span className="font-label-sm text-[10px] text-secondary uppercase tracking-widest truncate">
          {watch.name}
        </span>
        <span className="font-title-md text-title-md font-bold text-on-surface">
          {formatINR(displayPrice)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Bespoke Concierge WhatsApp or Call"
          onClick={handleConcierge}
          className="w-10 h-10 rounded-lg bg-surface-container text-on-surface flex items-center justify-center hover:text-primary transition-colors shadow-sm cursor-pointer border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-[20px]">support_agent</span>
        </button>
        <button
          onClick={handleAcquire}
          className="h-10 px-5 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 shadow hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer font-semibold"
        >
          <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
          <span>Acquire</span>
        </button>
      </div>
    </div>
  );
}
