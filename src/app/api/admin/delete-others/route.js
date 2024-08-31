import {
  COOKIE_NAME,
  serverErrorResponse,
  unauthorizedResponse,
} from "@/constants/constants.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    let token = req?.cookies?.get(COOKIE_NAME);
    if (!token) {
      return NextResponse.json(unauthorizedResponse);
    }
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const db = await dbConnect();
    const othersCollection = await db.collection("others");
    const res = await othersCollection.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount > 0) {
      return NextResponse.json({ status: 200, message: "Success." });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Could not delete. Reload please.",
      });
    }
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
