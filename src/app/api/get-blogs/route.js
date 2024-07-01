import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page"));
    const limit = 10;
    const skip = (page - 1) * limit;
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);

    const query = category ? { categories: { $in: [category] } } : {};
    const blogCollection = await db.collection("blogs");

    const totalCount = await blogCollection.countDocuments(query);
    
    const result = await blogCollection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
    return NextResponse.json({blogs:result, totalCount});
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
