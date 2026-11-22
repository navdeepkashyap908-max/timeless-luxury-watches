import React from "react";
import { useNavigate } from "react-router-dom";
import { WATCHES, formatINR } from "../../data/watchesData";
import { useStore } from "../../context/StoreContext";

export default function RelatedTimepieces({ currentWatchId }) {
  const navigate = useNavigate();
  const { addToBag } = useStore();

  const related = WATCHES.filter((w) => w.id !== currentWatchId).slice(0, 4);

  return (
    <div className="px-margin-mobile mt-8 flex flex-col max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-title-md text-title-md text-on-surface uppercase tracking-wider font-semibold">
            Pair With These Masterpieces
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Harmonious horological pairings
          </p>
        </div>
      </div>

      {/* Horizontal Swipe Carousel */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-margin-mobile px-margin-mobile no-scrollbar">
        {related.map((watch) => (
          <div
            key={watch.id}
            className="min-w-[210px] max-w-[210px] p-3 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col shrink-0 border border-outline-variant/30 hover:border-primary transition-colors"
          >
            <div
              className="w-full aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-2.5 p-2 flex items-center justify-center cursor-pointer"
              onClick={() => {
                navigate(`/watch/${watch.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                className="w-full h-full object-contain"
                alt={watch.name}
                src={watch.image || watch.mainImage}
              />
            </div>
            <span className="font-label-sm text-[10px] uppercase text-primary font-bold truncate">
              {watch.brand}
            </span>
            <h4
              className="font-headline-sm text-title-md text-on-surface truncate cursor-pointer hover:text-primary transition-colors"
              onClick={() => {
                navigate(`/watch/${watch.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {watch.name}
            </h4>
            <span className="font-body-sm text-label-sm text-on-surface-variant truncate">
              {watch.subtitle}
            </span>
            <span className="font-title-md text-body-sm text-on-surface font-semibold mt-2">
              {formatINR(watch.price)}
            </span>
            <button
              onClick={() => {
                navigate(`/watch/${watch.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="mt-2 w-full py-1.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
            >
              Inspect Calibre
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
