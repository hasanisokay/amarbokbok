"use server"

import { hostname } from "@/constants/hostname.mjs";

const getCategories = async (withCount = false) => {
  try {
    const host = await hostname();
    const response = await fetch( withCount? `${host}/api/get-categories?count=true` : `${host}/api/get-categories` );
    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};

export default getCategories;
