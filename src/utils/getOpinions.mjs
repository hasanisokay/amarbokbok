"use server"

import { hostname } from "@/constants/hostname.mjs";

const getOpinions = async (
  page,
  limit,
  sort,
  approvedOnly = "",
  pendingOnly = "",
  keyword = ""
) => {
  const host = await hostname();
  const res = await fetch(
    `${host}/api/get-opinions?page=${
      page || 1
    }&&limit=${limit}&&sort=${sort}&&pending=${pendingOnly}&&approved=${approvedOnly}&&keyword=${keyword}`
  );
  const data = await res.json();
  return data;
};

export default getOpinions;
