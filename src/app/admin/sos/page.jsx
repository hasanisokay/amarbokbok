'use client'
import deleteSOS from "@/constants/deleteSOS.mjs";
import newSOS from "@/serverActions/newSOS.mjs";
import getSOS from "@/utils/getSOS.mjs";

import getStatusByDate from "@/utils/getStatusByDate.mjs";
import getTimeWithHours from "@/utils/getTimeWithHours.mjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [previousSOS, setPreviousSOS] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getSOS();
      if (res) setPreviousSOS(res);
    })()
  }, [])
  const deleteOne = async (id) => {
    const res = deleteSOS(id);
    if (res.error) {
      return toast.error(res?.error)
    } else {
      toast.success("Delted");
      window.location.reload();
    }
  }
  return (
    <div>
      <div className="md:w-[70%] w-[95%] mt-10 mx-auto">
        {previousSOS?.length > 0 && <h4 className="text-center">Previous SOS</h4>}
        {
          previousSOS?.map((m) => <div className="my-2 py-2" key={m?._id}>
            <p><span>Message: </span> <span>{m?.message}</span> </p>
            <p><span>Status: </span> {getStatusByDate(m?.expiredOn)} </p>
            <p><span>Expired On: </span> <span className="font-semibold">{getTimeWithHours(m?.expiredOn)}</span> </p>
            <button onClick={() => deleteOne(m?._id)} className="btn-red">Delete</button>
          </div>)
        }
      </div>
      <h4 className="text-center mt-10">New SOS</h4>
      <form
        className="md:w-[70%] w-full mx-auto"
        action={async (formData) => {
          const result = await newSOS(formData);
          if (result?.error) toast.error(result?.error);
          else {
            toast.success("Success")
            window.location.reload();
          };
        }}
      >
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
          <label className="block font-medium" htmlFor="_message">
            Message
          </label>
          <textarea
            required
            className="bg-white text-black min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 dark:border-zinc-700"
            id="_message"
            placeholder="Type your message here"
            name="message"
          />
        </div>
        <div>
          <label htmlFor="expiredOn" className="block font-medium">
            {" "}
            Expired On:{" "}
          </label>
          <input
            type="datetime-local"
            id="expiredOn"
            name="expiredOn"
            className="bg-white text-black border"
            required
          />
        </div>
        <button type="submit" className="btn-submit mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
