import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const blogCollection = await db.collection("blogs");
    const recentBlogs = await blogCollection
      .find({}, { projection: { title: 1, blog_id: 1, readCount: 1, addedOn:1 } })
      .sort({ addedOn: -1 })
      .limit(5)
      .toArray();
    return NextResponse.json({ recentBlogs, status: 200 });
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
