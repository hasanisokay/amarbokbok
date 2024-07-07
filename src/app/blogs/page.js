"use server"
import BlogsPage from "@/components/BlogsPage";
import NotFound from "@/components/NotFound";
import { hostname } from "@/constants/hostname.mjs";
import getBlogs from "@/utils/getBlogs.mjs";

const blogsPage = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  let blogs;
  try {
    blogs = await getBlogs("", page, limit, sort);
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
};

export default blogsPage;

export async function generateMetadata() {
  const host = await hostname();
  let metadata = {
    title: "Blogs | Bonjui",
    description: "Blogs Page",
    keywords: ["Blogs", "Bonjui Blog", "Ahmmad Robins Blog"],
    url: `${host}/blogs`,
  };

  try {
    metadata.other = {
      // change the image links
      "twitter:image": "https://i.ibb.co/YDMvcNN/Untitled-1-Copy.jpg",
      "twitter:card": "summary_large_image",
      "og-title": "Categories | Blog",
      "og-description": "Blog categories",
      "og-url": `${host}/blogs`,
      "og:image": "https://i.ibb.co/YDMvcNN/Untitled-1-Copy.jpg",
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return metadata;
}
