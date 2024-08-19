import {
  dbErrorResponse,
  serverErrorResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import getIp from "@/utils/getIP.mjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const ip = await getIp();
    const data = {ip, status:"pending", replies:[], submittedOn: new Date(), ...body}
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    const commentCollection = await db.collection("comments");
    await commentCollection.insertOne(data);
    return NextResponse.json({
      status: 200,
      message: "Comment will be visible publicly after review.",
    });
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
