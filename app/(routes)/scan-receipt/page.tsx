"use client";
import BackButton from "@/app/components/BackButton";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ReceiptUpload() {
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleTakePhoto = async () => {
    const video = videoRef.current;

    if (video && video.videoWidth > 0 && video.videoHeight > 0) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Enhance image resolution by scaling up the canvas
        const enhancedCanvas = document.createElement("canvas");
        enhancedCanvas.width = canvas.width * 2; // Scale up by a factor of 2
        enhancedCanvas.height = canvas.height * 2;
        const enhancedContext = enhancedCanvas.getContext("2d");
        if (enhancedContext) {
          enhancedContext.drawImage(
            canvas,
            0,
            0,
            enhancedCanvas.width,
            enhancedCanvas.height
          );
        }

        const dataURL = enhancedCanvas.toDataURL("image/jpeg");
        setImage(dataURL);
        const blob = await fetch(dataURL).then((res) => res.blob());

        const formData = new FormData();
        formData.append("file", blob, "receipt.jpeg");

        try {
          const response = await fetch(`${BASE_URL}/api/parse-receipt` || "", {
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

  const handleGallery = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpeg, .jpg, .png";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataURL = e.target?.result as string;
          setImage(dataURL);

          // Convert Data URL to Blob for upload (more efficient)
          const blob = dataURLtoBlob(dataURL);

          const formData = new FormData();
          formData.append("file", blob, "receipt.jpeg");
          (async () => {
            try {
              const response = await fetch(
                `${BASE_URL}/api/parse-receipt` || "",
                {
                  method: "POST",
                  body: formData,
                }
              );

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
          })();
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  useEffect(() => {
    if (showCamera) {
      startCamera();
    } else {
      if (
        videoRef.current &&
        videoRef.current.srcObject instanceof MediaStream
      ) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [showCamera]);

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
      <BackButton />
      {showCamera && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute top-0 right-0 bottom-0 left-0 flex-shrink-0 object-cover w-screen h-screen z-10"
          ></video>
          <div className="flex items-center gap-10 fixed bottom-0 mb-10 z-10 -ml-20">
            <IoMdCloseCircleOutline
              className="text-4xl text-red-500 outline rounded-full"
              onClick={() => setShowCamera(!showCamera)}
            />
            <Button
              classes={{
                button:
                  "rounded-full min-w-11 min-h-10 outline outline-offset-2 outline-white flex items-center justify-center bg-red-500",
              }}
              onClick={() => handleTakePhoto()}
            />
          </div>
        </>
      )}
      {!showCamera && (
        <div className="fixed bottom-0 mb-10 rounded-full z-10 flex items-center justify-center gap-4 text-white">
          <Button
            classes={{
              button: "min-w-40",
            }}
            onClick={() => setShowCamera(!showCamera)}
          >
            Take Photo
          </Button>

          <Button
            classes={{
              button: "bg-blue-500 hover:bg-blue-500/50 min-w-40",
            }}
            onClick={handleGallery}
          >
            Add from Gallery
          </Button>
        </div>
      )}

      {image && (
        <>
          <Spinner />
          <Image
            src={image}
            className="absolute top-0 right-0 bottom-0 left-0 flex-shrink-0 object-cover w-screen h-screen z-10"
            alt="Receipt Preview"
            width={400}
            height={500}
          />
        </>
      )}
    </div>
  );
}
