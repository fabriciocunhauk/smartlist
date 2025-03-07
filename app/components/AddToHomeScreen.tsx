"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import { MdDownloading } from "react-icons/md";

const AddToHomeScreen: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !(window as any).MSStream
      );
    }

    // Check if the app is running in standalone mode
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("beforeinstallprompt fired", e);
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      console.log("App installed");
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(({ outcome }: { outcome: string }) => {
        console.log(
          `User ${
            outcome === "accepted" ? "accepted" : "dismissed"
          } the A2HS prompt`
        );
        setDeferredPrompt(null);
      });
    }

    if (isIOS) {
      alert(
        "To install this app on your iPhone, tap the share button at the top or bottom of the screen, then select 'Add to Home Screen'."
      );
    }
  };

  if (deferredPrompt || isIOS) {
    return (
      <Button onClick={handleClick} classes={{ button: "ml-10" }}>
        <MdDownloading className="text-white/60 w-10" size="30" />
      </Button>
    );
  }

  return null;
};

export default AddToHomeScreen;
