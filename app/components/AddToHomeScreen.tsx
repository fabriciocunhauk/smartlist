"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import { MdDownloading } from "react-icons/md";

const AddToHomeScreen: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => setDeferredPrompt(null);

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setDeferredPrompt(null);
    }

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
  };

  if (!deferredPrompt) return null;

  return (
    <Button onClick={handleClick}>
      <MdDownloading className="text-white/60 w-20" size="40" />
    </Button>
  );
};

export default AddToHomeScreen;
