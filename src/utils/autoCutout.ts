/**
 * Intelligent Image Auto-Cutout Utility for 3D Layer Setup.
 * Uses client-side Neural AI (@imgly/background-removal) with smart canvas fallback.
 */

export async function autoCutImage(
  imageSource: File | Blob | string,
  onProgress?: (percent: number, message: string) => void
): Promise<string> {
  // 1. Try Neural Network AI background removal (@imgly/background-removal)
  try {
    onProgress?.(15, "Initializing AI segmentation engine...");
    // Dynamic import to keep bundle lightweight
    const imgly = await import("@imgly/background-removal");
    const removeBg =
      (imgly as unknown as { removeBackground?: (src: unknown, cfg?: unknown) => Promise<Blob> }).removeBackground ||
      (imgly as unknown as { default?: (src: unknown, cfg?: unknown) => Promise<Blob> }).default;

    if (typeof removeBg === "function") {
      onProgress?.(35, "Scanning subject contours & depth...");
      const blob = await removeBg(imageSource, {
        progress: (key: string, current: number, total: number) => {
          if (total > 0) {
            const pct = Math.min(92, Math.round(35 + (current / total) * 55));
            const msg = key.includes("fetch")
              ? "Fetching AI models..."
              : "Separating foreground subject...";
            onProgress?.(pct, msg);
          }
        },
      });

      onProgress?.(95, "Composing transparent 3D cutout...");
      return await blobToBase64(blob);
    }
  } catch (error) {
    console.warn("AI background removal failed, using edge-aware canvas segmentation fallback:", error);
  }

  // 2. High-precision fallback using smart canvas edge-aware segmentation
  onProgress?.(60, "Applying edge-aware segmentation...");
  return await smartCanvasCutout(imageSource);
}

/**
 * Convert Blob to Base64 Data URL
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Smart Canvas Edge-Aware Cutout (High-reliability local fallback)
 * Identifies background border colors and produces a feathered alpha cutout of the central subject.
 */
export async function smartCanvasCutout(source: File | Blob | string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;

      // Scale to max 1200 for processing performance
      const maxDim = 1200;
      const scale = Math.min(1, maxDim / Math.max(w, h));
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return reject(new Error("Canvas context unavailable"));

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Sample 30 border points along the perimeter to detect dominant background colors
      const samples: [number, number, number][] = [];
      const stepX = Math.max(1, Math.floor(canvas.width / 8));
      const stepY = Math.max(1, Math.floor(canvas.height / 8));

      // Top and bottom borders
      for (let x = 4; x < canvas.width - 4; x += stepX) {
        let i = (4 * canvas.width + x) * 4;
        samples.push([data[i], data[i + 1], data[i + 2]]);
        i = ((canvas.height - 5) * canvas.width + x) * 4;
        samples.push([data[i], data[i + 1], data[i + 2]]);
      }

      // Left and right borders
      for (let y = 4; y < canvas.height - 4; y += stepY) {
        let i = (y * canvas.width + 4) * 4;
        samples.push([data[i], data[i + 1], data[i + 2]]);
        i = (y * canvas.width + (canvas.width - 5)) * 4;
        samples.push([data[i], data[i + 1], data[i + 2]]);
      }

      // Calculate average background color
      const avgBg = samples
        .reduce((acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]], [0, 0, 0])
        .map((sum) => Math.round(sum / (samples.length || 1)));

      // Subject center weights (central region is preserved, border matching bg is cut)
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.52;
      const maxRadius = Math.hypot(canvas.width, canvas.height) * 0.52;

      const tolerance = 48;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Color distance from background
          const colorDist = Math.hypot(r - avgBg[0], g - avgBg[1], b - avgBg[2]);

          // Distance from center
          const distFromCenter = Math.hypot(x - cx, y - cy) / maxRadius;

          if (colorDist < tolerance && distFromCenter > 0.32) {
            // Background area - transparent
            data[i + 3] = 0;
          } else if (colorDist < tolerance * 1.45 && distFromCenter > 0.42) {
            // Feathered soft edge
            const alphaFactor = (colorDist - tolerance) / (tolerance * 0.45);
            data[i + 3] = Math.round(255 * Math.max(0, Math.min(1, alphaFactor)));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => reject(new Error("Failed to load image for cutout"));

    if (typeof source === "string") {
      img.src = source;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(source);
    }
  });
}
