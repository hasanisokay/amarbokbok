import { dbErrorResponse } from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { blog_id, content, updatedOn, title, categories } = body;
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);

    const postCollection = await db.collection("blogs");
    const result = await postCollection.updateOne(
      { blog_id: blog_id },
      { $set: { content: content, updatedOn: updatedOn, title:title, categories: categories  } }
    );
    if (result?.modifiedCount > 0) {
      return NextResponse.json({
        status: 200,
        message: "Updated successfully",
      });
    } else {
      return NextResponse.json({ status: 400, message: "Post Not Found" });
    }
  } catch {
    return NextResponse.json({ status: 404, message: "Error" });
  }
};
