import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { BRAND_EMBLEM, USER_AVATAR } from "../../data/watchesData";

export default function MenuDrawer() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    user,
    logout,
    tasks,
    setIsAuthModalOpen,
    setIsTasksModalOpen
  } = useStore();

  if (!isMenuOpen) return null;

  const pendingTasksCount = tasks.filter((t) => t.status !== "completed").length;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-sm bg-surface shadow-2xl h-full flex flex-col z-10 overflow-y-auto border-r border-outline-variant/30">
        {/* Drawer Header */}
        <div className="p-space-md border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <img
              alt="TIMELESS Emblem"
              className="h-8 w-auto object-contain"
              src={BRAND_EMBLEM}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase tracking-widest text-on-surface leading-none">
                TIMELESS
              </span>
              <span className="font-label-sm text-[9px] text-outline uppercase tracking-wider">
                Manufacture de Haute Horlogerie
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="p-space-md bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="Client Profile"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-primary"
              src={USER_AVATAR}
            />
            <div className="flex flex-col">
              <span className="font-title-md text-title-md text-on-surface font-semibold">
                {user ? user.name : "Guest Connoisseur"}
              </span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                {user ? user.tier || "Tier-1 Geneva Priority" : "Haute Horlogerie Guest"}
              </span>
            </div>
          </div>

          {user ? (
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-2 text-outline hover:text-error transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="px-2.5 py-1 bg-primary text-on-primary text-[10px] font-bold uppercase rounded-lg cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="p-space-md flex flex-col gap-6">
          {/* Main Navigation */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline mb-1">
              Curated Navigation
            </span>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-surface-container flex items-center justify-between text-on-surface hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                <span className="font-title-md text-body-md font-medium">Flagship Showcase</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </Link>

            <Link
              to="/catalog"
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-surface-container flex items-center justify-between text-on-surface hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">watch</span>
                <span className="font-title-md text-body-md font-medium">Curated Vault</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </Link>

            <Link
              to="/sell"
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-surface-container flex items-center justify-between text-on-surface hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">sell</span>
                <span className="font-title-md text-body-md font-medium">Acquisition &amp; Trade-In</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </Link>

            {/* Concierge & Collector Tasks */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (user) {
                  setIsTasksModalOpen(true);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="py-2.5 px-3 rounded-lg hover:bg-surface-container flex items-center justify-between text-on-surface hover:text-primary transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
                <span className="font-title-md text-body-md font-medium">Concierge Tasks</span>
              </div>
              {pendingTasksCount > 0 ? (
                <span className="px-2 py-0.5 bg-primary text-on-primary text-[10px] rounded-full font-bold">
                  {pendingTasksCount}
                </span>
              ) : (
                <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
              )}
            </button>

            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-surface-container flex items-center justify-between text-on-surface hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">bookmark</span>
                <span className="font-title-md text-body-md font-medium">Saved Timepieces</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </Link>

            <Link
              to="/bag"
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-surface-container flex items-center justify-between text-on-surface hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px]">shopping_bag</span>
                <span className="font-title-md text-body-md font-medium">Private Custody Bag</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            </Link>
          </div>

          {/* Curated Salons */}
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-outline mb-1">
              Curated Salons
            </span>
            <Link
              to="/catalog?filter=tourbillon"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors flex items-center justify-between"
            >
              <span>Tourbillon &amp; Complications</span>
              <span className="font-label-sm text-[10px] text-outline">Masterpieces</span>
            </Link>
            <Link
              to="/catalog?filter=rose-gold"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors flex items-center justify-between"
            >
              <span>18K Solid Rose Gold</span>
              <span className="font-label-sm text-[10px] text-outline">Precious Metal</span>
            </Link>
            <Link
              to="/catalog?filter=platinum"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors flex items-center justify-between"
            >
              <span>950 Platinum Calibres</span>
              <span className="font-label-sm text-[10px] text-outline">Limited Series</span>
            </Link>
          </div>

          {/* Atelier Salons */}
          <div className="p-3 bg-surface-container-high rounded-xl flex flex-col gap-2">
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-primary font-bold">
              Private Concierge &amp; Viewing
            </span>
            <p className="font-body-sm text-[11px] text-on-surface-variant">
              Personal champagne appointments in Mumbai, New Delhi, Zurich, and Geneva salons.
            </p>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (user) {
                  setIsTasksModalOpen(true);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="h-9 bg-on-surface text-on-primary font-label-sm text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5 hover:bg-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">support_agent</span>
              Direct Concierge Channel
            </button>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="mt-auto p-space-md border-t border-outline-variant/20 text-center font-label-sm text-[10px] text-outline uppercase tracking-wider">
          Swiss Precision • Geneva Seal Standard
        </div>
      </div>
    </div>
  );
}
