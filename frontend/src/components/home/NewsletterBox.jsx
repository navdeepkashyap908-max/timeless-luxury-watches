import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function NewsletterBox() {
  const [email, setEmail] = useState("");
  const { showToast } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.");
      return;
    }
    showToast("Salon Invitation request received. Priority allocation dossier sent.");
    setEmail("");
  };

  return (
    <section className="w-full px-margin-mobile pt-space-md pb-space-xl max-w-2xl mx-auto">
      <div className="bg-surface-container-high rounded-xl p-space-lg shadow-sm flex flex-col items-center text-center gap-space-md border border-outline-variant/30">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[26px]">
            mark_email_unread
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold">
            Private Salon Gazette
          </span>
          <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface">
            Join the Connoisseurs Circle
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
            Receive confidential priority allocations of single-piece editions and private preview invitations in Mumbai and Geneva.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
          <input
            className="w-full h-12 px-space-md bg-surface-container-lowest text-on-surface rounded-lg font-body-sm text-body-sm shadow-sm outline-none focus:ring-1 focus:ring-primary border border-outline-variant/30"
            placeholder="Enter your private dispatch email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded-lg shadow-sm hover:bg-primary-container hover:text-on-primary-container transition-colors font-semibold cursor-pointer"
          >
            Request Salon Invitation
          </button>
        </form>
      </div>
    </section>
  );
}
