import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { WATCHES, STRAP_OPTIONS } from "../data/watchesData";
import ProductGallery from "../components/product/ProductGallery";
import ProductPricing from "../components/product/ProductPricing";
import BespokeConfigurator from "../components/product/BespokeConfigurator";
import AcquisitionActions from "../components/product/AcquisitionActions";
import TechnicalSpecs from "../components/product/TechnicalSpecs";
import ConnoisseurReviews from "../components/product/ConnoisseurReviews";
import RelatedTimepieces from "../components/product/RelatedTimepieces";
import StickyConciergeBar from "../components/product/StickyConciergeBar";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find watch by id, or default to royal-chronometer
  const watch = WATCHES.find((w) => w.id === id) || WATCHES[0];

  const [selectedStrap, setSelectedStrap] = useState("alligator-cognac");
  const [selectedDial, setSelectedDial] = useState("champagne");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Calculate customized price based on configuration
  const strapObj = STRAP_OPTIONS.find((s) => s.id === selectedStrap);
  const additionalCost = strapObj ? strapObj.additionalPrice : 0;
  const currentPrice = watch.price + additionalCost;

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Return Navigation Sub-Header */}
      <div className="w-full bg-surface-container-low px-margin-mobile py-2.5 flex items-center justify-between border-b border-outline-variant/20 max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-on-surface hover:text-primary transition-colors font-label-sm text-label-sm uppercase tracking-wider cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Previous Atelier</span>
        </button>
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
          {watch.reference}
        </span>
      </div>

      {/* Status & Rarity Ribbon */}
      <div className="w-full bg-surface-container-high px-margin-mobile py-2 flex items-center justify-between border-b border-outline-variant/30 max-w-5xl mx-auto">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
            {watch.statusBadge || "Atelier Allocation • Boutique Exclusive"}
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-semibold">
          {watch.reference}
        </span>
      </div>

      {/* Product Gallery */}
      <ProductGallery watch={watch} />

      {/* Identity & Pricing */}
      <ProductPricing watch={watch} currentPrice={currentPrice} />

      {/* Bespoke Configuration Studio */}
      <BespokeConfigurator
        selectedStrap={selectedStrap}
        setSelectedStrap={setSelectedStrap}
        selectedDial={selectedDial}
        setSelectedDial={setSelectedDial}
      />

      {/* Immediate Acquisition & Boutique Availability */}
      <AcquisitionActions
        watch={watch}
        currentPrice={currentPrice}
        selectedStrap={selectedStrap}
        selectedDial={selectedDial}
      />

      {/* Horological Technical Specifications Grid */}
      <TechnicalSpecs watch={watch} />

      {/* Verified Connoisseur Testimonials */}
      <ConnoisseurReviews />

      {/* Related Complications & Curated Pairings */}
      <RelatedTimepieces currentWatchId={watch.id} />

      {/* Bottom Floating Concierge Quick-Bar */}
      <StickyConciergeBar
        watch={watch}
        currentPrice={currentPrice}
        selectedStrap={selectedStrap}
        selectedDial={selectedDial}
      />
    </div>
  );
}
