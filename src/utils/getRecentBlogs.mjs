"use server"

import { hostname } from "@/constants/hostname.mjs";

const getRecentBlogs = async () => {
  const host = await hostname();
  const res = await fetch(`${host}/api/get-recent-blogs`);
  const data = await res.json();
  if (data?.status === 200) return data?.recentBlogs;
  return [];
};

export default getRecentBlogs;
