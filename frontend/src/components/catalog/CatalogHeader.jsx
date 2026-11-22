import React from "react";
import { Link } from "react-router-dom";

export default function CatalogHeader({ totalCount = 34 }) {
  return (
    <section className="px-margin-mobile pt-4 pb-2 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-widest">
        <Link to="/" className="hover:text-primary transition-colors">
          Haute Horlogerie
        </Link>
        <span className="material-symbols-outlined text-[12px] text-outline-variant">
          chevron_right
        </span>
        <span className="text-primary font-bold">Catalog &amp; Complications</span>
      </div>

      <div className="flex flex-col mt-2">
        <div className="flex items-baseline justify-between">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
            Curated Vault
          </h1>
          <span className="font-label-md text-label-md text-primary bg-primary-fixed/30 px-space-sm py-1 rounded-full font-semibold border border-primary/20">
            {totalCount} Calibres Listed
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xl">
          Exclusively certified Geneva seal &amp; COSC chronometers prepared for private custody.
        </p>
      </div>
    </section>
  );
}
