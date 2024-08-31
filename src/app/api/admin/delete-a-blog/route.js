import {
  COOKIE_NAME,
  serverErrorResponse,
  unauthorizedResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {

  try {
    let token = req?.cookies?.get(COOKIE_NAME);
    if (!token) {
      return NextResponse.json(unauthorizedResponse);
    }
    const body = await req.json();
    const { blog_id, admin } = body;
    if (!admin) return NextResponse.json(unauthorizedResponse);
    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");
    const result = await blogsCollection.deleteOne({ blog_id: blog_id });
    return NextResponse.json({ message: "Deleted", status: 200 });
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
