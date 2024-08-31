import {
  COOKIE_NAME,
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
let token = req.cookies.get(COOKIE_NAME);
if(token){
  return NextResponse.json({status:200, message:"User is admin. No changes made."})
}
console.log(token)
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const othersCollection = await db.collection("others");
    const result = await othersCollection.updateOne(
      { type: "userCount" },
      { $inc: { totalCount: 1 } }
    );
    if (result?.modifiedCount > 0 || result?.upsertedId) {
      return NextResponse.json({ status: 200, message: "Success" });
    } else
      return NextResponse.json({ status: 400, message: "No changes made." });
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
