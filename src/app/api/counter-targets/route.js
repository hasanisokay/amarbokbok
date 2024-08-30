import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import getIp from "@/utils/getIP.mjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);

    const commentCollection = await db.collection("comments");
    const blogCollection = await db.collection("blogs");
    const othersCollection = await db.collection("others");

    // Aggregate total comments including replies
    const commentAggregation = await commentCollection
      .aggregate([
        {
          $project: {
            totalComments: { $add: [1, { $size: "$replies" }] },
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

    // Sum the total read count from all blog documents
    const totalReadAggregation = await blogCollection.aggregate([
      {
        $group: {
          _id: null,
          totalRead: { $sum: "$readCount" },
        },
      },
    ]).toArray();

    const totalReadCount =
      totalReadAggregation.length > 0 ? totalReadAggregation[0].totalRead : 0;

    // Get the user's IP address
    const ip = await getIp();

    // Ensure TTL index is created
    // await othersCollection.createIndex(
    //   { "onlineUsers.expiresAt": 1 },
    //   { expireAfterSeconds: 0 }
    // );

    // Check if the IP already exists in the onlineUsers array
    const ipExists = await othersCollection.findOne({
      type: "onlineUsers",
      "onlineUsers.ip": ip,
    });

    if (ipExists) {
      // Update the expiration time for the existing IP
      await othersCollection.updateOne(
        { type: "onlineUsers", "onlineUsers.ip": ip },
        {
          $set: {
            "onlineUsers.$.expiresAt": new Date(Date.now() + 10 * 60 * 1000),
          },
        }
      );
    } else {
      // Add the new IP with an expiration time
      await othersCollection.updateOne(
        { type: "onlineUsers" },
        {
          $addToSet: {
            onlineUsers: {
              ip: ip,
              expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
            },
          },
        },
        { upsert: true }
      );
    }

    // Fetch online users count
    const onlineUsersResult = await othersCollection.findOne(
      { type: "onlineUsers" },
      { projection: { _id: 0, onlineUsersCount: { $size: "$onlineUsers" } } }
    );
    
    const onlineUsers = onlineUsersResult?.onlineUsersCount || 0;


    // Fetch total users count
    const totalUsersResult = await othersCollection.findOne(
      { type: "userCount" },
      { projection: { totalCount: 1 } }
    );
    const totalUsers = totalUsersResult?.totalCount || 0;

    // Prepare response
    const response = {
      status: 200,
      blogs: await blogCollection.countDocuments(), // Total number of blogs
      totalRead: totalReadCount,
      totalComments,
      onlineUsers,
      totalUsers,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(serverErrorResponse);
  }
};
