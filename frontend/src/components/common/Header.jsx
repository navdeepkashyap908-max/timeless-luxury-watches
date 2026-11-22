import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { BRAND_EMBLEM, USER_AVATAR } from "../../data/watchesData";

export default function Header() {
  const {
    user,
    logout,
    wishlist,
    bagCount,
    tasks,
    setIsMenuOpen,
    setIsSearchOpen,
    setIsBagOpen,
    setIsAuthModalOpen,
    setIsTasksModalOpen
  } = useStore();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pendingTasksCount = tasks.filter((t) => t.status !== "completed").length;

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30">
      <div className="h-16 px-gutter-mobile flex items-center justify-between gap-space-sm max-w-7xl mx-auto">
        {/* Left: Menu Toggle + Brand Emblem */}
        <div className="flex items-center gap-space-sm">
          <button
            aria-label="Open Curated Menu"
            onClick={() => setIsMenuOpen(true)}
            className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          <Link to="/" className="flex items-center gap-space-xs group">
            <img
              alt="TIMELESS Haute Horlogerie Emblem"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src={BRAND_EMBLEM}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm uppercase tracking-widest text-on-surface leading-none">
                TIMELESS
              </span>
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider scale-90 origin-left">
                Every Second Tells a Story
              </span>
            </div>
          </Link>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className="font-label-md text-label-md uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
          >
            Showcase
          </Link>
          <Link
            to="/catalog"
            className="font-label-md text-label-md uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
          >
            Curated Vault
          </Link>
          <Link
            to="/sell"
            className="font-label-md text-label-md uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
          >
            Acquisition Salon
          </Link>
          {user && (
            <button
              onClick={() => setIsTasksModalOpen(true)}
              className="font-label-md text-label-md uppercase tracking-widest text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
              <span>Concierge Tasks</span>
              {pendingTasksCount > 0 && (
                <span className="px-1.5 py-0.2 bg-primary text-on-primary rounded-full text-[10px] font-bold">
                  {pendingTasksCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Right: Actions (Search, Tasks, Wishlist, Bag, Collector Profile) */}
        <div className="flex items-center gap-space-xs">
          {/* Concierge Tasks Shortcut (Desktop/Tablet) */}
          <button
            onClick={() => {
              if (user) {
                setIsTasksModalOpen(true);
              } else {
                setIsAuthModalOpen(true);
              }
            }}
            aria-label="Concierge Tasks"
            className="relative hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface hover:text-primary transition-colors text-xs font-semibold cursor-pointer border border-outline-variant/30"
            title="Concierge & Collector Tasks"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">assignment</span>
            <span className="font-label-sm uppercase tracking-wider">Tasks</span>
            {pendingTasksCount > 0 && (
              <span className="w-4 h-4 bg-primary text-on-primary font-label-sm text-[9px] flex items-center justify-center rounded-full font-bold">
                {pendingTasksCount}
              </span>
            )}
          </button>

          {/* Search Button */}
          <button
            aria-label="Search Archive"
            onClick={() => setIsSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="relative w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
            title="Private Wishlist"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary text-on-primary font-label-sm text-[9px] flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Bag Button */}
          <button
            onClick={() => setIsBagOpen(true)}
            aria-label="Open Shopping Bag"
            className="relative w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors cursor-pointer"
            title="Private Bag"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {bagCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary-container text-on-primary-container font-label-sm text-[9px] font-bold flex items-center justify-center rounded-full">
                {bagCount}
              </span>
            )}
          </button>

          {/* Collector Profile / Sign In Dropdown */}
          <div className="relative pl-1" ref={userMenuRef}>
            {user ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="Collector Menu"
                className="flex items-center gap-1.5 p-1 rounded-full hover:ring-2 hover:ring-primary/40 transition-all cursor-pointer"
              >
                <img
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary"
                  src={USER_AVATAR}
                />
                <span className="material-symbols-outlined text-[16px] text-outline hidden md:block">
                  expand_more
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-[11px] uppercase tracking-wider hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[15px]">lock</span>
                <span>Sign In</span>
              </button>
            )}

            {/* Dropdown Menu */}
            {isUserMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-64 bg-surface rounded-2xl shadow-2xl border border-outline-variant/40 py-3 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-outline-variant/20">
                  <div className="font-title-md text-sm font-bold text-on-surface truncate">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-outline truncate">{user.email}</div>
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    {user.tier || "Connoisseur VIP"}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsTasksModalOpen(true);
                    }}
                    className="w-full px-4 py-2 text-left text-body-sm text-on-surface hover:bg-surface-container flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">assignment</span>
                      <span>Concierge Tasks</span>
                    </div>
                    {pendingTasksCount > 0 && (
                      <span className="px-1.5 py-0.5 bg-primary text-on-primary text-[10px] rounded-full font-bold">
                        {pendingTasksCount}
                      </span>
                    )}
                  </button>

                  <Link
                    to="/wishlist"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full px-4 py-2 text-left text-body-sm text-on-surface hover:bg-surface-container flex items-center gap-2.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">favorite</span>
                    <span>Saved Timepieces ({wishlist.length})</span>
                  </Link>

                  <Link
                    to="/bag"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="w-full px-4 py-2 text-left text-body-sm text-on-surface hover:bg-surface-container flex items-center gap-2.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">shopping_bag</span>
                    <span>Custody Bag ({bagCount})</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-outline-variant/20">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 text-left text-body-sm text-error hover:bg-error-container/20 flex items-center gap-2.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
