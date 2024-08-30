"use server";

import dbConnect from "@/services/dbConnect.mjs";

const increaseTotalUsers = async () => {
  try {
    const db = await dbConnect();
    const othersCollection = await db.collection("others");
    const result = await othersCollection.updateOne(
      { type: "userCount" },
      { $inc: { totalCount: 1 } }
      //   {upsert: true}
    );
    if (result?.modifiedCount > 0 || result?.upsertedId) {
      return {};
    } else return { error: "Error changing pass. try again." };
  } catch {
    return { error: "Something went wrong" };
  }
};

export default increaseTotalUsers;
