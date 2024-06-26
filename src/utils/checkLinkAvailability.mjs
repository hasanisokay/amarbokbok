"use server"

import dbConnect from "@/services/dbConnect.mjs";

const checkLinkAvailability = async (link) => {
  const db = await dbConnect();
  if (!db) return false;
  const blogCollection = await db.collection("blogs");
  const blog = await blogCollection.findOne({ blog_id: link}, {projection: {_id: 1}});
  if(blog?._id) return false;
  return true;
};

export default checkLinkAvailability;
