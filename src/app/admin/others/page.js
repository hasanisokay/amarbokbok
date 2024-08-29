"use client"
import AudioList from "@/components/AudioList";
import newOthers from "@/serverActions/newOthers.mjs";
import getOthers from "@/utils/getOthers.mjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ searchParams }) => {
  const sort = searchParams?.sort || "newest";
  const page = parseInt(searchParams?.page) || 1;
  const limit = searchParams.limit || 10000;
  const keyword = searchParams.keyword || "";

  const [seePreviousAudios, setSeePreviousAudios] = useState(false);
  const [audioLinks, setAudioLinks] = useState([{ name: "", link: "" }]);
  const [description, setDescription] = useState("");
  const [previousAudios, setPreviousAudios] = useState([]);

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
      type: "audio",
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

  useEffect(() => {
    if (!seePreviousAudios) return;
    (async () => {
      const res = await getOthers("audio", page, limit, sort, keyword);
      setPreviousAudios(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seePreviousAudios]);

  console.log(previousAudios);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 container1 form1 greenbg"
      >
        <div className="space-y-2 text-sm">
          <label
            className="text-sm font-medium leading-none text-black dark:text-zinc-300"
            htmlFor="audio_title"
          >
            Audio Title
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
              Audio Link {index + 1}
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
      <div className="text-center mb-6">
        {!seePreviousAudios && (
          <button
            className=" rounded-btn-active rounded-btn"
            onClick={() => setSeePreviousAudios(true)}
          >
            See Previous Audios
          </button>
        )}
        {previousAudios.others?.length > 0 && (
          <AudioList audios={previousAudios?.others} />
        )}
      </div>
    </>
  );
};

export default Page;
