"use server"

import { hostname } from "@/constants/hostname.mjs";

const getMostReadsBlogs = async () => {
  const host = await hostname();
  const res = await fetch(`${host}/api/most-read-blogs`);
  const data = await res.json();
  if(data.status===200) return data?.mostReads;
  return [];
};

export default getMostReadsBlogs;
