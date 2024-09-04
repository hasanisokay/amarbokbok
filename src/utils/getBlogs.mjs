"use server"
import { hostname } from "@/constants/hostname.mjs";

const getBlogs = async (category, page, limit, sort, keyword="", titleOnly="",blogIdOnly="") => {
  const host = await hostname();

  const res = await fetch(`${host}/api/get-blogs?category=${category}&&page=${page || 1}&&limit=${limit}&&titleOnly=${titleOnly}&&sort=${sort}&&keyword=${keyword}&&blogIdOnly=${blogIdOnly}`);
  const data = await res.json();
  return data;
};

export default getBlogs;
