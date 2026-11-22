import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HERO_IMAGE } from "../../data/watchesData";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-surface-container-low px-margin-mobile pt-space-xl pb-space-2xl border-b border-outline-variant/20">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-space-sm">
        {/* Masterpiece Edition Tag */}
        <div className="inline-flex items-center gap-2 px-space-md py-1 bg-surface-container-lowest rounded-full shadow-sm border border-outline-variant/30">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Masterpiece Edition • 2025 Release
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline-lg-mobile md:font-display text-headline-lg-mobile md:text-display text-on-surface tracking-tight uppercase max-w-xl">
          Time is your greatest luxury.
        </h1>

        {/* Subtitle */}
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
          Discover timeless craftsmanship. Explore watches that define your personality.
        </p>

        {/* Hero Action CTAs */}
        <div className="flex flex-row items-center gap-space-sm w-full pt-space-xs max-w-xs justify-center">
          <Link
            to="/catalog"
            className="flex-1 h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <button
            onClick={() => navigate("/watch/royal-chronometer")}
            className="flex-1 h-12 bg-surface-container-lowest text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg shadow-sm hover:bg-surface-container transition-colors border border-outline-variant/40"
          >
            Shop Now
          </button>
        </div>

        {/* Masterpiece Visual Frame */}
        <div
          onClick={() => navigate("/watch/royal-chronometer")}
          className="relative w-full max-w-md mt-space-md bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col items-center cursor-pointer group border border-outline-variant/30 hover:border-primary-container/60 transition-all duration-300"
        >
          <div className="relative w-full h-72 rounded-lg overflow-hidden bg-surface-container-high">
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Macro cinematic shot of an ultra-luxury rose gold tourbillon watch with skeletonized grand complication dial"
              src={HERO_IMAGE}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent"></div>

            {/* Complication Annotations */}
            <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-2 border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[16px]">
                all_inclusive
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-[9px] uppercase tracking-wider text-outline leading-none">
                  Escapement
                </span>
                <span className="font-title-md text-[11px] text-on-surface leading-tight font-semibold">
                  60-Sec Tourbillon
                </span>
              </div>
            </div>

            <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[15px]">verified</span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface font-bold">
                Calibre T.901
              </span>
            </div>
          </div>

          {/* Trust Authenticity Pill */}
          <div className="mt-space-sm flex items-center justify-center gap-2 px-space-md py-2 bg-surface-container-high rounded-lg w-full text-center">
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface font-medium">
              Geneva Seal Certified • 5-Year Global Warranty
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
