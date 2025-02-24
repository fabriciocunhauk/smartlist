"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import Image from "next/image";
import Header from "@/app/components/Header";
import receiptGif from "@/public/gif/smartlist.gif";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";
import Toast from "@/app/components/Toast";
import { useTheme } from "@/app/components/ThemeProvider";
import { classNames } from "@/app/utils/appearance";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ReceiptUpload() {
  const { theme } = useTheme();
  const [toastAlertSettings, setToastAlertSettings] = useState({
    active: false,
    color: "",
    message: "",
  });

  const handleGallery = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpeg, .jpg, .png, .HEIC";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const dataURL = e.target?.result as string;

          const blob = dataURLtoBlob(dataURL);
          const formData = new FormData();
          formData.append("file", blob, "receipt.jpeg");

          try {
            setToastAlertSettings({
              active: true,
              color: "success",
              message: "Receipt uploaded successfully!",
            });

            const response = await fetch(`${BASE_URL}/api/parse-receipt`, {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
            } else {
              const errorData = await response.json();
              console.error("Error uploading receipt:", errorData);
              console.log(
                `Error uploading receipt: ${
                  errorData.error || response.statusText
                }`
              );
            }
          } catch (error) {
            console.error("Error uploading receipt:", error);
            setToastAlertSettings({
              active: true,
              color: "error",
              message: "An error occurred during upload, please try again!",
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const dataURLtoBlob = (dataURL: string) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  return (
    <>
      <Toast
        setToastAlertSettings={setToastAlertSettings}
        toastAlertSettings={toastAlertSettings}
      />
      <div
        className={classNames(
          "relative flex flex-col items-center gap-10 h-full",
          theme.secondary
        )}
      >
        <Header />

        <Container
          classes={{
            container: "flex flex-col items-center gap-4 text-4xl pt-28 pb-40",
          }}
        >
          <h2 className="font-bold">Scan your Receipt</h2>

          <ul className="text-sm space-y-6 pl-5 font-semibold">
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center outline rounded-full w-6 h-6">
                1
              </span>
              <p>Fold the receipt before the balance.</p>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center outline rounded-full w-6 h-6">
                2
              </span>
              <p>Make sure it displays the supermarket name.</p>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center outline rounded-full w-6 h-6">
                3
              </span>
              <p>Tap the &quot;Upload Receipt&quot; button.</p>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center outline rounded-full w-6 h-6">
                4
              </span>
              <p>Select the receipt from your gallery or take a photo.</p>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex items-center justify-center outline rounded-full w-6 h-6">
                5
              </span>
              <p>Wait for the upload to complete.</p>
            </li>
          </ul>

          <Image
            src={receiptGif}
            className="w-52 h-96 md:h-full object-cover rounded"
            alt="Loading Gif"
          />
        </Container>

        <Button
          classes={{
            button:
              "fixed bottom-0 mb-28 rounded-full flex items-center justify-center gap-4 text-white min-w-40",
          }}
          onClick={handleGallery}
        >
          Upload Receipt
        </Button>
        <Navbar />
      </div>
    </>
  );
}
