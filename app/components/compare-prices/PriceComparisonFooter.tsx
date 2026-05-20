"use client";
import React, { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";

const PriceComparisonFooter = ({
  lowestTotal,
  highestTotal,
  saveTotal,
  setShowLowestPrice,
}: {
  lowestTotal: string;
  highestTotal: string;
  saveTotal: string;
  setShowLowestPrice: (value: boolean) => void;
  theme: any; // Maintain compatibility
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"lowest" | "highest">("lowest");

  const isSaving = parseFloat(saveTotal) > 0;

  const handleSelectTab = (tab: "lowest" | "highest") => {
    setActiveTab(tab);
    setShowLowestPrice(tab === "lowest");
  };

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md mx-auto">
      <div className="bg-white/90 backdrop-blur-md border border-white/60 shadow-2xl rounded-3xl p-4 flex flex-col gap-3 select-none">
        
        {/* Top Savings Info Bar */}
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total Savings
            </span>
            <p className="text-xs md:text-sm font-extrabold text-slate-700 truncate mt-0.5">
              {isSaving ? (
                <>
                  SmartList saves you <span className="text-emerald-600 font-black">£{saveTotal}</span>!
                </>
              ) : (
                "Priced consistently across stores"
              )}
            </p>
          </div>
          
          {isSaving ? (
            <div className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm shadow-emerald-500/20 select-none shrink-0 animate-pulse">
              SAVE £{saveTotal}
            </div>
          ) : (
            <div className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full select-none shrink-0">
              Consistent
            </div>
          )}
        </div>

        {/* Sliding Segmented Selector Control (iOS inspired) */}
        <div className="relative flex bg-slate-100 rounded-2xl p-1 items-center h-14">
          
          {/* Sliding active pill indicator */}
          <div
            style={{
              width: "calc(50% - 4px)",
              transform: `translateX(${activeTab === "lowest" ? "0%" : "100%"})`,
              backgroundColor: theme.colorCode || "#FBB14B",
            }}
            className="absolute top-1 bottom-1 left-1 rounded-xl transition-transform duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] shadow-md shadow-orange-950/10 shrink-0"
          />

          {/* SmartList tab button */}
          <button
            onClick={() => handleSelectTab("lowest")}
            className="relative w-1/2 h-full flex flex-col items-center justify-center z-10 transition-colors duration-200"
          >
            <span
              className={`text-[9px] uppercase tracking-widest font-black ${
                activeTab === "lowest" ? "text-white opacity-90" : "text-slate-400 font-medium"
              }`}
            >
              SmartList
            </span>
            <span
              className={`text-sm md:text-base font-extrabold mt-0.5 tracking-tight ${
                activeTab === "lowest" ? "text-white" : "text-slate-700"
              }`}
            >
              £{parseFloat(lowestTotal).toFixed(2)}
            </span>
          </button>

          {/* Alternative Stores tab button */}
          <button
            onClick={() => handleSelectTab("highest")}
            className="relative w-1/2 h-full flex flex-col items-center justify-center z-10 transition-colors duration-200"
          >
            <span
              className={`text-[9px] uppercase tracking-widest font-black ${
                activeTab === "highest" ? "text-white opacity-90" : "text-slate-400 font-medium"
              }`}
            >
              Other Stores
            </span>
            <span
              className={`text-sm md:text-base font-extrabold mt-0.5 tracking-tight ${
                activeTab === "highest" ? "text-white" : "text-slate-700"
              }`}
            >
              £{parseFloat(highestTotal).toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceComparisonFooter;
