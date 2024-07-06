import Blogs from "@/components/Blogs";
import Pagination from "@/components/Pagination";
import ResetPage from "@/components/ResetPage";
import SelectInBlogs from "@/components/SelectInBlogs";
import { hostname } from "@/constants/hostname.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import { capitalize } from "lodash";
import { Suspense } from "react";

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
    return (
      <div className="text-center text-xl">
        <h1 className="text-2xl">404</h1>
        <p>Oho! Not Found.</p>
      </div>
    );
  if (blogs?.blogs?.length < 1) {
    return (
      <>
        <ResetPage currentPage={page}/>
      </>
    );
  } else {
    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, blogs?.totalCount);
    return (
      <>
        <Suspense fallback={<p>Please wait</p>}>
          <p className="my-1">
            Showing {start} - {end} of {blogs?.totalCount}
          </p>
          <SelectInBlogs sort={sort} limit={limit} page={page} />
          <Blogs blogs={blogs} start={start} end={end} />
          {blogs?.totalCount > limit && (
            <Pagination
              currentPage={page}
              total={blogs?.totalCount}
              limit={limit}
            />
          )}
        </Suspense>
      </>
    );
  }
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

