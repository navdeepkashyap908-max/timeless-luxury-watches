import React from "react";

export default function TechnicalSpecs({ watch }) {
  const specs = watch.specs || {};

  const specRows = [
    { label: "Case Metallurgy", value: specs.metallurgy || "18k 4N Solid Rose Gold" },
    { label: "Dimensions", value: specs.dimensions || "41.0 mm × 10.8 mm" },
    { label: "Crystal & Caseback", value: specs.crystal || "Cambered Sapphire (Double AR coating)" },
    { label: "Dial Architecture", value: specs.dial || "Clous de Paris Guilloché + Appliques" },
    { label: "Escapement", value: specs.escapement || "1-Minute Flying Tourbillon (Titanium Cage)" },
    { label: "Power Autonomy", value: specs.powerReserve || "72 Hours Twin-Barrel Reserve" },
    { label: "Water Tightness", value: specs.waterTightness || "10 ATM (100 Metres / 330 Feet)" },
    {
      label: "Chronometry Standard",
      value: specs.chronometry || "COSC & Poinçon de Genève",
      isHighlight: true
    }
  ];

  return (
    <div className="px-margin-mobile mt-8 flex flex-col max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-title-md text-title-md text-on-surface uppercase tracking-wider font-semibold">
          Technical Specifications
        </h3>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          {specs.calibre || "Calibre TL-8800"}
        </span>
      </div>

      <div className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col border border-outline-variant/30">
        {specRows.map((row, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={row.label}
              className={`flex items-center justify-between p-3.5 ${
                isEven ? "bg-surface-container-low" : "bg-surface-container-lowest"
              }`}
            >
              <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">
                {row.label}
              </span>
              {row.isHighlight ? (
                <span className="font-body-md text-body-md text-primary font-bold text-right flex items-center gap-1 justify-end">
                  <span className="material-symbols-outlined text-[16px]">military_tech</span>
                  {row.value}
                </span>
              ) : (
                <span className="font-body-md text-body-md text-on-surface font-semibold text-right">
                  {row.value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
