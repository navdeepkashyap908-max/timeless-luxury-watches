import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function SalonViewingModal() {
  const { salonViewingWatch, setSalonViewingWatch, showToast } = useStore();
  const [salonCity, setSalonCity] = useState("Mumbai");
  const [collectorName, setCollectorName] = useState("");
  const [collectorPhone, setCollectorPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");

  if (!salonViewingWatch) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!collectorName || !collectorPhone) {
      showToast("Please provide your name and contact number.");
      return;
    }
    showToast(`Viewing request confirmed for ${salonCity} salon. Private Client Director will contact you within 2 hours.`);
    setSalonViewingWatch(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
        onClick={() => setSalonViewingWatch(null)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl z-10 border border-primary-container/40 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              apartment
            </span>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                Reserve Salon Viewing
              </h3>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline">
                Private Champagne Presentation
              </span>
            </div>
          </div>
          <button
            onClick={() => setSalonViewingWatch(null)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block">
                Timepiece Requested
              </span>
              <span className="font-title-md text-body-md font-semibold text-on-surface">
                {salonViewingWatch.name}
              </span>
              <span className="font-body-sm text-[11px] text-secondary block">
                {salonViewingWatch.reference}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded bg-primary-fixed/40 text-on-primary-fixed font-label-sm text-[10px] uppercase font-bold">
              In Vault
            </span>
          </div>

          {/* City Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">
              Select Private Salon Location
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { city: "Mumbai", desc: "BKC Flagship Suite" },
                { city: "New Delhi", desc: "Chanakyapuri Salon" },
                { city: "Zurich", desc: "Bahnhofstrasse Atelier" }
              ].map((loc) => (
                <button
                  type="button"
                  key={loc.city}
                  onClick={() => setSalonCity(loc.city)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    salonCity === loc.city
                      ? "border-primary bg-primary/5 text-on-surface"
                      : "border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  <span className="font-title-md text-body-sm font-semibold block">{loc.city}</span>
                  <span className="font-body-sm text-[10px] text-outline block">{loc.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                Collector Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikramaditya S."
                value={collectorName}
                onChange={(e) => setCollectorName(e.target.value)}
                className="h-11 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                Private Phone / WhatsApp
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={collectorPhone}
                onChange={(e) => setCollectorPhone(e.target.value)}
                className="h-11 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
              Preferred Viewing Date
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="h-11 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </div>

          <p className="font-body-sm text-[11px] text-secondary">
            * Strict discretion assured. Our master horologist and security detail will accompany your dedicated appointment.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSalonViewingWatch(null)}
              className="h-11 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">event_available</span>
              Confirm Viewing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
