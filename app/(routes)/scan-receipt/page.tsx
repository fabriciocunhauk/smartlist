"use client";
import Button from "@/app/components/Button";
import Image from "next/image";
import Header from "@/app/components/Header";
import receiptGif from "@/public/gif/smartlist.gif";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";
import { classNames } from "@/app/utils/appearance";
import { useTheme } from "@/app/context/ThemeContext";
import { useToastMessage } from "@/app/context/ToastMessageContext";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const steps = [
  "Fold the receipt before the balance.",
  "Make sure it displays the supermarket name at the top.",
  'Tap the "Upload Receipt" button.',
  "Select the receipt from your gallery or take a photo.",
  "Wait for the upload to complete.",
];

export default function ReceiptUpload() {
  const { theme } = useTheme();
  const { setToastContent } = useToastMessage();

  const dataURLtoBlob = (dataURL: string): Blob => {
    const [header, base64Data] = dataURL.split(";base64,");
    const contentType = header.split(":")[1];
    const raw = window.atob(base64Data);
    const arrayBuffer = new Uint8Array(raw.length).map((_, i) =>
      raw.charCodeAt(i)
    );
    return new Blob([arrayBuffer], { type: contentType });
  };

  const handleFileUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataURL = reader.result as string;
        const blob = dataURLtoBlob(dataURL);

        const formData = new FormData();
        formData.append("file", blob, "receipt.jpeg");

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
          setToastContent({
            active: true,
            color: "success",
            message: "Receipt uploaded successfully!",
          });
        } else {
          const errorData = await response.json();
          const errorMessage = errorData.error || response.statusText;
          setToastContent({
            active: true,
            color: "error",
            message: errorMessage,
          });
          console.error("Error uploading receipt:", errorMessage);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading receipt:", error);
      setToastContent({
        active: true,
        color: "error",
        message: "An error occurred during upload, please try again!",
      });
    }
  };

  // Function to trigger file input dialog
  const handleGallery = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".jpeg, .jpg, .png, .HEIC";
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    fileInput.click();
  };

  return (
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
          {steps.map((step, index) => (
            <li key={index} className="flex items-center gap-4">
              <span className="flex items-center justify-center outline rounded-full w-6 h-6">
                {index + 1}
              </span>
              <p>{step}</p>
            </li>
          ))}
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
  );
}
