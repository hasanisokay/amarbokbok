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
    const keyword = searchParams.get("keyword");
    const sort = searchParams.get("sort");
    const sortOrder = sort === "newest" ? -1 : 1;
    const page = parseInt(searchParams.get("page"));
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;
    const db = await dbConnect();
    if (!db) return NextResponse.json(dbErrorResponse);
    // const query = category ? { categories: { $in: [category] } } : {};
    // const blogCollection = await db.collection("blogs");
    // const totalCount = await blogCollection.countDocuments(query);
    // const result = await blogCollection
    // .find(query)
    // .sort({ addedOn: sortOrder })
    // .skip(skip)
    // .limit(limit)
    // .toArray();

    const matchStage = {};
    if (category) {
      matchStage.categories = { $in: [category] };
    }

    if (keyword) {
      matchStage.$or = [
        { "content.ops.insert": { $regex: keyword, $options: "i" } },
        { title: { $regex: keyword, $options: "i" } },
        { blog_id: { $regex: keyword, $options: "i" } }
      ];
    }

    const blogCollection = await db.collection("blogs");
    const result = await blogCollection
      .find(matchStage)
      .sort({ addedOn: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray();
    let totalCount;
    if (result?.length === limit ) {
      totalCount = await blogCollection.countDocuments(matchStage);
    } else {
      totalCount = result?.length;
    }
    return NextResponse.json({ blogs: result, totalCount });
  } catch {
    return NextResponse.json(serverErrorResponse);
  }
};
