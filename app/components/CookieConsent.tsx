"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { classNames } from "../utils/appearance";
import {
  IoShieldCheckmarkOutline,
  IoSettingsOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
} from "react-icons/io5";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

function CookieConsent() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookie-consent-v2");
    if (!consent) {
      // Delay display slightly for a smooth transition feel
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsentState = (state: ConsentState) => {
    localStorage.setItem("cookie-consent-v2", JSON.stringify(state));
    
    // Trigger Google Consent Mode v2 update if gtag is available
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: state.marketing ? "granted" : "denied",
        ad_user_data: state.marketing ? "granted" : "denied",
        ad_personalization: state.marketing ? "granted" : "denied",
        analytics_storage: state.analytics ? "granted" : "denied",
      });
    }

    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = { necessary: true, analytics: true, marketing: true };
    saveConsentState(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected = { necessary: true, analytics: false, marketing: false };
    saveConsentState(allRejected);
  };

  const handleSavePreferences = () => {
    saveConsentState(preferences);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 max-w-md w-[calc(100%-32px)] md:w-[380px] z-50 animate-slide-up-fade">
      <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[28px] p-5 flex flex-col gap-4 text-slate-800 transition-all duration-300">
        
        {/* Header Block */}
        <div className="flex items-start gap-3">
          <div className={classNames(
            "p-2.5 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md",
            theme.primary
          )}>
            <IoShieldCheckmarkOutline className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h4 className="font-extrabold text-sm tracking-tight text-slate-900">
              Cookie Consent
            </h4>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed">
              We use cookies to optimize prices, remember shopping lists, and analyze site performance.
            </p>
          </div>
        </div>

        {/* Customization Details Accordion */}
        {showCustomize && (
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-3.5 animate-fade-in">
            <div className="flex flex-col gap-2.5">
              
              {/* Essential Option */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    Essential
                    <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full font-extrabold uppercase">Required</span>
                  </span>
                  <span className="text-[10px] text-slate-500 leading-tight">Theme settings and list caching.</span>
                </div>
                <input 
                  type="checkbox" 
                  checked 
                  disabled 
                  className="w-4 h-4 rounded text-slate-400 bg-slate-200 border-slate-300 cursor-not-allowed" 
                />
              </div>

              {/* Analytics Option */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-800">Analytics Cookies</span>
                  <span className="text-[10px] text-slate-500 leading-tight">Anonymized analytics to improve deal finding.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Marketing/Ads Option */}
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-800">Marketing Cookies</span>
                  <span className="text-[10px] text-slate-500 leading-tight">Google AdSense tailored deals.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

            </div>
          </div>
        )}

        {/* Buttons Action Panel */}
        <div className="flex flex-col gap-2">
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRejectAll}
              className="flex-1 py-2 px-3 text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Reject All
            </button>
            <button
              onClick={() => setShowCustomize(!showCustomize)}
              className="py-2 px-3 text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl flex items-center justify-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Customize cookie settings"
            >
              <IoSettingsOutline className="w-3.5 h-3.5" />
              {showCustomize ? (
                <IoChevronUpOutline className="w-3.5 h-3.5" />
              ) : (
                <IoChevronDownOutline className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showCustomize ? (
            <button
              onClick={handleSavePreferences}
              className={classNames(
                "w-full py-2.5 px-4 text-xs font-bold text-white shadow-sm transition-all duration-200 active:scale-95 rounded-xl hover:brightness-105 cursor-pointer",
                theme.primary
              )}
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={handleAcceptAll}
              className={classNames(
                "w-full py-2.5 px-4 text-xs font-bold text-white shadow-md transition-all duration-200 active:scale-95 rounded-xl hover:brightness-105 cursor-pointer",
                theme.primary
              )}
            >
              Accept All
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default CookieConsent;
