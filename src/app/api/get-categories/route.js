import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const blogCollection = await db.collection("blogs");
    const result = await blogCollection.distinct('categories')
    return NextResponse.json(result);
  } catch(err) {
    console.log(err)
    return NextResponse.json(serverErrorResponse);
  }
};
