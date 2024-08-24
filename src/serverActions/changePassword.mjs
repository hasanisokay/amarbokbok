"use server"

import dbConnect from "@/services/dbConnect.mjs";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const changePassword = async (formData) => {
  try {
    const rawFormData = {
      newPassword: formData.get("newPassword"),
      oldPassword: formData.get("oldPassword"),
      email: formData.get("email"),
    };
    const db = await dbConnect();
    const usersCollection = await db.collection("users");
    const user = await usersCollection.findOne({ email: rawFormData?.email });
    const passwordsMatch = await bcrypt.compare(
      rawFormData?.oldPassword,
      user?.password
    );
    if (!passwordsMatch) return { error: "Wrong Old Password" };
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const newHashedPassword = await bcrypt.hash(rawFormData?.newPassword, salt);
    const result = await usersCollection.updateOne(
      { email: rawFormData?.email },
      { $set: { password: newHashedPassword } }
    );
    if (result.modifiedCount > 0) {}
    else return { error: "Error changing pass. try again." };
  } catch {
    return { error: "Something went wrong" };
  }
  redirect("/admin");
};

export default changePassword;
