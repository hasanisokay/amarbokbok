import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page"));
    const pendingOnly = searchParams.get("pending") === "true";
    const approvedOnly = searchParams.get("approved") === "true";
    const blog_id = searchParams.get("blog_id");
    const keyword = searchParams.get("keyword");
    const all = searchParams.get("all") === "true";
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const sort = searchParams.get("sort");
    const sortOrder = sort === "newest" ? -1 : 1;

    let matchStage = {};
    if (blog_id) matchStage.blog_id = blog_id;
    if(approvedOnly) matchStage.status = "approved";
    if (keyword) {
      matchStage.$or = [
        { comment: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } },
        { blog_id: { $regex: keyword, $options: "i" } },
        { replies: { $elemMatch: { reply: { $regex: keyword, $options: "i" } } } }
      ];
    }

    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const commentCollection = db.collection("comments");

    const pipeline = [
      { $match: matchStage },
      { $sort: { submittedOn: sortOrder } },
      { $skip: skip },
      { $limit: limit },
    ];

    if (!all) {
      pipeline.push({
        $addFields: {
          filteredReplies: {
            $filter: {
              input: "$replies",
              as: "reply",
              cond: {
                $eq: ["$$reply.status", pendingOnly ? "pending" : "approved"],
              },
            },
          },
        },
      });
      pipeline.push({
        $match: {
          $or: [
            { status: pendingOnly ? "pending" : "approved" },
            { $and: [{ status: "approved" }, { "filteredReplies.0": { $exists: true } }] },
          ],
        },
      });
      pipeline.push({
        $project: {
          _id: 1,
          ip: 1,
          status: 1,
          replies: "$filteredReplies",
          submittedOn: 1,
          name: 1,
          comment: 1,
          blog_id: 1,
        },
      });
    } else {
      pipeline.push({
        $project: {
          _id: 1,
          ip: 1,
          status: 1,
          replies: 1,
          submittedOn: 1,
          name: 1,
          comment: 1,
          blog_id: 1,
        },
      });
    }
    let totalCount;
    const result = await commentCollection.aggregate(pipeline).toArray();
    if(result.length ===limit ){
      totalCount = await commentCollection.countDocuments(matchStage);
    }else{
      totalCount = result?.length;
    }
    return NextResponse.json({ comments: result, totalCount });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(serverErrorResponse);
  }
};
