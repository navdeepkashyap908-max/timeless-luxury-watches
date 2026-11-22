import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function AcquisitionActions({
  watch,
  currentPrice,
  selectedStrap,
  selectedDial
}) {
  const [qty, setQty] = useState(1);
  const [isAllocating, setIsAllocating] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const { addToBag, setEscrowModalWatch, setSalonViewingWatch } = useStore();

  const handleAdjustQty = (delta) => {
    setQty((prev) => Math.max(1, Math.min(watch.stockCount || 2, prev + delta)));
  };

  const handleAcquire = () => {
    setIsAllocating(true);
    setTimeout(() => {
      addToBag(watch.id, qty, selectedStrap, selectedDial, currentPrice);
      setIsAllocating(false);
      setIsReserved(true);
      setTimeout(() => {
        setIsReserved(false);
      }, 2500);
    }, 600);
  };

  return (
    <div className="px-margin-mobile mt-6 max-w-2xl mx-auto w-full">
      <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-4 border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[18px]">hourglass_top</span>
            <span className="font-label-sm text-label-sm font-bold text-error uppercase tracking-wider">
              Only {watch.stockCount || 2} pieces available in India boutique
            </span>
          </div>

          {/* Subtle Qty Selector */}
          <div className="flex items-center gap-2 bg-surface-container px-2.5 py-1 rounded border border-outline-variant/20">
            <button
              onClick={() => handleAdjustQty(-1)}
              className="text-on-surface hover:text-primary px-1 font-bold cursor-pointer"
            >
              -
            </button>
            <span className="font-title-md text-body-sm text-on-surface font-semibold">{qty}</span>
            <button
              onClick={() => handleAdjustQty(1)}
              className="text-on-surface hover:text-primary px-1 font-bold cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Suite */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleAcquire}
            disabled={isAllocating}
            className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer font-semibold"
          >
            {isAllocating ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Allocating Piece...</span>
              </>
            ) : isReserved ? (
              <>
                <span className="material-symbols-outlined text-[18px]">done</span>
                <span>Reserved in Private Vault</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Acquire &amp; Place in Bag</span>
              </>
            )}
          </button>

          <button
            onClick={() => setEscrowModalWatch(watch)}
            className="w-full h-12 bg-on-surface text-surface font-label-md text-label-md uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow hover:bg-primary transition-all cursor-pointer font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">shield_with_heart</span>
            <span>Instant Private Escrow Settlement</span>
          </button>

          <button
            onClick={() => setSalonViewingWatch(watch)}
            className="w-full h-11 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all cursor-pointer border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px]">apartment</span>
            <span>Reserve Salon Viewing in Mumbai / Delhi</span>
          </button>
        </div>

        {/* Guaranteed Authenticity Badge Panel */}
        <div className="mt-1 pt-3 bg-surface-container-low p-3.5 rounded-lg flex flex-col gap-2.5 border border-outline-variant/20">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">token</span>
            <div className="flex flex-col">
              <span className="font-title-md text-body-sm text-on-surface font-medium">
                Decentralized Digital Ownership Deed
              </span>
              <span className="font-body-sm text-label-sm text-on-surface-variant">
                Secured on Ethereum ledger with tamper-proof NFC sapphire crystal.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
              verified
            </span>
            <div className="flex flex-col">
              <span className="font-title-md text-body-sm text-on-surface font-medium">
                5-Year International Atelier Warranty
              </span>
              <span className="font-body-sm text-label-sm text-on-surface-variant">
                Includes complete complimentary service and chronometric recalibration at year 3.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
              local_shipping
            </span>
            <div className="flex flex-col">
              <span className="font-title-md text-body-sm text-on-surface font-medium">
                White-Glove Armored Doorstep Transport
              </span>
              <span className="font-body-sm text-label-sm text-on-surface-variant">
                Hand-delivered in biometric safe-box with certified horologist handover.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
