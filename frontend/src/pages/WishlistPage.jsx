import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { WATCHES, formatINR } from "../data/watchesData";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToBag, showToast } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const savedWatches = WATCHES.filter((w) => wishlist.includes(w.id));

  const handleAddAllToBag = () => {
    savedWatches.forEach((w) => addToBag(w.id));
    showToast(`Allocated ${savedWatches.length} timepieces to Private Bag`);
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile py-6 max-w-5xl mx-auto pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-widest mb-3">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[12px] text-outline-variant">
          chevron_right
        </span>
        <span className="text-primary font-bold">Private Wishlist</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-outline-variant/30 pb-4 mb-6">
        <div>
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Connoisseur Archives
          </span>
          <h1 className="font-headline-sm md:font-headline-lg text-headline-sm md:text-headline-lg text-on-surface">
            Your Private Curated Wishlist
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
            {savedWatches.length} {savedWatches.length === 1 ? "timepiece" : "timepieces"} earmarked for private custody.
          </p>
        </div>

        {savedWatches.length > 0 && (
          <button
            onClick={handleAddAllToBag}
            className="h-11 px-5 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold shadow-sm self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            Allocate All to Bag
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {savedWatches.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center gap-3 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline text-[54px]">bookmark_border</span>
          <h3 className="font-headline-sm text-title-lg text-on-surface">
            Your Private Wishlist is Empty
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
            Save exceptional chronometers and grand complications from the Curated Vault for future acquisition.
          </p>
          <button
            onClick={() => navigate("/catalog")}
            className="mt-3 px-6 h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors font-semibold"
          >
            Explore Curated Vault
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {savedWatches.map((watch) => (
            <div
              key={watch.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/30 hover:border-primary-container/60 hover:shadow-md transition-all duration-300"
            >
              {/* Image */}
              <div
                className="relative h-56 w-full bg-surface-container-low p-4 flex items-center justify-center cursor-pointer group"
                onClick={() => navigate(`/watch/${watch.id}`)}
              >
                <img
                  src={watch.image || watch.mainImage}
                  alt={watch.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(watch.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/90 shadow flex items-center justify-center text-error hover:scale-110 transition-transform cursor-pointer"
                  title="Remove from wishlist"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <span className="absolute bottom-2 left-3 font-label-sm text-[10px] uppercase text-outline bg-surface/80 px-1.5 py-0.5 rounded">
                  {watch.reference}
                </span>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div
                  className="flex flex-col gap-0.5 cursor-pointer"
                  onClick={() => navigate(`/watch/${watch.id}`)}
                >
                  <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary font-semibold">
                    {watch.brand}
                  </span>
                  <h3 className="font-title-md text-title-md font-semibold text-on-surface hover:text-primary transition-colors">
                    {watch.name}
                  </h3>
                  <span className="font-body-sm text-[11px] text-secondary">
                    {watch.subtitle}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-2 border-t border-outline-variant/20">
                  <span className="font-title-md text-title-md font-bold text-on-surface">
                    {formatINR(watch.price)}
                  </span>
                  <span className="font-label-sm text-[10px] text-primary uppercase font-bold">
                    In Stock
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => navigate(`/watch/${watch.id}`)}
                    className="h-10 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Inspect
                  </button>
                  <button
                    onClick={() => addToBag(watch.id)}
                    className="h-10 bg-on-surface hover:bg-primary text-on-primary font-label-sm text-[10px] uppercase tracking-wider rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    Move to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
