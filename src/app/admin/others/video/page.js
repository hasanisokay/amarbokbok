"use client";

import newOthers from "@/serverActions/newOthers.mjs";
import toast from "react-hot-toast";

const videoPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const videoUrl = formData.get("videoUrl");
    const title = formData.get("title");
    const description = formData.get("description");
    const data = { videoUrl, title, description, date: new Date(), type: "video" };
    const res = await newOthers(data);
    if (res?.error) return toast.error(res?.error || res?.message || "Error");
    else {
      toast.success("Added.");
    event.target.reset()
    }

  };
  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-[#b6d7a0] my-10 px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Submit Video
        </h2>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Please provide video details below.
        </p>
      </div>
      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2 text-sm text-black dark:text-zinc-400">
          <label className="block font-medium" htmlFor="videoUrl">
            Video URL
          </label>
          <input
            className="h-10 w-full rounded border bg-white px-3 py-2 text-sm leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="videoUrl"
            name="videoUrl"
            type="url"
            placeholder="Enter video URL"
            required
          />
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

export default videoPage;
