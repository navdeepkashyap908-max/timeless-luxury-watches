import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center text-center px-margin-mobile py-24 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
        <span className="material-symbols-outlined text-[36px]">history_toggle_off</span>
      </div>
      <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
        Chronometric Deviation
      </span>
      <h1 className="font-headline-sm md:font-headline-lg text-headline-sm md:text-headline-lg text-on-surface mt-1">
        404 — Complication Uncharted
      </h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md">
        The archive reference you requested has slipped out of synchronization. Return to the Curated Vault to inspect our active allocations.
      </p>
      <div className="flex items-center gap-3 mt-6">
        <Link
          to="/"
          className="h-11 px-6 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center"
        >
          Maison Flagship
        </Link>
        <Link
          to="/catalog"
          className="h-11 px-6 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center font-semibold"
        >
          Curated Vault
        </Link>
      </div>
    </div>
  );
}
