"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import { MdDownloading } from "react-icons/md";

const AddToHomeScreen: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Detect iOS devices
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  useEffect(() => {
    // Skip if running in standalone mode or on iOS
    if (isIOS || window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("beforeinstallprompt fired", e);
      e.preventDefault();
      setDeferredPrompt(e); // Store the event for later use
    };

    const handleAppInstalled = () => {
      console.log("App installed");
      setDeferredPrompt(null); // Reset the prompt after installation
    };

    // Add event listeners
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      // Clean up event listeners
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [isIOS]);

  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Trigger the native install prompt
      deferredPrompt.userChoice.then(({ outcome }: { outcome: string }) => {
        console.log(
          `User ${
            outcome === "accepted" ? "accepted" : "dismissed"
          } the A2HS prompt`
        );
        setDeferredPrompt(null); // Reset the prompt after user interaction
      });
    }
  };

  // Render nothing if no deferredPrompt is available or on iOS
  if (isIOS) {
    return (
      <Button onClick={handleClick}>
        <MdDownloading className="text-white/60 w-20" size="40" />
      </Button>
    );
  }

  if (!deferredPrompt) return null;

  return (
    <Button onClick={handleClick}>
      <MdDownloading className="text-white/60 w-20" size="40" />
    </Button>
  );
};

export default AddToHomeScreen;
