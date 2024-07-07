import NotFound from "@/components/NotFound";
import Sidebar from "@/components/Sidebar";
import SingleBlogPage from "@/components/SingleBlogPage";
import SuspenseFallback from "@/components/SuspenseFallback";
import { hostname } from "@/constants/hostname.mjs";
import deltaToPlainText from "@/utils/deltaToPlainText.mjs";
import getBlog from "@/utils/getBlog.mjs";
import getImageLinkFromDelta from "@/utils/getImageLinkFromDelta.mjs";
import { Suspense } from "react";
export async function generateMetadata({ params }) {
  const host = await hostname();
  const blogId = params?.id;
  let metadata = {
    title: "Bonjui Blog",
    description: "Blog description",
    keywords: ["Blog", "Bonjui Blog", "Ahmmad Robins Blog"],
    url: params?.id ? `${host}/blogs/${params?.id}` : `${host}/blogs`,
  };

  try {
    if (blogId) {
      const blog = await getBlog(blogId);
      const imageUrl = getImageLinkFromDelta(blog?.blog?.content);

      if (blog) {
        metadata.title = blog.blog.title || "Blog";
        metadata.description =
          deltaToPlainText(blog?.blog?.content) || "Blog post description";
        metadata.keywords.push(...blog?.blog?.title.split(" "));
        metadata.other = {
          // change the image links
          "twitter:image": imageUrl
            ? imageUrl
            : "https://i.ibb.co/YDMvcNN/Untitled-1-Copy.jpg",
          "twitter:card": "summary_large_image",
          "og-title": (metadata.title = blog.blog.title || "Blog"),
          "og-description":
            deltaToPlainText(blog?.blog?.content) || "Blog post description",
          "og-url": params?.id
            ? `${host}/blogs/${params?.id}`
            : `${host}/blogs`,
          "og:image": imageUrl
            ? imageUrl
            : "https://i.ibb.co/YDMvcNN/Untitled-1-Copy.jpg",
        };
      }
    }
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return metadata;
}

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
    return <NotFound />
  else
    return (
      <>
        <Suspense fallback={<SuspenseFallback />}>
          <div className="blog-layout">
            <section className="lg:mx-2 mx-1">
              <SingleBlogPage blog={blog} />
            </section>
            <Sidebar />
          </div>
        </Suspense>
      </>
    );
}
