"use server";
import { COOKIE_NAME } from "@/constants/constants.mjs";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const verifyToken = async (t = null) => {
  if (!t) {
    t = cookies().get(COOKIE_NAME)?.value.split("Bearer")[1];
  }

  const secret = new TextEncoder().encode(process.env.JWT_ENCRYPTION_KEY);
  try {
    // const {email, password, name, role}  = await jwtVerify(t, secret);
    const { payload } = await jwtVerify(t, secret);
    const { email, password, name, role } = payload;

    if (email && password) return { email, name, role };
    else return false;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return false;
  }
};
