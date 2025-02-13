"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";
import { redirect } from "next/navigation";
import Header from "@/app/components/Header";
import receiptGif from "@/public/gif/smart-list-gif.gif";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ReceiptUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleGallery = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpeg, .jpg, .png";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const dataURL = e.target?.result as string;
          setImage(dataURL);

          const blob = dataURLtoBlob(dataURL);
          const formData = new FormData();
          formData.append("file", blob, "receipt.jpeg");

          try {
            const response = await fetch(`${BASE_URL}/api/parse-receipt`, {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              console.log("Receipt uploaded and processed successfully!");
              setImage(null);
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
            alert("An error occurred during upload.");
          } finally {
            redirect("/compare-prices");
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
    <div className="relative flex flex-col items-center justify-center gap-10">
      <Header />

      <Container
        classes={{
          container: "flex flex-col items-center gap-4 text-4xl py-28",
        }}
      >
        <h2 className="font-bold">Scan your Receipt</h2>
        <Image
          src={receiptGif}
          className="w-52 md:w-full h-96 md:h-full object-cover rounded"
          alt="Loading Gif"
        />
        <ul className="text-sm space-y-4">
          <li>1: Fold the receipt before the balance.</li>
          <li>2: make sure it displays the supermarket name.</li>
          <li>3: Tap the &quot;Upload Receipt&quot; button.</li>
          <li>4: Select the receipt from your gallery or take a photo.</li>
          <li>5: Wait for the upload to complete.</li>
        </ul>
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

      {image && (
        <>
          <Spinner />
          <Image
            src={image}
            className="absolute top-0 right-0 bottom-0 left-0 flex-shrink-0 w-screen h-screen z-10"
            alt="Receipt Preview"
            width={400}
            height={500}
          />
        </>
      )}
      <Navbar />
    </div>
  );
}
