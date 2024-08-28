"use server";

import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";

const deleteSOS = async (id) => {
  if (!id) return;
  try {
    const db = await dbConnect();
    const messageCollection = await db.collection("messages");
    const result = await messageCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deleteCount > 0) {
      return {};
    } else {
      return { error: "Could not delete." };
    }
  } catch {
    return { error: "Server Error." };
  }
};
export default deleteSOS;
