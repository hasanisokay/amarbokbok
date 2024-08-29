import { dbErrorResponse, serverErrorResponse } from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page"));
    const type = searchParams.get("type");
    
    const keyword = searchParams.get("keyword");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const sort = searchParams.get("sort");
    const sortOrder = sort === "newest" ? -1 : 1;
    let matchStage = {type:type};

    if (keyword) {
      matchStage.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const othersCollection = db.collection("others");
    let totalCount;

    const result = await othersCollection
      .find(matchStage)
      .sort({ date: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray();

    totalCount = await othersCollection.countDocuments(matchStage);

    return NextResponse.json({ others: result, totalCount });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(serverErrorResponse);
  }
};
