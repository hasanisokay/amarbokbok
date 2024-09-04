'use server'
import NotFound from "@/components/NotFound";
import { categoryMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import capitalize from "@/utils/capitalize.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import dynamic from "next/dynamic";

const BlogsPage = dynamic(() =>import("@/components/BlogsPage"), { ssr: false });

export default async function categoryPage({ params, searchParams }) {
  const category = decodeURIComponent(params?.category?.trim());
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  let blogs;

  try {
    if (category) {
      blogs = await getBlogs(category, page, limit, sort);
    }
  } catch (error) {
    blogs = null;
  }
  if (
    blogs?.status === 500 ||
    blogs?.status === 400 ||
    blogs?.status === 404 ||
    !blogs ||
    blogs?.error
  )
    return <NotFound />;
  return <BlogsPage blogs={blogs} page={page} limit={limit} sort={sort} />;
}

export async function generateMetadata({ params }) {
  const category = decodeURIComponent(params?.category?.trim());
  const host = await hostname();
  
  let metadata = {
    title: `${capitalize(category) || "Categories"} - ${websiteName}`,
    description: `Explore blog posts categorized under ${capitalize(category) || "various topics"}. Discover content that interests you.`,
    keywords: ["Blog", "Categories", "Bonjui Blog", "Ahmmad Robin's Blog", capitalize(category) || "Categories"],
    url: `${host}/blogs/categories`,
  };

  try {
    metadata.other = {
      "twitter:image": categoryMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": metadata.title,
      "twitter:description": metadata.description,
      "og:title": metadata.title,
      "og:description": metadata.description,
      "og:url": `${host}/blogs/categories`,
      "og:image": categoryMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
    };
  } catch (error) {
    console.error("Error fetching category metadata:", error);
  }

  return metadata;
}
