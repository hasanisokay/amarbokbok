import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  const withCount = searchParams.get("count")
  // check if with count is true. if so then return the count value with the category
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const blogCollection = await db.collection("blogs");
    if(withCount){
      const result = await blogCollection.aggregate([
        { $unwind: "$categories" },
        { $group: { _id: "$categories", count: { $sum: 1 } } },
        { $project: { _id: 0, category: "$_id", count: 1 } }
      ]).toArray();
      return NextResponse.json(result);
    }
    const result = await blogCollection.distinct('categories')
    return NextResponse.json(result);
  } catch(err) {
    console.log(err)
    return NextResponse.json(serverErrorResponse);
  }
};
