import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { WATCHES, formatINR } from "../../data/watchesData";

export default function BagDrawer() {
  const { isBagOpen, setIsBagOpen, bag, updateBagQuantity, removeFromBag, bagSubtotal, showToast } =
    useStore();
  const navigate = useNavigate();

  if (!isBagOpen) return null;

  const handleCheckout = () => {
    setIsBagOpen(false);
    navigate("/bag");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm"
        onClick={() => setIsBagOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface shadow-2xl h-full flex flex-col z-10 border-l border-outline-variant/30">
        {/* Header */}
        <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
            <div className="flex flex-col">
              <span className="font-title-lg text-title-lg text-on-surface font-semibold">
                Private Custody Bag
              </span>
              <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider">
                {bag.length} {bag.length === 1 ? "Piece" : "Pieces"} Allocated
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsBagOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {bag.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center gap-3">
              <span className="material-symbols-outlined text-outline text-[48px]">
                shopping_bag
              </span>
              <span className="font-headline-sm text-title-lg text-on-surface">
                Your Bag is Currently Empty
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
                Explore our Curated Vault to allocate Swiss certified chronometers to your custody.
              </p>
              <button
                onClick={() => {
                  setIsBagOpen(false);
                  navigate("/catalog");
                }}
                className="mt-2 px-6 h-11 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors"
              >
                Explore Curated Vault
              </button>
            </div>
          ) : (
            bag.map((item, index) => {
              const watch = WATCHES.find((w) => w.id === item.watchId);
              if (!watch) return null;
              const unitPrice = item.bespokePrice || watch.price;

              return (
                <div
                  key={`${item.watchId}-${index}`}
                  className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex gap-3 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-lg bg-surface-container overflow-hidden shrink-0 p-1 flex items-center justify-center">
                    <img
                      src={watch.image || watch.mainImage}
                      alt={watch.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-title-md text-body-sm font-semibold text-on-surface truncate">
                          {watch.name}
                        </span>
                        <button
                          onClick={() => removeFromBag(index)}
                          className="text-outline hover:text-error transition-colors p-0.5"
                          title="Remove timepiece"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                      <span className="font-label-sm text-[10px] text-outline block">
                        {watch.reference}
                      </span>
                      {item.selectedStrap && item.selectedStrap !== "default" && (
                        <span className="font-body-sm text-[10px] text-secondary block truncate">
                          Strap: {item.selectedStrap.replace("-", " ")}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/15 mt-1">
                      <div className="flex items-center gap-2 bg-surface-container px-2 py-0.5 rounded">
                        <button
                          onClick={() => updateBagQuantity(index, -1)}
                          className="text-on-surface hover:text-primary px-1 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="font-label-sm text-body-sm text-on-surface">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateBagQuantity(index, 1)}
                          className="text-on-surface hover:text-primary px-1 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-title-md text-body-sm font-bold text-on-surface">
                        {formatINR(unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Summary */}
        {bag.length > 0 && (
          <div className="p-4 bg-surface-container-low border-t border-outline-variant/30 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 text-body-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Vault Allocation Subtotal</span>
                <span className="font-semibold text-on-surface">{formatINR(bagSubtotal)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-[14px]">local_shipping</span>
                  Insured Armored Escort
                </span>
                <span className="text-primary font-medium uppercase font-label-sm text-[10px]">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between text-title-md font-bold text-on-surface pt-2 border-t border-outline-variant/20">
                <span>Escrow Payable</span>
                <span className="text-primary">{formatINR(bagSubtotal)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                to="/bag"
                onClick={() => setIsBagOpen(false)}
                className="h-11 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center"
              >
                Full Bag View
              </Link>
              <button
                onClick={handleCheckout}
                className="h-11 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Escrow Custody
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
