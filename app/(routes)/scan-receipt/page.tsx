"use client";
import React, { useState, useRef } from "react";
import Button from "@/app/components/Button";
import Header from "@/app/components/Header";
import receiptGif from "@/public/gif/smartlist.gif";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";
import { classNames } from "@/app/utils/appearance";
import { useTheme } from "@/app/context/ThemeContext";
import { useToastMessage } from "@/app/context/ToastMessageContext";
import { compressImage } from "@/app/utils/compressImage";
import {
  LuScissors,
  LuStore,
  LuUpload,
  LuCamera,
  LuRefreshCw,
  LuImage,
  LuSparkles,
} from "react-icons/lu";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const stepsWithIcons = [
  {
    title: "Fold Receipt",
    desc: "Fold the receipt before the balance/total lines to isolate purchases.",
    icon: LuScissors,
  },
  {
    title: "Store Branding",
    desc: "Ensure the supermarket name and date are clearly visible at the top.",
    icon: LuStore,
  },
  {
    title: "Select File",
    desc: "Tap the dragzone or click the button to select an image.",
    icon: LuUpload,
  },
  {
    title: "Photo or Library",
    desc: "Take a photo of your receipt or upload one from your device library.",
    icon: LuCamera,
  },
  {
    title: "OCR Extraction",
    desc: "Wait a few seconds for the pipeline to parse items and compare prices.",
    icon: LuRefreshCw,
  },
];

const mockReceipts = [
  {
    id: "tesco",
    name: "Tesco",
    desc: "Cookies & Wine list (£24.50)",
    color: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-600",
    badge: "bg-blue-500 text-white",
  },
  {
    id: "aldi",
    name: "Aldi Saver",
    desc: "Veggie & Milk list (£18.20)",
    color:
      "from-amber-500/20 to-orange-600/20 border-orange-500/30 text-orange-600",
    badge: "bg-orange-500 text-white",
  },
  {
    id: "sainsburys",
    name: "Sainsbury's",
    desc: "Local Grocery list (£21.90)",
    color: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-600",
    badge: "bg-red-500 text-white",
  },
];

export default function ReceiptUpload() {
  const { theme } = useTheme();
  const { setToastContent } = useToastMessage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      await handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress("Optimising image…");
      setToastContent({
        active: true,
        color: "success",
        message: "Optimising image…",
      });

      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("file", compressed, "receipt.jpg");

      setUploadProgress("Processing your upload…");
      setToastContent({
        active: true,
        color: "success",
        message: "We are processing your upload!",
      });

      const response = await fetch(`${BASE_URL}/api/parse-receipt`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadProgress("Scanning completed!");
        setToastContent({
          active: true,
          color: "success",
          message: "Receipt uploaded successfully!",
        });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || response.statusText;
        setUploadProgress("Scanning failed");
        setToastContent({
          active: true,
          color: "error",
          message: errorMessage,
        });
        console.error("Error uploading receipt:", errorMessage);
      }
    } catch (error) {
      setUploadProgress("Scanning failed");
      console.error("Error uploading receipt:", error);
      setToastContent({
        active: true,
        color: "error",
        message: "An error occurred during upload, please try again!",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      await handleFileUpload(file);
    }
  };

  const handleSimulateScan = async (presetId: string) => {
    if (isUploading) return;
    setIsUploading(true);
    setSelectedImage(receiptGif.src);

    const progressSteps = [
      "Optimising image…",
      "Extracting OCR receipt details…",
      "Matching products to store data…",
      "Ingestion completed!",
    ];

    for (let i = 0; i < progressSteps.length; i++) {
      setUploadProgress(progressSteps[i]);
      setToastContent({
        active: true,
        color: "success",
        message: progressSteps[i],
      });
      await new Promise((resolve) => setTimeout(resolve, 900));
    }

    setToastContent({
      active: true,
      color: "success",
      message: `Simulated ${presetId} receipt matched successfully!`,
    });

    setIsUploading(false);
  };

  return (
    <div
      className={classNames(
        "relative flex flex-col min-h-screen md:h-screen md:overflow-hidden pb-16 md:pb-0 transition-all duration-300 ease-in-out",
        theme.secondary,
      )}
    >
      <Header />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes laser-scan {
          0%, 100% { top: 0%; opacity: 0.7; }
          50% { top: 96%; opacity: 1; }
        }
        .animate-laser-scan {
          animation: laser-scan 2.2s linear infinite;
        }
      `,
        }}
      />

      <Container
        classes={{
          container:
            "w-full pt-28 pb-12 md:pt-24 md:pb-6 md:flex-grow md:flex md:flex-col md:overflow-hidden md:max-w-7xl md:px-8",
        }}
      >
        <div className="md:flex-grow md:overflow-y-auto md:pr-1 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
            {/* Left Column: Timeline Steps (span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full">
              <div className="bg-white/90 backdrop-blur-lg border border-slate-200/60 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-6 transition-all duration-300">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                    <span>Receipt Upload Guide</span>
                    <LuSparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                  </h2>
                  <p className="text-xs md:text-sm font-semibold text-slate-500">
                    Follow these guidelines to guarantee high OCR accuracy and
                    find the best deals instantly.
                  </p>
                </div>

                {/* Timeline steps list */}
                <div className="relative flex flex-col gap-6 pl-4 border-l-2 border-slate-100">
                  {stepsWithIcons.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={index}
                        className="relative flex gap-4 group transition-all duration-300"
                      >
                        {/* Timeline circle badge */}
                        <div
                          className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md text-[10px] font-black text-white transition-transform duration-300 group-hover:scale-115"
                          style={{ backgroundColor: theme.colorCode }}
                        >
                          {index + 1}
                        </div>

                        {/* Step Card */}
                        <div className="bg-slate-50/60 border border-slate-100 hover:border-slate-200/80 hover:bg-slate-50/90 rounded-2xl p-4 flex gap-4 w-full transition-all duration-300 hover:scale-[1.01] hover:shadow-sm">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                            style={{
                              backgroundColor: `${theme.colorCode}15`,
                              color: theme.colorCode,
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
                              {step.title}
                            </h3>
                            <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-1">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Upload Scanner Arena (span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full">
              {/* Scanner Card Arena */}
              <div className="bg-white/90 backdrop-blur-lg border border-slate-200/60 shadow-xl rounded-3xl p-6 flex flex-col gap-5 transition-all duration-300">
                <h3 className="text-lg font-black text-slate-800 tracking-tight">
                  Scanner Arena
                </h3>

                {/* Upload dragzone */}
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleGallery}
                  className={classNames(
                    "relative flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed rounded-2xl p-6 transition-all duration-300 cursor-pointer select-none",
                    dragActive
                      ? "border-emerald-500 bg-emerald-50/10"
                      : "border-slate-200 hover:border-slate-400 hover:bg-slate-50/50",
                  )}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/jpeg,image/png,image/heic,image/heif,.HEIC,.HEIF"
                  />

                  {selectedImage ? (
                    <div className="relative w-full flex flex-col items-center gap-4">
                      {/* Image Preview Container */}
                      <div className="relative w-44 h-72 border border-slate-200 rounded-xl overflow-hidden shadow-inner bg-slate-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedImage}
                          alt="Receipt Preview"
                          className="w-full h-full object-contain"
                        />

                        {/* Sweeping Laser Scan Line */}
                        {isUploading && (
                          <div
                            style={{
                              background: `linear-gradient(to right, transparent, ${theme.colorCode || "#10b981"}, transparent)`,
                              boxShadow: `0 0 10px ${theme.colorCode || "#10b981"}`,
                            }}
                            className="absolute left-0 w-full h-[3px] animate-laser-scan z-10"
                          />
                        )}

                        {/* OCR Loading Overlay */}
                        {isUploading && (
                          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-4 text-center z-20 transition-all duration-300">
                            <LuRefreshCw className="w-8 h-8 text-white animate-spin" />
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                                Scanning...
                              </span>
                              <p className="text-xs font-bold text-white leading-tight mt-0.5 truncate max-w-[130px]">
                                {uploadProgress}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info & Reset Actions */}
                      <div className="flex flex-col items-center gap-1.5 w-full text-center">
                        <p className="text-xs font-bold text-slate-700">
                          {isUploading
                            ? "OCR parser is active..."
                            : "Preview loaded successfully!"}
                        </p>
                        {!isUploading && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(null);
                              setUploadProgress("");
                            }}
                            className="text-[10px] font-extrabold uppercase text-rose-500 hover:text-rose-600 transition-colors p-1.5 mt-1 underline underline-offset-4"
                          >
                            Clear & Upload Another
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Empty Dropzone Placeholder */
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner animate-pulse"
                        style={{
                          backgroundColor: `${theme.colorCode}10`,
                          color: theme.colorCode,
                        }}
                      >
                        <LuUpload className="w-8 h-8" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-extrabold text-slate-800">
                          Drag & drop receipt here
                        </p>
                        <p className="text-xs font-semibold text-slate-400">
                          or click to browse from device gallery
                        </p>
                      </div>
                      <div className="bg-slate-100/80 text-[10px] font-extrabold text-slate-400 px-3 py-1 rounded-full uppercase tracking-wider mt-2">
                        JPEG, PNG, HEIC
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Button Fallback */}
                {!selectedImage && (
                  <Button
                    classes={{
                      button:
                        "w-full rounded-2xl flex items-center justify-center gap-2 text-white h-12 shadow-md hover:shadow-lg transition-all",
                    }}
                    onClick={handleGallery}
                  >
                    <LuImage className="w-4 h-4" />
                    <span>Upload Receipt</span>
                  </Button>
                )}
              </div>

              {/* Simulated Instant Presets Gallery */}
              {process.env.NODE_ENV !== "production" && (
                <div className="bg-white/90 backdrop-blur-lg border border-slate-200/60 shadow-xl rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-extrabold text-slate-800 tracking-tight flex items-center gap-1.5">
                      <span>Try with Sample Templates</span>
                      <span className="text-[10px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded-full scale-90">
                        Mock
                      </span>
                    </h4>
                    <p className="text-[10px] font-semibold text-slate-400">
                      No physical receipt nearby? Click a preset card below to
                      test the active laser scan and matched savings visualizer
                      instantly.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {mockReceipts.map((mock) => (
                      <button
                        key={mock.id}
                        disabled={isUploading}
                        onClick={() => handleSimulateScan(mock.name)}
                        className={classNames(
                          "flex items-center justify-between border rounded-2xl p-3.5 text-left transition-all duration-300 bg-gradient-to-r hover:scale-[1.02] hover:shadow-sm w-full select-none outline-none focus:ring-1 focus:ring-slate-300",
                          mock.color,
                          isUploading
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer",
                        )}
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-black tracking-tight">
                            {mock.name}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 mt-0.5 truncate max-w-[200px]">
                            {mock.desc}
                          </span>
                        </div>
                        <span
                          className={classNames(
                            "text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider shrink-0",
                            mock.badge,
                          )}
                        >
                          Test Scan
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Navbar />
    </div>
  );
}
