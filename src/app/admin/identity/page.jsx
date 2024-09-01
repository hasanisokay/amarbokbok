'use client'
import { websiteName } from "@/constants/constants.mjs";
import AuthContext from "@/contexts/AuthContext.mjs";
import changePassword from "@/serverActions/changePassword.mjs";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Page() {

  const { currentUser } = useContext(AuthContext);

  return (
    <form
      action={async (formData) => {
        const result = await changePassword(formData);
        if (result?.error) toast.error(result?.error)
        else toast.success("Success");
      }}
      className="dark:bg-slate-800 bg-slate-400 rounded mt-4 p-4 mx-auto w-[90%] md:w-[80%] lg:w-[50%]"
    >
      <div className="space-y-2 text-sm hidden">
        <label
          htmlFor="email"
          className="block text-white dark:text-zinc-300 font-medium"
        >
          Email
        </label>
        <input
          className="flex h-10 w-full text-white rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
          id="email"
          name="email"
          type="text"
          value={currentUser?.email || ""}
          readOnly
        />
      </div>
      <div className="space-y-2 text-sm mt-2">
        <label
          htmlFor="oldPassword"
          className="block text-white dark:text-zinc-300 font-medium"
        >
          Previous Password
        </label>
        <input
          className="flex h-10 w-full text-white rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
          id="oldPassword"
          placeholder="Enter old password"
          name="oldPassword"
          type="text"
          required
        />
      </div>
      <div className="space-y-2 text-sm mt-2">
        <label
          htmlFor="newPassword"
          className="block text-white dark:text-zinc-300 font-medium"
        >
          New Password
        </label>
        <input
          className="flex h-10 w-full text-white rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700"
          id="newPassword"
          placeholder="Enter new password"
          name="newPassword"
          type="newPassword"
          required
        />
      </div>
      <button className="rounded-md mt-4 btn-green px-4 py-2 text-white transition-colors">
        Submit
      </button>
    </form>
  );
}
