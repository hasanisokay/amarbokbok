import SingleBlogPage from "@/components/SingleBlogPage";
import getBlog from "@/utils/getBlog.mjs";
import { Suspense } from "react";

export default async function page({ params }) {
    const blogId = params?.id;
    let blog;
    try {
      if (blogId) {
        blog = await getBlog(blogId);
      }
    } catch (error) {
      blog = null;
    }
    if (
      blog?.status === 500 ||
      blog?.status === 400 ||
      blog?.status === 404 ||
      !blog ||
      blog?.error
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
          <Suspense fallback={ <p>Please wait</p> }>
<SingleBlogPage blog={blog} />
          </Suspense>
        </>
      );
  }
  