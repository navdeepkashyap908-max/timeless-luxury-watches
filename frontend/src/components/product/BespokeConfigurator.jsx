import React from "react";
import { STRAP_OPTIONS, DIAL_OPTIONS } from "../../data/watchesData";

export default function BespokeConfigurator({
  selectedStrap,
  setSelectedStrap,
  selectedDial,
  setSelectedDial
}) {
  return (
    <div className="px-margin-mobile mt-6 flex flex-col gap-5 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
        <h3 className="font-title-md text-title-md text-on-surface uppercase tracking-wider font-semibold">
          Atelier Bespoke Configuration
        </h3>
        <span className="font-label-sm text-label-sm text-primary font-bold">Made to Order</span>
      </div>

      {/* Strap Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
          Bracelet &amp; Strapwork
        </label>
        <div className="grid grid-cols-1 gap-2.5">
          {STRAP_OPTIONS.map((opt) => {
            const isActive = selectedStrap === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedStrap(opt.id)}
                type="button"
                className={`p-3 rounded-lg shadow-sm flex items-center justify-between text-left transition-all border cursor-pointer ${
                  isActive
                    ? "bg-surface-container-lowest border-primary ring-1 ring-primary/30"
                    : "bg-surface-container-low border-outline-variant/30 hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full shadow-inner shrink-0"
                    style={{ backgroundColor: opt.color }}
                  ></span>
                  <div className="flex flex-col">
                    <span className="font-title-md text-body-md text-on-surface font-medium">
                      {opt.name}
                    </span>
                    <span className="font-body-sm text-label-sm text-on-surface-variant">
                      {opt.description}
                    </span>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? "text-primary" : "text-outline-variant"
                  }`}
                >
                  {isActive ? "check_circle" : "radio_button_unchecked"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dial Finish Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">
          Dial Finish &amp; Métiers d'Art
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {DIAL_OPTIONS.map((opt) => {
            const isActive = selectedDial === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedDial(opt.id)}
                type="button"
                className={`p-3 rounded-lg shadow-sm flex flex-col gap-2 text-left transition-all border cursor-pointer ${
                  isActive
                    ? "bg-surface-container-lowest border-primary ring-1 ring-primary/30"
                    : "bg-surface-container-low border-outline-variant/30 hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-4 h-4 rounded-full shadow-inner"
                    style={{ backgroundColor: opt.color }}
                  ></span>
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isActive ? "text-primary" : "text-outline-variant"
                    }`}
                  >
                    {isActive ? "check" : "radio_button_unchecked"}
                  </span>
                </div>
                <div>
                  <span className="font-title-md text-body-sm font-semibold text-on-surface block">
                    {opt.name}
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    {opt.description}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
