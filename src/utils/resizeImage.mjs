import { websiteName } from "@/constants/constants.mjs";

const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate the target dimensions while preserving the aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      // Resize the image in steps for better quality
      let steps = Math.ceil(Math.log2(img.width / width));
      for (let i = 0; i < steps; i++) {
        const intermediateWidth = Math.max(width, Math.round(img.width / (2 ** (steps - i - 1))));
        const intermediateHeight = Math.max(height, Math.round(img.height / (2 ** (steps - i - 1))));

        canvas.width = intermediateWidth;
        canvas.height = intermediateHeight;
        ctx.drawImage(img, 0, 0, intermediateWidth, intermediateHeight);
      }

      // Final resizing to target dimensions
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], `${websiteName}_blogs`, { type: file.type });
        resolve(resizedFile);
      }, file.type || 'image/png', 1);
    };

    img.src = URL.createObjectURL(file);
  });
};

export default resizeImage;
