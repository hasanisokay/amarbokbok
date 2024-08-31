import axios from 'axios';

const uploadImage = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('image', file);

try{
  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    formData,
    {
      onUploadProgress: (progressEvent) => {
        const percentComplete = parseInt((progressEvent.loaded / progressEvent.total) * 100) ;
        onProgress(percentComplete);
      }
    }
  );
  const imageUrl = response.data.data.url;
  return imageUrl;
}catch{
  onProgress(0)
  return ""}
};

export default uploadImage;