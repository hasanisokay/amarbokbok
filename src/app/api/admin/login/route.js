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


      // const response = NextResponse.json({
      //   status: 200,
      //   user: { email, role: user.role },
      //   message: "Validated",
      // });
      // response.cookies.set(COOKIE_NAME, `Bearer ${token}`, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   maxAge: 24 * 60 * 60 * 30, // 30 days
      //   path: '/',
      //   sameSite: 'Strict', // Prevent CSRF attacks
      // });

      // return response;
      cookies().set({
        name: COOKIE_NAME,
        value: `Bearer${token}`,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 3, // 3 day
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
