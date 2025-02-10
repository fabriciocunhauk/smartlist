"use client";
import BackButton from "@/app/components/BackButton";
import Button from "@/app/components/Button";
import Header from "@/app/components/Header";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ReceiptUpload() {
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTakePhoto = async () => {
    const video = videoRef.current;

    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL("image/jpeg");
        setImage(dataURL);

        // Convert Data URL to Blob for upload (more efficient)
        const blob = dataURLtoBlob(dataURL);

        const formData = new FormData();
        formData.append("file", blob, "receipt.jpeg");

        try {
          const response = await fetch(`${BASE_URL}/api/parse-receipt` || "", {
            method: "POST",
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();

            console.log("Receipt processed:", data);

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
        }
      } else {
        console.error("Canvas context is null.");
      }
    } else {
      alert("Camera is not ready. Please try again.");
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert(
        "Error accessing camera. Please make sure you have granted permission."
      );
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

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
      <Header>
        <BackButton />
      </Header>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full"
      ></video>

      <Button
        classes={{
          button:
            "absolute bottom-0 mb-10 rounded-full bg-red-500 min-w-11 min-h-10 outline outline-offset-2",
        }}
        onClick={handleTakePhoto}
      ></Button>

      {image && (
        <Image
          src={image}
          className="absolute top-0 right-0 bottom-0 left-0 flex-shrink-0 content-cover w-screen h-screen"
          alt="Receipt Preview"
          width={400}
          height={500}
        />
      )}
    </div>
  );
}
