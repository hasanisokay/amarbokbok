"use server"

import { hostname } from "@/constants/hostname.mjs";

const getCategories = async () => {
  try {
    const host = await hostname();
    const response = await fetch(`${host}/api/get-categories`);
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};

export default getCategories;
