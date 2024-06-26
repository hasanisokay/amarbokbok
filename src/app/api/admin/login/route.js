import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { COOKIE_NAME, dbErrorResponse } from "@/constants/constants.mjs";

export const POST = async (req) => {
  const body = await req.json();
  const { email, password } = body;

  const wrongResponse = {
    status: 404,
    message: "Wrong username or password.",
  };

  try {
    const db = await dbConnect();
    if (!db)
      return NextResponse.json(dbErrorResponse);

    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ email: email });

    if (!user) {
      return NextResponse.json(wrongResponse);
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      const secret = new TextEncoder().encode(process.env.JWT_ENCRYPTION_KEY);
      const name = user.name;
      const role = user.role;
      const token = await new SignJWT({ email, password, name, role })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d")
        .sign(secret);
      cookies().set({
        name: COOKIE_NAME,
        value: `Bearer${token}`,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 * 7, // 7 day
      });
      return NextResponse.json({
        status: 200,
        user: { email, role: user?.role },
        message: "Validated",
      });
    } else {
      return NextResponse.json(wrongResponse);
    }
  } catch {
    return NextResponse.json({
      status: 500,
      message: "Server Error.",
    });
  }
};
