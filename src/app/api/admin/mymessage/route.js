import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const messageCollection = await db.collection("message");
    const result = await messageCollection.updateOne({});
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
