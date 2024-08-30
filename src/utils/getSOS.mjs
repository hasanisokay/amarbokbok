"use server";

import dbConnect from "@/services/dbConnect.mjs";

const getSOS = async (status) => {
  try {
    let matchStage = {};
    if (status === "active") {
      matchStage.expiredOn = { $gt: new Date() };
    }

    const db = await dbConnect();
    const messageCollection = await db.collection("messages");
    const result = await messageCollection.find(matchStage).toArray();
    
    if (result?.length > 0) return result;
    else return null;
  } catch {
    return "";
  }
};

export default getSOS;
