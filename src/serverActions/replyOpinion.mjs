"use server";

import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";

const replyOpinion = async (formData) => {
  try {
    const message = formData.get("message");
    const comment_id = formData.get("comment_id");
    const newReply = {
      reply: message,
      submittedOn: new Date(),
      name: "Ahmmad Robin",
    };
    const db = await dbConnect();
    const opinionCollection = await db.collection("opinions");
    const result = await opinionCollection.updateOne(
      { _id: new ObjectId(comment_id) },
      { $push: { replies: newReply } }
    );
    if (result.modifiedCount > 0) {
      return {};
    } else {
      return { error: "Error Updating comment" };
    }
  } catch {
    return { error: "Server Error. " };
  }
};

export default replyOpinion;
