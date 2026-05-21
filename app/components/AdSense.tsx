"use client";

import React, { useEffect, useRef } from "react";

interface AdSenseProps {
  adClient?: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSense({
  adClient = "ca-pub-7386584956005563",
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = "true",
  className = "",
  style = { display: "block" },
}: AdSenseProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Avoid running this multiple times in React strict mode or during re-renders
    if (initializedRef.current) return;

    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      initializedRef.current = true;
    } catch (err) {
      console.error("AdSense initialization error:", err);
    }
  }, []);

  const hasMaxWidth = className.includes("max-w-");

  return (
    <div
      className={`w-full overflow-hidden my-4 mx-auto pb-16 md:pb-4 ${
        hasMaxWidth ? "" : "max-w-lg"
      } ${className}`}
    >
      {/* SmartList_Article_Footer_Multiplex */}
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
}
