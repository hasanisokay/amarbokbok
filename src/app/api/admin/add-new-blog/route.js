import {
  COOKIE_NAME,
  dbErrorResponse,
  serverErrorResponse,
  unauthorizedResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    let token = req?.cookies?.get(COOKIE_NAME);
    if (!token) {
      return NextResponse.json(unauthorizedResponse);
    }

    const body = await req.json();
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const blogCollection = db.collection("blogs");
    const insert = await blogCollection.insertOne(body);

    if(insert.insertedId){
      return NextResponse.json({ status: 200, message: "Added." });
    }
    else{
      return NextResponse.json(serverErrorResponse);
    }
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
