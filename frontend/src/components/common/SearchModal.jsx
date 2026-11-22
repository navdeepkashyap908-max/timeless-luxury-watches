import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { WATCHES, formatINR } from "../../data/watchesData";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredWatches = WATCHES.filter((watch) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      watch.name.toLowerCase().includes(term) ||
      watch.reference.toLowerCase().includes(term) ||
      watch.brand.toLowerCase().includes(term) ||
      watch.category.toLowerCase().includes(term) ||
      (watch.specs && watch.specs.calibre && watch.specs.calibre.toLowerCase().includes(term))
    );
  });

  const handleSelectWatch = (watchId) => {
    setIsSearchOpen(false);
    navigate(`/watch/${watchId}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/50 backdrop-blur-md"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl z-10 border border-outline-variant/40 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 bg-surface-container-low border-b border-outline-variant/30 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[24px]">search</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md outline-none"
            placeholder="Search by calibre, reference, metal, or complication..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="p-1 text-outline hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-label-sm font-label-sm uppercase tracking-wider bg-surface-container text-on-surface rounded-md hover:bg-surface-container-high transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-surface-container-lowest border-b border-outline-variant/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider shrink-0">
            Vault Suggestions:
          </span>
          {["Tourbillon", "Rose Gold", "Platinum", "Chronograph", "Geneva Seal", "Diver"].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="px-2.5 py-0.5 rounded-full text-label-sm text-[10px] font-medium bg-surface-container-low text-on-surface hover:bg-primary hover:text-on-primary transition-colors shrink-0"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-label-sm text-outline uppercase tracking-widest px-1">
            <span>Archive Allocations ({filteredWatches.length})</span>
            <span>Instant Dispatch Ready</span>
          </div>

          {filteredWatches.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center gap-2">
              <span className="material-symbols-outlined text-outline text-[40px]">manage_search</span>
              <span className="font-headline-sm text-title-lg text-on-surface">No Timepiece Found</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
                Inquire directly with our Salon Director to source unlisted historical references.
              </p>
            </div>
          ) : (
            filteredWatches.map((watch) => (
              <div
                key={watch.id}
                onClick={() => handleSelectWatch(watch.id)}
                className="group p-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high/60 border border-outline-variant/30 flex items-center gap-3.5 transition-all cursor-pointer shadow-sm hover:shadow"
              >
                <div className="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 flex items-center justify-center p-1">
                  <img
                    src={watch.image}
                    alt={watch.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-[9px] uppercase tracking-wider text-primary font-semibold">
                      {watch.brand}
                    </span>
                    <span className="font-label-sm text-[9px] text-outline">
                      {watch.reference}
                    </span>
                  </div>
                  <h4 className="font-title-md text-body-md font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    {watch.name}
                  </h4>
                  <span className="font-body-sm text-[11px] text-secondary truncate">
                    {watch.subtitle}
                  </span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-title-md text-body-md font-bold text-on-surface">
                    {formatINR(watch.price)}
                  </span>
                  <span className="font-label-sm text-[9px] uppercase tracking-wider text-primary font-semibold flex items-center gap-0.5">
                    Inspect <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
