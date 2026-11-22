import React from "react";
import { useStore } from "../../context/StoreContext";

export default function Toast() {
  const { toast } = useStore();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none"
    >
      <div className="bg-on-surface text-on-primary px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-primary-container/40">
        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
        <span className="font-body-sm text-body-sm text-surface tracking-wide">
          {toast.message}
        </span>
      </div>
    </div>
  );
}
