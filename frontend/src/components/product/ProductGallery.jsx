import React, { useState } from "react";

export default function ProductGallery({ watch }) {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);

  const defaultGallery = watch.gallery && watch.gallery.length > 0 ? watch.gallery : [
    {
      title: "Front Dial",
      src: watch.mainImage || watch.image,
      alt: "Front dial view"
    }
  ];

  const handleAngleSwitch = (index) => {
    setImageOpacity(0.3);
    setTimeout(() => {
      setActiveAngleIndex(index);
      setImageOpacity(1);
    }, 150);
  };

  const toggleMagnify = () => {
    setIsZoomed(true);
    setTimeout(() => {
      setIsZoomed(false);
    }, 1500);
  };

  const currentImage = defaultGallery[activeAngleIndex] || defaultGallery[0];

  return (
    <div className="relative w-full bg-surface-container-low px-gutter-mobile pt-4 pb-6 flex flex-col items-center border-b border-outline-variant/20">
      {/* Main Focus Viewport */}
      <div className="relative w-full aspect-square max-w-[340px] md:max-w-[420px] flex items-center justify-center overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
        <img
          id="main-view"
          src={currentImage.src}
          alt={currentImage.alt || watch.name}
          style={{ opacity: imageOpacity }}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isZoomed ? "scale-125" : "scale-100"
          }`}
        />

        {/* Interactive Zoom Magnifier Badge */}
        <button
          aria-label="Magnify Dial Details"
          onClick={toggleMagnify}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface/85 backdrop-blur-md shadow-sm flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">zoom_in</span>
        </button>

        {/* 360 Degree Micro Indicator */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md shadow-sm flex items-center gap-1 border border-outline-variant/30">
          <span className="material-symbols-outlined text-primary text-[14px]">360</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface">
            Interactive Angle
          </span>
        </div>

        {/* Live Heartbeat of Tourbillon Delight */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-surface/80 backdrop-blur-sm flex items-center gap-1 border border-outline-variant/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm text-[9px] text-tertiary">
            {watch.specs?.frequency || "28,800 VPH"}
          </span>
        </div>
      </div>

      {/* Multi-Angle Thumbnails */}
      {defaultGallery.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 w-full max-w-[340px] md:max-w-[420px] mt-4">
          {defaultGallery.map((item, index) => {
            const isActive = activeAngleIndex === index;
            return (
              <button
                key={index}
                onClick={() => handleAngleSwitch(index)}
                className={`thumb-btn flex flex-col items-center gap-1 p-1 rounded-lg shadow-sm transition-all border cursor-pointer ${
                  isActive
                    ? "bg-surface-container-lowest border-primary opacity-100 ring-1 ring-primary/40"
                    : "bg-surface-container border-outline-variant/30 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="w-full aspect-square rounded overflow-hidden bg-surface-container">
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <span
                  className={`font-label-sm text-[9px] uppercase tracking-wider truncate ${
                    isActive ? "text-on-surface font-semibold" : "text-on-surface-variant"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
