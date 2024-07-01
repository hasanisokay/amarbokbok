"use server"
import { hostname } from "@/constants/hostname.mjs";

const getBlogs = async (category, page) => {
  const host = await hostname();
  const res = await fetch(`${host}/api/get-blogs?category=${category}&&page=${page || 1}`);
  const data = await res.json();
  return data;
};

export default getBlogs;
