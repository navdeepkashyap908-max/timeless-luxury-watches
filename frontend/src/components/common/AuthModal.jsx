import React, { useState } from "react";
import { useStore } from "../../context/useStore";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, showToast } = useStore();
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      if (isRegister) {
        await register(name, email, password, phone, city);
      } else {
        await login(email, password);
      }
      setIsAuthModalOpen(false);
    } catch (err) {
      setErrorMsg(err.message || "Authentication error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg("");
    setIsLoading(true);
    try {
      await login("collector@timeless.ch", "Password123!");
      setIsAuthModalOpen(false);
    } catch (err) {
      setErrorMsg(err.message || "Failed to sign in with demo account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
        onClick={() => setIsAuthModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl z-10 border border-primary-container/40 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">lock</span>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                {isRegister ? "Join TIMELESS Salon" : "Connoisseur Sign In"}
              </h3>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline">
                Haute Horlogerie Private Access
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {errorMsg && (
            <div className="p-3 bg-error-container/60 border border-error/40 text-on-error-container rounded-lg text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-error">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {isRegister && (
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                Full Collector Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikramaditya Singhania"
                className="h-11 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
              Private Dispatch Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="collector@timeless.ch"
              className="h-11 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
              Secret Passcode
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
            />
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                  Private Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98200 98200"
                  className="h-11 px-3 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                  Primary Salon City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11 px-2 bg-surface-container-low border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Geneva">Geneva</option>
                  <option value="Zurich">Zurich</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer font-semibold shadow"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Authenticating with Geneva Vault...</span>
              </>
            ) : (
              <span>{isRegister ? "Create Collector Account" : "Access Private Salon"}</span>
            )}
          </button>

          {/* Quick Demo Login Button */}
          {!isRegister && (
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="h-10 bg-surface-container text-on-surface font-label-sm text-[10px] uppercase tracking-wider rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5 border border-outline-variant/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">key</span>
              <span>1-Click Demo Login (collector@timeless.ch)</span>
            </button>
          )}

          {/* Switch Register/Login */}
          <div className="text-center pt-2 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMsg("");
              }}
              className="text-body-sm text-primary hover:underline cursor-pointer"
            >
              {isRegister
                ? "Already hold a salon account? Sign In"
                : "New collector? Request Invitation & Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
