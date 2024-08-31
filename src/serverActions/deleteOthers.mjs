"use server";
import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";

const deleteOthers = async (id) => {
  try {
    const db = await dbConnect();
    const othersCollection = await db.collection("others");
    const res = await othersCollection.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount > 0) {
      return {};
    } else {
      return { error: "Could not delete. Reload please." };
    }
  } catch {
    return { error: "Server Error." };
  }
};

export default deleteOthers;
