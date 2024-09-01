"use client";
import newOthers from "@/serverActions/newOthers.mjs";
import capitalize from "@/utils/capitalize.mjs";
import { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [audioLinks, setAudioLinks] = useState([{ name: "", link: "" }]);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("audio");
  const handleAudioLinkChange = (index, field, value) => {
    const updatedLinks = [...audioLinks];
    updatedLinks[index][field] = value;
    setAudioLinks(updatedLinks);
  };

  const addAudioLink = () => {
    if (audioLinks.length < 10) {
      setAudioLinks([...audioLinks, { name: "", link: "" }]);
    }
  };

  const removeAudioLink = (index) => {
    if (audioLinks.length > 1) {
      const updatedLinks = audioLinks.filter((_, i) => i !== index);
      setAudioLinks(updatedLinks);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const audioDetails = {
      links: audioLinks,
      description: description,
      title: event.target.audio_title.value,
      date: new Date(),
      type: type,
    };
    const res = await newOthers(audioDetails);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Added");
      setDescription("");
      setAudioLinks([{ name: "", link: "" }]);
      event.target.reset();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-lg bg-[#b6d7a0] my-10 px-10 pb-10 pt-8 shadow-md dark:bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Add new Audio of PDF Here
        </h2>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          Please provide details below.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 "
      >
        <div className="space-y-2 text-sm  dark:text-zinc-400">
          <label className="block font-medium" htmlFor="othersType">
            Type
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="othersType"
                value="audio"
                checked={type === "audio"}
                onChange={(e) => setType(e.target.value)}
              />
              <span>Audio</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="othersType"
                value="pdf"
                checked={type === "pdf"}
                onChange={(e) => setType(e.target.value)}
              />
              <span>PDF</span>
            </label>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <label
            className="text-sm font-medium leading-none text-black dark:text-zinc-300"
            htmlFor="audio_title"
          >
            {capitalize(type)} Title
          </label>
          <input
            className="flex h-10 w-full bg-white text-black rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
            placeholder="Title"
            id="audio_title"
            name="audio_title"
            type="text"
          />
        </div>
        {audioLinks.map((audio, index) => (
          <div key={index} className="space-y-2 text-sm">
            <label
              className="text-sm font-medium leading-none text-black dark:text-zinc-300"
              htmlFor={`audio_name_${index}`}
            >
              Name of Link {index + 1}
            </label>
            <input
              className="flex h-10 w-full bg-white rounded-md text-black border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
              placeholder={`Name ${index + 1}`}
              id={`audio_name_${index}`}
              name={`audio_name_${index}`}
              type="text"
              value={audio.name}
              onChange={(e) =>
                handleAudioLinkChange(index, "name", e.target.value)
              }
            />
            <label
              className="text-sm font-medium leading-none text-black dark:text-zinc-300"
              htmlFor={`audio_link_${index}`}
            >
              {capitalize(type)} Link {index + 1}
            </label>
            <input
              className="flex h-10 w-full bg-white text-black rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
              placeholder={`Link ${index + 1}`}
              id={`audio_link_${index}`}
              name={`audio_link_${index}`}
              type="text"
              value={audio.link}
              onChange={(e) =>
                handleAudioLinkChange(index, "link", e.target.value)
              }
            />
            {audioLinks.length > 1 && (
              <button
                type="button"
                onClick={() => removeAudioLink(index)}
                className="text-red-500"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {audioLinks.length < 10 && (
          <button
            type="button"
            onClick={addAudioLink}
            className="text-blue-500"
          >
            Add Another Link
          </button>
        )}
        <div className="space-y-2 text-sm">
          <label
            className="text-sm font-medium leading-none text-black dark:text-zinc-300"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="flex w-full bg-white rounded-md text-black border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
            placeholder="Description"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
