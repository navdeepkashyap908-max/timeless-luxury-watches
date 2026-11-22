import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatINR } from "../../data/watchesData";
import { useStore } from "../../context/StoreContext";

export default function CatalogGrid({ watches }) {
  const { wishlist, toggleWishlist, addToBag, setQuickViewWatch, showToast } = useStore();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const navigate = useNavigate();

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      setHasLoadedMore(true);
      showToast("Curated archives synchronized with Salon");
    }, 1200);
  };

  return (
    <section className="px-margin-mobile mt-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">
      {/* Watch Cards */}
      <div className="flex flex-col gap-5">
        {watches.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center gap-2 bg-surface-container-low rounded-xl p-8">
            <span className="material-symbols-outlined text-outline text-[48px]">search_off</span>
            <span className="font-headline-sm text-title-lg text-on-surface">
              No Matching Calibres Found
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Adjust your criteria or contact our Geneva vault specialist to source unlisted models.
            </p>
          </div>
        ) : (
          watches.map((watch) => {
            const isWishlisted = wishlist.includes(watch.id);

            return (
              <article
                key={watch.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row relative transition-all duration-300 hover:shadow-md border border-outline-variant/30 hover:border-primary-container/60"
              >
                {/* Image Stage & Badges */}
                <div
                  className="relative w-full md:w-80 h-64 md:h-auto bg-surface-container-low flex items-center justify-center p-4 overflow-hidden shrink-0 cursor-pointer group"
                  onClick={() => navigate(`/watch/${watch.id}`)}
                >
                  <img
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    alt={watch.name}
                    src={watch.image || watch.mainImage}
                  />

                  {/* Left Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {watch.statusBadge && (
                      <span className="bg-on-surface text-on-primary text-label-sm font-label-sm uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
                        {watch.statusBadge}
                      </span>
                    )}
                    {watch.tag && (
                      <span className="bg-primary-container text-on-primary-container text-label-sm font-label-sm uppercase tracking-wider px-2 py-0.5 rounded shadow-sm font-bold">
                        {watch.tag}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    aria-label="Add to Wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(watch.id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm hover:text-error transition-colors cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isWishlisted ? "text-error" : ""
                      }`}
                    >
                      {isWishlisted ? "favorite" : "favorite_border"}
                    </span>
                  </button>

                  <span className="absolute bottom-2 right-3 font-label-sm text-label-sm text-outline bg-surface/80 backdrop-blur-sm px-1.5 py-0.5 rounded">
                    {watch.reference}
                  </span>
                </div>

                {/* Specs & Details */}
                <div className="p-4 md:p-6 flex-1 flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <div
                        className="flex flex-col cursor-pointer"
                        onClick={() => navigate(`/watch/${watch.id}`)}
                      >
                        <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">
                          {watch.brand}
                        </span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 hover:text-primary transition-colors">
                          {watch.name}
                        </h2>
                      </div>
                      <span className="bg-surface-container text-primary font-label-sm text-label-sm px-2.5 py-1 rounded font-semibold shrink-0">
                        {watch.specs?.metallurgy ? watch.specs.metallurgy.split(" ")[0] + " " + (watch.specs.metallurgy.split(" ")[1] || "") : "High Horology"}
                      </span>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {watch.fullDescription || watch.subtitle}
                    </p>

                    {/* Micro Technical Specification Row */}
                    <div className="grid grid-cols-4 gap-1 py-2 bg-surface-container-low/70 rounded-lg text-center px-1 border border-outline-variant/20 mt-1">
                      <div className="flex flex-col">
                        <span className="text-outline font-label-sm text-[9px] uppercase tracking-wider">
                          Diameter
                        </span>
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                          {watch.specs?.dimensions || watch.specs?.diameter || "41mm"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline font-label-sm text-[9px] uppercase tracking-wider">
                          Calibre
                        </span>
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                          {watch.specs?.calibre || "In-House"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline font-label-sm text-[9px] uppercase tracking-wider">
                          Reserve
                        </span>
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                          {watch.specs?.powerReserve || "72 Hours"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-outline font-label-sm text-[9px] uppercase tracking-wider">
                          Water
                        </span>
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface truncate">
                          {watch.specs?.waterTightness ? watch.specs.waterTightness.split(" ")[0] : "10 ATM"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Actions Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-outline-variant/20">
                    <div className="flex items-baseline gap-2">
                      <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        {formatINR(watch.price)}
                      </span>
                      {watch.originalPrice && (
                        <span className="font-label-sm text-body-sm text-outline line-through">
                          {formatINR(watch.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuickViewWatch(watch)}
                        className="h-10 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        Quick View
                      </button>
                      <button
                        onClick={() => navigate(`/watch/${watch.id}`)}
                        className="h-10 px-4 bg-surface-container text-on-surface hover:text-primary hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        Inspect Calibre
                      </button>
                      <button
                        onClick={() => addToBag(watch.id)}
                        className="h-10 px-4 bg-on-surface hover:bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        Bag
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {watches.length > 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="px-8 h-12 rounded-xl bg-surface-container-lowest text-on-surface border border-outline-variant/40 hover:bg-surface-container font-label-md text-label-md uppercase tracking-widest shadow-sm transition-all flex items-center gap-2 cursor-pointer"
          >
            {isLoadingMore && (
              <span className="material-symbols-outlined text-[16px] animate-spin">
                progress_activity
              </span>
            )}
            <span>
              {isLoadingMore
                ? "Synchronizing Vault..."
                : hasLoadedMore
                ? "All Vault Allocations Active"
                : "Synchronize Complete Archives"}
            </span>
          </button>
        </div>
      )}

      {/* Floating Advisor CTAs */}
      <div className="bg-surface-container-high rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm border border-outline-variant/30 mt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">support_agent</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-md text-body-md font-semibold text-on-surface">
              Haute Horlogerie Private Advisory
            </span>
            <span className="font-body-sm text-[11px] text-secondary">
              Direct access to Salon Directors in Geneva, Zurich, and Mumbai.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => showToast("Connecting with Salon Director...")}
            className="flex-1 md:flex-initial h-10 px-4 bg-surface-container-lowest border border-outline-variant/30 text-on-surface hover:bg-surface-container font-label-sm text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">call</span>
            Call Director
          </button>
          <button
            onClick={() => showToast("Initiating encrypted Geneva VIP channel...")}
            className="flex-1 md:flex-initial h-10 px-4 bg-on-surface text-on-primary hover:bg-primary font-label-sm text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            Encrypted VIP Channel
          </button>
        </div>
      </div>
    </section>
  );
}
