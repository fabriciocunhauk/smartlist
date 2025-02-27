import React from "react";

const PriceComparisonFooter = ({
  lowestTotal,
  highestTotal,
  saveTotal,
  setShowLowestPrice,
  theme,
}: {
  lowestTotal: string;
  highestTotal: string;
  saveTotal: string;
  setShowLowestPrice: (value: boolean) => void;
  theme: any;
}) => (
  <div
    style={{
      backgroundImage: `linear-gradient(to top, ${theme.colorCode} 50%, transparent)`,
    }}
    className="fixed bottom-20 flex justify-between text-xl font-semibold text-center w-full p-4"
  >
    <div
      style={{ borderColor: theme.colorCode }}
      className="flex flex-col items-center border bg-white/80 rounded-xl max-w-max px-4 py-2 text-red-500"
      onClick={() => setShowLowestPrice(false)}
    >
      <span>Other</span>
      <p className="flex gap-2 text-lg font-semibold">
        <span>£</span>
        <span>{highestTotal}</span>
      </p>
    </div>
    <div
      style={{ borderColor: theme.colorCode }}
      className="flex flex-col items-end border bg-white/80 rounded-xl max-w-max px-4 py-2 text-green-500"
      onClick={() => setShowLowestPrice(true)}
    >
      <span>SmartList</span>
      <p className="flex text-lg font-semibold">
        <span>£</span>
        <span>{lowestTotal}</span>
      </p>
      <span className="text-xs">Save £{saveTotal}</span>
    </div>
  </div>
);

export default PriceComparisonFooter;
