"use server";

import dbConnect from "@/services/dbConnect.mjs";
import getIp from "@/utils/getIP.mjs";

const newOpinion = async (formData) => {
  try {
    const data = formData;
    data.submittedOn = new Date();
    data.status = "pending";
    data.replies = [];
    data.ip= await getIp()
    const db = await dbConnect();
    const opinionCollection = await db.collection("opinions");
    const result = await opinionCollection.insertOne(data);
    if (result.insertedId) {
      return "";
    } else {
      return { error: "Error. Try again later." };
    }
  } catch {
    return { error: "Server error. Try again later." };
  }
};

export default newOpinion;
