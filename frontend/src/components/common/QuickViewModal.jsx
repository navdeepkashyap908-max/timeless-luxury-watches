import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { formatINR } from "../../data/watchesData";

export default function QuickViewModal() {
  const { quickViewWatch, setQuickViewWatch, addToBag } = useStore();
  const navigate = useNavigate();

  if (!quickViewWatch) return null;

  const handleFullDetail = () => {
    const id = quickViewWatch.id;
    setQuickViewWatch(null);
    navigate(`/watch/${id}`);
  };

  const handleAddToBag = () => {
    addToBag(quickViewWatch.id);
    setQuickViewWatch(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm"
        onClick={() => setQuickViewWatch(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl z-10 border border-outline-variant/40 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary font-bold">
              {quickViewWatch.brand}
            </span>
            <span className="font-label-sm text-[10px] text-outline">
              {quickViewWatch.reference}
            </span>
          </div>
          <button
            onClick={() => setQuickViewWatch(null)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Watch Image Showcase */}
        <div className="relative w-full h-64 bg-surface-container-low flex items-center justify-center p-4">
          <img
            src={quickViewWatch.image || quickViewWatch.mainImage}
            alt={quickViewWatch.name}
            className="w-full h-full object-contain"
          />
          {quickViewWatch.discountBadge && (
            <span className="absolute top-3 left-3 bg-on-surface text-on-primary font-label-sm text-[10px] uppercase px-2 py-0.5 rounded tracking-wider shadow-sm">
              {quickViewWatch.discountBadge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                {quickViewWatch.name}
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {quickViewWatch.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full shrink-0">
              <span className="material-symbols-outlined text-[14px] text-primary">star</span>
              <span className="font-label-sm text-body-sm font-semibold text-on-surface">
                {quickViewWatch.rating}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1 border-t border-outline-variant/20">
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
              {formatINR(quickViewWatch.price)}
            </span>
            {quickViewWatch.originalPrice && (
              <span className="font-body-sm text-body-sm line-through text-outline">
                {formatINR(quickViewWatch.originalPrice)}
              </span>
            )}
            <span className="ml-auto font-label-sm text-[10px] uppercase tracking-wider text-primary font-semibold">
              Geneva Certified
            </span>
          </div>

          {/* Specs preview */}
          {quickViewWatch.specs && (
            <div className="grid grid-cols-3 gap-1.5 py-2 bg-surface-container-low rounded-lg text-center px-2">
              <div className="flex flex-col">
                <span className="text-outline font-label-sm text-[9px] uppercase tracking-wider">
                  Diameter
                </span>
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                  {quickViewWatch.specs.dimensions || quickViewWatch.specs.diameter || "41mm"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label-sm text-[9px] uppercase tracking-wider">
                  Calibre
                </span>
                <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                  {quickViewWatch.specs.calibre || "In-House"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-outline font-label-sm text-[9px] uppercase tracking-wider">
                  Reserve
                </span>
                <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                  {quickViewWatch.specs.powerReserve || "72 Hours"}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={handleFullDetail}
              className="h-11 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors"
            >
              Full Atelier View
            </button>
            <button
              onClick={handleAddToBag}
              className="h-11 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
