'use server'
import BlogsPage from "@/components/BlogsPage";
import NotFound from "@/components/NotFound";
import { hostname } from "@/constants/hostname.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import { capitalize } from "lodash";

export default async function categoryPage({ params, searchParams }) {
  const category = params?.category;
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
  const category = params?.category;
  const host = await hostname();
  let metadata = {
    title: `${capitalize(category)} | Bonjui`,
    description: "Category Page",
    keywords: ["Blog", "Bonjui Blog", "Ahmmad Robins Blog"],
    url: `${host}/blogs/categories`,
  };

  try {
    metadata.other = {
      // change the image links
      "twitter:image": "https://i.ibb.co/YDMvcNN/Untitled-1-Copy.jpg",
      "twitter:card": "summary_large_image",
      "og-title": "Categories | Blog",
      "og-description": "Blog categories",
      "og-url": `${host}/blogs/categories`,
      "og:image": "https://i.ibb.co/YDMvcNN/Untitled-1-Copy.jpg",
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return metadata;
}
