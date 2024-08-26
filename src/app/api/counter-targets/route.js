import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const headersList = headers()
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const commentCollection = await db.collection("comments");
    const blogCollection = await db.collection("blogs");
    const commentAggregation = await commentCollection
      .aggregate([
        {
          $project: {
            totalComments: { $add: [1, { $size: "$replies" }] }, // 1 for the comment itself + number of replies
          },
        },
        {
          $group: {
            _id: null,
            totalComments: { $sum: "$totalComments" },
          },
        },
      ])
      .toArray();

    const totalComments =
      commentAggregation.length > 0 ? commentAggregation[0].totalComments : 0;

    // Aggregate total read count from blogs
    const blogAggregation = await blogCollection
      .aggregate([
        {
          $group: {
            _id: null,
            totalRead: { $sum: "$readCount" },
          },
        },
      ])
      .toArray();

    const totalRead =
      blogAggregation.length > 0 ? blogAggregation[0].totalRead : 0;

    // Prepare the response
    const response = {
      blogs: await blogCollection.countDocuments(), // Total number of blogs
      totalRead,
      totalComments,
    };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
