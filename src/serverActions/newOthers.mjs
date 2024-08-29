'use server'

import dbConnect from "@/services/dbConnect.mjs";

const newOthers = async (formData) => {
  try {
    const db = await dbConnect();
    const otherCollections = await db.collection("others");
    const res = await otherCollections.insertOne(formData);
    if (res?.insertedId) {
      return {};
    } else {
      return { error: "Try again." };
    }
  } catch {
    return { error: "Server Error" };
  }
};

export default newOthers;
