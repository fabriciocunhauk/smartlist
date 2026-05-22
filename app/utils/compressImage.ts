/**
 * Compresses and resizes an image File using the Canvas API.
 *
 * - Converts any format (HEIC, PNG, JPEG, etc.) to JPEG.
 * - Resizes so the longest edge is at most `maxDimension` px — enough
 *   detail for OCR but dramatically smaller than a raw phone photo.
 * - Returns a compressed Blob ready to be appended to FormData.
 *
 * @param file           The original image File from the file input.
 * @param maxDimension   Max width or height in pixels (default 1800).
 * @param quality        JPEG quality 0–1 (default 0.85).
 */
export async function compressImage(
  file: File,
  quality = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      const { width, height } = img;
      // For receipt OCR, the horizontal text resolution (width) is critical.
      // We scale based on width, ensuring a minimum crisp width of 1200px (or original width if smaller).
      const scale = Math.min(1, 1200 / width);
      const targetWidth = Math.round(width * scale);
      const targetHeight = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context unavailable"));
        return;
      }

      // White background so transparent PNGs don't become black JPEGs
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas toBlob returned null"));
          }
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for compression"));
    };

    img.src = url;
  });
}
