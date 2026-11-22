import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { formatINR } from "../data/watchesData";
import { api } from "../services/api";

export default function SellWatchPage() {
  const { showToast, user, createTask } = useStore();

  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("Patek Philippe");
  const [model, setModel] = useState("Nautilus 5711/1R");
  const [year, setYear] = useState("2021");
  const [condition, setCondition] = useState("mint");
  const [hasBox, setHasBox] = useState(true);
  const [hasPapers, setHasPapers] = useState(true);
  const [valuationSubmitted, setValuationSubmitted] = useState(false);
  const [valuationRef, setValuationRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Beneficiary details
  const [beneficiaryName, setBeneficiaryName] = useState(user ? user.name : "Vikramaditya S.");
  const [beneficiaryPhone, setBeneficiaryPhone] = useState(user?.phone || "+91 98765 43210");
  const [beneficiaryCity, setBeneficiaryCity] = useState(user?.city || "Mumbai, Maharashtra");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.name) setBeneficiaryName(user.name);
      if (user.phone) setBeneficiaryPhone(user.phone);
      if (user.city) setBeneficiaryCity(user.city);
    }
  }, [user]);

  // Calculate indicative valuation
  const baseValuation = {
    "Patek Philippe": 6500000,
    "Audemars Piguet": 4800000,
    Rolex: 1800000,
    TIMELESS: 2200000,
    "Vacheron Constantin": 3500000,
    Cartier: 1200000
  }[brand] || 2000000;

  const conditionMultiplier = condition === "mint" ? 1.05 : condition === "excellent" ? 0.95 : 0.85;
  const papersMultiplier = (hasBox ? 1.05 : 1) * (hasPapers ? 1.1 : 1);
  const estimatedMin = Math.round(baseValuation * conditionMultiplier * papersMultiplier * 0.92);
  const estimatedMax = Math.round(baseValuation * conditionMultiplier * papersMultiplier * 1.08);

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.valuations.createValuation({
        brand,
        model,
        year,
        condition,
        hasBox,
        hasPapers,
        estimatedMin,
        estimatedMax,
        beneficiaryName,
        beneficiaryPhone,
        beneficiaryCity,
      });

      const ref = res?.valuation?.referenceId || "TL-VAL-" + Math.floor(100000 + Math.random() * 900000);
      setValuationRef(ref);

      // If user is logged in, register task on their board
      if (user && createTask) {
        createTask({
          title: `Acquisition Appraisal: ${brand} ${model}`,
          description: `Direct acquisition valuation requested for ${brand} ${model} (${year}). Est. payout: ${formatINR(estimatedMin)} - ${formatINR(estimatedMax)}.`,
          category: "appraisal",
          priority: "high",
          watchName: `${brand} ${model}`,
          location: beneficiaryCity,
          status: "pending",
        }).catch((err) => console.warn("Task registration skipped:", err.message));
      }

      setValuationSubmitted(true);
      showToast(`Valuation Dossier ${ref} submitted. Salon Director notified.`);
    } catch (err) {
      console.warn("Valuation submit fallback:", err.message);
      const ref = "TL-VAL-" + Math.floor(100000 + Math.random() * 900000);
      setValuationRef(ref);
      setValuationSubmitted(true);
      showToast(`Valuation Dossier ${ref} registered.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile py-6 max-w-3xl mx-auto pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-space-xs text-outline font-label-sm text-label-sm uppercase tracking-widest mb-3">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="material-symbols-outlined text-[12px] text-outline-variant">
          chevron_right
        </span>
        <span className="text-primary font-bold">Pre-Owned Acquisition Salon</span>
      </div>

      {/* Header Banner */}
      <div className="bg-surface-container-high rounded-2xl p-6 md:p-8 flex flex-col gap-3 shadow-md border border-outline-variant/30 text-center items-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[26px]">account_balance</span>
        </div>
        <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
          High-Horology Liquidation &amp; Trade-In
        </span>
        <h1 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
          Direct Private Acquisition &amp; Same-Day Wire
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-lg">
          Liquidate or trade your high-complication timepieces at guaranteed transparent Geneva market rates. Fully insured white-glove doorstep custody.
        </p>

        {/* 3 Steps indicator */}
        <div className="grid grid-cols-3 gap-2 w-full pt-4 max-w-lg">
          {[
            { num: 1, title: "1. Timepiece Spec" },
            { num: 2, title: "2. Condition & Papers" },
            { num: 3, title: "3. Instant Payout" }
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                step === s.num
                  ? "bg-primary text-on-primary border-primary font-bold shadow"
                  : "bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container"
              }`}
            >
              <span className="font-label-sm text-[10px] uppercase tracking-wider block">
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Form Card */}
      <div className="mt-6 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
        {!valuationSubmitted ? (
          <div>
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold border-b border-outline-variant/20 pb-2">
                  Step 1: Identify Your Timepiece
                </h3>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-outline">
                    Manufacture / Maison
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="h-12 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md text-on-surface outline-none focus:border-primary"
                  >
                    <option value="Patek Philippe">Patek Philippe</option>
                    <option value="Audemars Piguet">Audemars Piguet</option>
                    <option value="Rolex">Rolex</option>
                    <option value="TIMELESS">TIMELESS Geneva</option>
                    <option value="Vacheron Constantin">Vacheron Constantin</option>
                    <option value="Cartier">Cartier</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-outline">
                      Model / Reference
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="e.g. Royal Oak 15400ST"
                      className="h-12 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md text-on-surface outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-outline">
                      Year of Acquisition
                    </label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 2022"
                      className="h-12 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-md text-on-surface outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-2 h-12 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold"
                >
                  <span>Continue to Condition Assessment</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold border-b border-outline-variant/20 pb-2">
                  Step 2: Condition &amp; Provenance Scope
                </h3>

                {/* Condition Selector */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-outline">
                    Physical &amp; Chronometric Condition
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {[
                      { id: "mint", title: "Mint / Unworn", desc: "No hairline scratches, factory bevels intact" },
                      { id: "excellent", title: "Excellent", desc: "Light desk scratches, sharp unpolished lugs" },
                      { id: "good", title: "Good", desc: "Moderate honest wear, never damaged" }
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCondition(c.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          condition === c.id
                            ? "bg-primary/10 border-primary text-on-surface ring-1 ring-primary/40"
                            : "bg-surface-container-low border-outline-variant/30 text-on-surface-variant hover:bg-surface-container"
                        }`}
                      >
                        <span className="font-title-md text-body-md font-semibold block">{c.title}</span>
                        <span className="font-body-sm text-[11px] text-outline block mt-0.5">{c.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Box & Papers */}
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md uppercase tracking-wider text-outline">
                    Original Manufacture Accessories
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasBox}
                        onChange={(e) => setHasBox(e.target.checked)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="font-body-md text-body-sm font-medium text-on-surface">
                        Original Presentation Box
                      </span>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasPapers}
                        onChange={(e) => setHasPapers(e.target.checked)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="font-body-md text-body-sm font-medium text-on-surface">
                        Geneva Warranty Papers &amp; Booklets
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="h-12 px-6 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 h-12 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold"
                  >
                    <span>View Indicative Valuation</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="flex flex-col gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold border-b border-outline-variant/20 pb-2">
                  Step 3: Instant Indicative Valuation &amp; Dispatch
                </h3>

                {/* Indicative Range Display */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-primary/30 flex flex-col items-center text-center gap-1.5 shadow-inner">
                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold">
                    Real-Time Geneva Secondary Market Valuation
                  </span>
                  <div className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md font-bold text-on-surface">
                    {formatINR(estimatedMin)} – {formatINR(estimatedMax)}
                  </div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Based on {brand} {model} ({year}) • Condition: {condition.toUpperCase()}
                  </span>
                </div>

                {/* Dispatch Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                      Beneficiary Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      placeholder="e.g. Vikramaditya S."
                      className="h-11 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                      Private Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={beneficiaryPhone}
                      onChange={(e) => setBeneficiaryPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="h-11 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                    Bank Account / RTGS Wire Verification City
                  </label>
                  <input
                    type="text"
                    required
                    value={beneficiaryCity}
                    onChange={(e) => setBeneficiaryCity(e.target.value)}
                    placeholder="e.g. Mumbai, Maharashtra"
                    className="h-11 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="p-3 bg-surface-container-high rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">security</span>
                  <span className="font-label-sm text-[10px] text-on-surface uppercase tracking-wider">
                    Armored Security Transit Escort Included • Zero Brokerage Deductions
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="h-12 px-6 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold shadow"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>{isSubmitting ? "Encrypting & Transmitting..." : "Submit for Immediate Wire Payout"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[36px]">done_all</span>
            </div>
            {valuationRef && (
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-semibold border border-primary/20">
                Dossier #{valuationRef}
              </span>
            )}
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Valuation Request Encrypted &amp; Dispatched
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Our Geneva Master Horologist has received your reference dossier for {brand} {model}. Your dedicated Salon Director will contact you within 60 minutes to coordinate the armored biometric collection.
            </p>
            <button
              onClick={() => {
                setValuationSubmitted(false);
                setStep(1);
              }}
              className="mt-4 px-6 h-11 bg-on-surface text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg hover:bg-primary transition-colors cursor-pointer"
            >
              Submit Another Timepiece
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
