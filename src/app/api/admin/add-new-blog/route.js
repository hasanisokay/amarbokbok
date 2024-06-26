import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  try {
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
