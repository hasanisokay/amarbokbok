import { COOKIE_NAME, dbErrorResponse, unauthorizedResponse } from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    let token = req?.cookies?.get(COOKIE_NAME);
    if (!token) {
      return NextResponse.json(unauthorizedResponse);
    }

    const body = await req.json();
    const { blog_id, content, updatedOn, title, categories, _id } = body;
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
 

    const postCollection = await db.collection("blogs");
  
    const result = await postCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { content: content, blog_id: blog_id, addedOn: updatedOn, title:title, categories: categories  } }
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
