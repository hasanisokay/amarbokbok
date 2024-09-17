// import BlogsPage from "@/components/BlogsPage";
import NotFound from "@/components/NotFound";
import { blogsMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import dynamic from "next/dynamic";

const BlogsPage = dynamic(() => import('@/components/BlogsPage'), {
  ssr: false,
})

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
  if (blogs?.blogs?.length > 0) {
    return <BlogsPage blogs={blogs} page={page} limit={limit} sort={sort} />;
  }
};

export default blogsPage;

export async function generateMetadata() {
  const host = await hostname();
  let metadata = {
    title: `Blogs - ${websiteName}`,
    description: "আমার বকবকের ব্লগে প্রকাশিত সব লেখা এখানে পাওয়া যাবে। পুরাতন এবং নতুন সব লেখাই ক্যাটাগরি অনুযায়ী সাজানো আছে। চাইলে ক্যাটাগরি অনুযায়ীও পড়া যাবে।",
    keywords: ["Blogs",  "আহমাদ রবিনের ব্লগ", "লেখালেখি", "আমার বকবক ব্লগ","Amar Bok Bok Blogs", "আমার বকবক"],
    url: `${host}/blogs`,
    canonical: `${host}/blogs`, 
  };

  try {
    metadata.other = {
      "twitter:image": blogsMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `Blogs - ${websiteName}`,
      "twitter:description": "আমার বকবকের ব্লগে প্রকাশিত সব লেখা এখানে পাওয়া যাবে। পুরাতন এবং নতুন সব লেখাই ক্যাটাগরি অনুযায়ী সাজানো আছে। চাইলে ক্যাটাগরি অনুযায়ীও পড়া যাবে।",
      "og:title": `Blogs - ${websiteName}`,
      "og:description": "আমার বকবকের ব্লগে প্রকাশিত সব লেখা এখানে পাওয়া যাবে। পুরাতন এবং নতুন সব লেখাই ক্যাটাগরি অনুযায়ী সাজানো আছে। চাইলে ক্যাটাগরি অনুযায়ীও পড়া যাবে।",
      "og:url": `${host}/blogs`,
      "og:image": blogsMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
      "og:locale": "bn_BD",
    };
  } catch (error) {
    console.error("Error fetching blogs metadata:", error);
  }

  return metadata;
}
