'use server'
import { hostname } from "@/constants/hostname.mjs";

const getBlog = async (id) => {
  const host = await hostname()
  // todo: change to http
  const res = await fetch(`${host}/api/get-single-blog?blog_id=${id}`);
  const post = await res.json();
  return post;
};

export default getBlog;
