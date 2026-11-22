import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BRAND_EMBLEM } from "../../data/watchesData";
import { useStore } from "../../context/StoreContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { showToast } = useStore();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("Private Salon Gazette invitation dispatched.");
    setEmail("");
  };

  return (
    <footer className="w-full bg-surface-container-low mt-space-2xl px-margin-mobile py-space-xl text-on-surface-variant flex flex-col gap-space-lg shadow-[0_-1px_6px_rgba(0,0,0,0.02)] border-t border-outline-variant/30">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-space-lg">
        {/* Emblem & Title */}
        <div className="flex flex-col items-center text-center gap-space-xs">
          <img
            alt="TIMELESS Haute Horlogerie Emblem"
            className="h-9 w-auto object-contain opacity-80"
            src={BRAND_EMBLEM}
          />
          <span className="font-headline-sm text-headline-sm uppercase tracking-widest text-on-surface pt-space-xs">
            TIMELESS
          </span>
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
            Manufacture de Haute Horlogerie
          </span>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-2 gap-space-md py-space-md bg-surface-container-lowest/60 p-space-md rounded-xl backdrop-blur-sm border border-outline-variant/20">
          <div className="flex flex-col items-center text-center gap-1">
            <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
              5-Year Guarantee
            </span>
            <span className="font-body-sm text-body-sm text-secondary">Manufacture calibration</span>
          </div>
          <div className="flex flex-col items-center text-center gap-1">
            <span className="material-symbols-outlined text-primary text-[22px]">shield</span>
            <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
              Swiss Certified
            </span>
            <span className="font-body-sm text-body-sm text-secondary">Geneva Seal &amp; COSC</span>
          </div>
        </div>

        {/* Dispatch Newsletter Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">
            Private Salon Gazette
          </label>
          <div className="flex items-center gap-space-xs">
            <input
              className="flex-1 h-12 bg-surface-container-lowest px-space-md font-body-sm text-body-sm text-on-surface placeholder:text-outline rounded-lg outline-none focus:ring-1 focus:ring-primary-container border border-outline-variant/30"
              placeholder="Your exclusive dispatch email..."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="h-12 px-space-lg bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary transition-colors cursor-pointer"
            >
              Join
            </button>
          </div>
        </form>

        {/* Concierge Info */}
        <div className="flex flex-col gap-space-xs pt-space-xs text-center">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary">
            Haute Horlogerie Concierge
          </span>
          <span className="font-body-sm text-body-sm text-secondary">
            Geneva • Zurich • Mumbai (Bespoke INR ₹ Invoicing &amp; Insured Transit)
          </span>
          <a
            className="font-title-md text-title-md text-on-surface underline decoration-primary-container underline-offset-4 pt-1 hover:text-primary transition-colors"
            href="mailto:salon@timeless-horlogerie.ch"
          >
            salon@timeless-horlogerie.ch
          </a>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap justify-center gap-space-md pt-space-sm font-label-sm text-label-sm uppercase tracking-wider text-outline">
          <Link to="/" className="hover:text-primary transition-colors">
            Maison Heritage
          </Link>
          <Link to="/catalog" className="hover:text-primary transition-colors">
            Provenance Registry
          </Link>
          <Link to="/sell" className="hover:text-primary transition-colors">
            Terms of Custody
          </Link>
          <Link to="/catalog" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>

        <div className="text-center font-body-sm text-body-sm text-outline pt-space-xs">
          © 2025 TIMELESS Horlogerie S.A. All Complications Reserved.
        </div>
      </div>
    </footer>
  );
}
