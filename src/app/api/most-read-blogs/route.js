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
    // todos remove the readcount
    const mostReads = await blogCollection
      .find({}, { projection: { readCount: 1, title: 1, blog_id: 1 } })
      .sort({ readCount: -1 })
      .limit(5)
      .toArray();
    return NextResponse.json({mostReads,status:200});
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
