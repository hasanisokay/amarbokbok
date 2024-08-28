'use client'
import logOut from "@/utils/logOut.mjs";
import Link from "next/link";

const page = () => {
  const logout = async () => {
    await logOut();
    window.location.reload();
  };
  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
        <button className="btn-red" onClick={logout}>
          Log Out
        </button>
        <Link href={"/admin/blog-editor"}>
          <button className="font-semibold">Create New Blog</button>
        </Link>
      </div>
    </div>
  );
};

export default page;
