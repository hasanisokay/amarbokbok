import Blogs from "@/components/Blogs";
import Pagination from "@/components/Pagination";
import ResetPage from "@/components/ResetPage";
import SelectInBlogs from "@/components/SelectInBlogs";
import getBlogs from "@/utils/getBlogs.mjs";
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
