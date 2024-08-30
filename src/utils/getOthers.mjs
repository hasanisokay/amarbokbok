"use server"

import { hostname } from "@/constants/hostname.mjs";

const getOthers = async (type, page, limit, sort, keyword = "") => {

  try {
    const host = await hostname();
    const res = await fetch(
      `${host}/api/get-others?type=${type}&&page=${
        page || 1
      }&&limit=${limit}&&sort=${sort}&&keyword=${keyword}`
    );
    const data = await res.json();
    return data;
  } catch {
    return [];
  }
};

export default getOthers;
