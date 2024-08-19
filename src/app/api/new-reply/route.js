import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import getIp from "@/utils/getIP.mjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const ip = await getIp();
    const comment_id = body.comment_id;
    const data = {
      ip,
      _id: new ObjectId(),
      status: "pending",
      submittedOn: new Date(),
      ...body,
    };
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const commentCollection = await db.collection("comments");
    await commentCollection.updateOne(
      { _id: new ObjectId(comment_id) },
      {
        $push: {
          replies: data,
        },
      }
    );
    return NextResponse.json({
      status: 200,
      message: "Reply will be visible publicly after review.",
    });
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
