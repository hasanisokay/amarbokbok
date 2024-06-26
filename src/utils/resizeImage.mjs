const resizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width));
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height));
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      // canvas.toBlob(resolve, file.type, 1);
      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], 'bonjui_blogs', { type: file.type });
        resolve(resizedFile);
      }, file.type || 'image/png', 1);
    };

    img.src = URL.createObjectURL(file);
  });
};

export default resizeImage;
