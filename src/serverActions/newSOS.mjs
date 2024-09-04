"use server";

import dbConnect from "@/services/dbConnect.mjs";

const newSOS = async (formData) => {
  try {
    const expiryDate = formData.get("expiredOn")
    const rawFormData = {
      message: formData.get("message"),
      expiredOn: new Date(expiryDate),
    };
    console.log(rawFormData)
    const db = await dbConnect();
    const messageCollection = await db.collection("messages");
    const result = await messageCollection.insertOne(rawFormData);
    if (result.insertedId) {
      return {};
    } else {
      return { error: "Something went wrong" };
    }
  } catch {
    return { error: "Something went wrong" };
  }
};

export default newSOS;
