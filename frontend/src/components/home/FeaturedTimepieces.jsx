import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WATCHES, formatINR } from "../../data/watchesData";
import { useStore } from "../../context/StoreContext";

export default function FeaturedTimepieces() {
  const [activeTab, setActiveTab] = useState("all");
  const { wishlist, toggleWishlist, addToBag, setQuickViewWatch } = useStore();
  const navigate = useNavigate();

  // First 8 watches
  const featured = WATCHES.slice(0, 8);

  const filtered = featured.filter((watch) => {
    if (activeTab === "all") return true;
    if (activeTab === "tourbillon") {
      return (
        watch.category === "tourbillon" ||
        (watch.categories && watch.categories.includes("tourbillon"))
      );
    }
    if (activeTab === "dress") {
      return (
        watch.category === "dress" ||
        (watch.categories && watch.categories.includes("dress"))
      );
    }
    if (activeTab === "chronograph") {
      return (
        watch.category === "chronograph" ||
        (watch.categories && watch.categories.includes("chronograph"))
      );
    }
    return true;
  });

  return (
    <section className="w-full px-margin-mobile py-space-lg flex flex-col gap-space-md max-w-5xl mx-auto">
      <div className="flex flex-col gap-1">
        <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
          Geneva Vault Collection
        </span>
        <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
          Featured Masterpieces
        </h2>
      </div>

      {/* Filter Tabs (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-margin-mobile px-margin-mobile no-scrollbar">
        {[
          { key: "all", label: "All Timepieces" },
          { key: "tourbillon", label: "Tourbillon" },
          { key: "dress", label: "Dress" },
          { key: "chronograph", label: "Chronograph" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-space-md py-1.5 font-label-md text-label-md uppercase tracking-wider rounded-full whitespace-nowrap shadow-sm transition-all cursor-pointer ${
              activeTab === tab.key
                ? "bg-on-surface text-on-primary"
                : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border border-outline-variant/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 8 Luxury Timepieces Grid (2 columns on mobile, 4 columns on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm md:gap-space-md">
        {filtered.map((watch) => {
          const isWishlisted = wishlist.includes(watch.id);

          return (
            <div
              key={watch.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/30 hover:border-primary-container/60 hover:shadow-md transition-all duration-300"
            >
              {/* Image Stage */}
              <div
                className="relative h-44 md:h-52 w-full bg-surface-container cursor-pointer overflow-hidden group"
                onClick={() => navigate(`/watch/${watch.id}`)}
              >
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={watch.name}
                  src={watch.image || watch.mainImage}
                />

                {/* Badge Tag */}
                {watch.discountBadge && (
                  <span className="absolute top-2 left-2 bg-on-surface text-on-primary font-label-sm text-[9px] uppercase px-1.5 py-0.5 rounded tracking-wider shadow-sm">
                    {watch.discountBadge}
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(watch.id);
                  }}
                  aria-label="Wishlist"
                  className="absolute top-2 right-2 w-7 h-7 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-on-surface shadow-sm hover:scale-110 transition-transform"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isWishlisted ? "text-error" : "text-on-surface"
                    }`}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Details & Action */}
              <div className="p-space-sm flex flex-col flex-1 justify-between gap-2">
                <div
                  className="flex flex-col gap-0.5 cursor-pointer"
                  onClick={() => navigate(`/watch/${watch.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase truncate">
                      {watch.tag || "Swiss Made"}
                    </span>
                    <span className="font-label-sm text-[10px] text-primary flex items-center shrink-0">
                      <span className="material-symbols-outlined text-[12px] text-primary mr-0.5">
                        star
                      </span>
                      {watch.rating}
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface line-clamp-1 hover:text-primary transition-colors">
                    {watch.name}
                  </h3>
                  <span className="font-body-sm text-[11px] text-secondary truncate">
                    {watch.subtitle}
                  </span>
                </div>

                {/* Price and CTA Grid */}
                <div className="flex flex-col pt-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-title-md text-title-md font-bold text-on-surface">
                      {formatINR(watch.price)}
                    </span>
                    {watch.originalPrice && (
                      <span className="font-label-sm text-[10px] line-through text-outline">
                        {formatINR(watch.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-1 mt-2">
                    <button
                      onClick={() => setQuickViewWatch(watch)}
                      className="h-8 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[10px] uppercase rounded transition-colors"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => addToBag(watch.id)}
                      className="h-8 bg-on-surface hover:bg-primary text-on-primary font-label-sm text-[10px] uppercase rounded flex items-center justify-center gap-0.5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span> Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
