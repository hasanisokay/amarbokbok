"use server"
import { headers } from "next/headers";
export const hostname = async () => {
  const h = headers();
  const hostname = h.headers.host;
  
  const env = process.env.NODE_ENV;
  if (env == "development") {
    return `http://${hostname}`;
  } else if (env == "production") {
    return `https://${hostname}`;
  }
};
