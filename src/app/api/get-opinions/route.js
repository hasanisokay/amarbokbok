import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page"));
    const pendingOnly = searchParams.get("pending") === "true";
    const approvedOnly = searchParams.get("approved") === "true";
    const keyword = searchParams.get("keyword");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const sort = searchParams.get("sort");
    const sortOrder = sort === "newest" ? -1 : 1;
    let matchStage = {};
    if (approvedOnly) matchStage.status = "approved";
    if (pendingOnly) matchStage.status = "pending";
    if (keyword) {
      matchStage.$or = [
        { message: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        {
          replies: {
            $elemMatch: { reply: { $regex: keyword, $options: "i" } },
          },
        },
      ];
    }

    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const opinionsCollection = db.collection("opinions");
    let totalCount;
    const result = await opinionsCollection
      .find(matchStage)
      .sort({ submittedOn: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray();
    totalCount = await opinionsCollection.countDocuments(matchStage);

    return NextResponse.json({ opinions: result, totalCount });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(serverErrorResponse);
  }
};
