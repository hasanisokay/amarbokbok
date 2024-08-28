import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { comment_id, reply_id, action, replying } = body;
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const commentCollection = await db.collection("opinions");
    let result;
    if(replying){
      
    }
    if (!reply_id) {
      if (action === "approve") {
        result = await commentCollection.updateOne(
          { _id: new ObjectId(comment_id) },
          { $set: { status: "approved" } }
        );
      } else if (action === "delete") {
        result = await commentCollection.deleteOne({
          _id: new ObjectId(comment_id),
        });
      }
    } else if (reply_id) {
      if (action === "approve") {
        result = await commentCollection.updateOne(
          {
            _id: new ObjectId(comment_id),
            "replies._id": new ObjectId(reply_id),
          },
          { $set: { "replies.$.status": "approved" } }
        );
      } else if (action === "delete") {
        result = await commentCollection.updateOne(
          { _id: new ObjectId(comment_id) },
          { $pull: { replies: { _id: new ObjectId(reply_id) } } }
        );
      }
    }

    if (result.deletedCount > 0) {
      return NextResponse.json({ message: "Deleted", status: 200 });
    } else if (result.modifiedCount > 0) {
      return NextResponse.json({ message: "Approved", status: 200 });
    } else {
      return NextResponse.json({ message: "No changes made", status: 400 });
    }
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
