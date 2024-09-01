"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import newOthers from "@/serverActions/newOthers.mjs";
import uploadImage from "@/utils/uploadImage.mjs";
import { websiteName } from "@/constants/constants.mjs";

const ImagePage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const imageUrl = formData.get("imageUrl");
    const imageFile = formData.get("imageFile");
    const title = formData.get("title");
    const description = formData.get("description");

    let finalImageUrl = imageUrl;

    // If an image file is uploaded, use the upload function
    if (imageFile && imageFile.size > 0) {
      const loadingToast = toast.loading(`Uploading ${uploadProgress}%`);
      try {
        const uploadedImageUrl = await uploadImage(
          imageFile,
          setUploadProgress
        );
        finalImageUrl = uploadedImageUrl;
      } catch (error) {
        return toast.error("Image upload failed. Please try again.");
      }finally{
        toast.dismiss(loadingToast);
      }
    }

    if (!finalImageUrl) {
      return toast.error("Please provide an image URL or upload an image.");
    }

    const data = {
      imageUrl: finalImageUrl,
      title,
      description,
      date: new Date(),
      type: "image",
    };

    const res = await newOthers(data);
    if (res?.error) return toast.error(res?.error || res?.message || "Error");
    else {
      toast.success("Image added successfully.");
      event.target.reset();
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-[#b6d7a0] my-10 px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Submit Image
        </h2>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Please provide image details below.
        </p>
      </div>
      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2 text-sm text-black dark:text-zinc-400">
          <label className="block font-medium" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className="h-10 w-full rounded border bg-white px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="Enter image URL"
          />
        </div>
        <div className="space-y-2 text-sm text-black dark:text-zinc-400">
          <label className="block font-medium" htmlFor="imageFile">
            or Upload Image
          </label>
          <input
            className="h-10 w-full rounded border bg-white px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/*"
          />
          {(uploadProgress !==100 && uploadProgress!==0) && (
            <p className="text-sm">
              <span>Uploading... </span> <span>{uploadProgress}%</span>
            </p>
          )}
          {
            uploadProgress ===100 && <p className="text-sm">Uploaded</p>
          }
        </div>
        <div className="space-y-2 text-sm text-black dark:text-zinc-400">
          <label className="block font-medium" htmlFor="title">
            Title
          </label>
          <input
            className="h-10 w-full rounded border bg-white px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="space-y-2 text-sm text-black dark:text-zinc-400">
          <label className="block font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            className="min-h-[80px] w-full rounded border bg-white px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="description"
            name="description"
            placeholder="Enter description"
            required
          />
        </div>

        <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ImagePage;

// export async function generateMetadata() {
//   return {
//     title: `Images - ${websiteName}`,
//   }
// }

