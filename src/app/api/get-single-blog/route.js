import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const blogId = searchParams.get("blog_id");
    console.log(blogId)
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const blogCollection = await db.collection("blogs");
    const blog = await blogCollection.findOne({ blog_id: blogId });
    console.log({ blog });
    if (blog) {
      return NextResponse.json({ blog, status: 200 });
    } else {
      return NextResponse.json({ message: "Blog not found.", status: 404 });
    }
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
