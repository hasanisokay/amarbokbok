import Blogs from "@/components/Blogs";
import getBlogs from "@/utils/getBlogs.mjs";
import { Suspense } from "react";

export default async function categoryPage({ params }) {
  const category = params?.category;
  const page = params?.page;
  let blogs;
  try {
    if (category) {
      blogs = await getBlogs(category, page || 1);
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
  else
    return (
      <>
        <Suspense fallback={<p>Please wait</p>}>
          <Blogs blogs={blogs}/>
        </Suspense>
      </>
    );
}
