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
    const pendingOnly = searchParams.get("pending");
    const blog_id = searchParams.get("blog_id");
    const keyword = searchParams.get("keyword");
    const approvedOnly = searchParams.get("approved");
    const all = searchParams.get("all");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
// todos: 
// sort the reply in the server from newest to oldest. maybe changing the $push to unshift or something like that will work.
// send approved only replies from server

    const sort = searchParams.get("sort");
    const sortOrder = sort === "newest" ? -1 : 1;

    let matchStage = { blog_id: blog_id };

    if (pendingOnly) {
      matchStage.status =  "pending";
    }
    if (approvedOnly) {
      matchStage.status= "approved";
    }

    if (keyword) {
      matchStage.$or = [
        { comment: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } },
      ];
    }
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const commentCollection = await db.collection("comments");

    const result = await commentCollection.aggregate([
      { $match: matchStage },
      { $sort: { submittedOn: sortOrder } },
      { $skip: skip },
      { $limit: limit },
      {
        $addFields: {
          filteredReplies: {
            $filter: {
              input: "$replies",
              as: "reply",
              cond: { $eq: ["$$reply.status", matchStage.status] }, // Dynamic filtering
            },
          },
        },
      },
      // {
      //   $addFields: {
      //     filteredReplies: { $reverseArray: "$filteredReplies" }, // Sort replies
      //   },
      // },
      {
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
      },
    ]).toArray();

    let totalCount;
    if (result?.length === limit) {
      totalCount = await blogCollection.countDocuments(matchStage);
    } else {
      totalCount = result?.length;
    }
    // console.log(result)
    return NextResponse.json({comments:result, totalCount});
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
