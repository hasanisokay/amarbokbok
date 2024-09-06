"use server"

import NotFound from "@/components/NotFound";
import Sidebar from "@/components/Sidebar";
import SingleBlogPage from "@/components/SingleBlogPage";
import SuspenseFallback from "@/components/SuspenseFallback";
import { singleBlogMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import deltaToPlainText from "@/utils/deltaToPlainText.mjs";
import getBlog from "@/utils/getBlog.mjs";
import getImageLinkFromDelta from "@/utils/getImageLinkFromDelta.mjs";
import truncateText from "@/utils/truncateText.mjs";
// import localFont from 'next/font/local'
import { Suspense } from "react";
export async function generateMetadata({ params }) {
  const host = await hostname();
  const blogId = params?.id;

  let metadata = {
    title: `Blog - ${websiteName}`,
    description: "Read our latest blog posts on various topics.",
    keywords: ["Amar bokbok blog"],
    url: blogId ? `${host}/blogs/${blogId}` : `${host}/blogs`,
  };

  try {
    if (blogId) {
      const blog = await getBlog(blogId);
      const imageUrl = getImageLinkFromDelta(blog?.blog?.content);
      
      if (blog) {
        const blogTitle = blog?.blog?.title || "Blog Post";
        metadata.title = `${blogTitle} - ${websiteName}`;
        const titleKeywords = blogTitle.split(" ").filter(kw => kw.length > 3);
        metadata.keywords.push(...titleKeywords);
        if(blog?.blog?.categories.length > 0) {metadata.keywords.push(...blog?.blog?.categories)}
        
        metadata.description = truncateText(deltaToPlainText(blog?.blog?.content), 160, false) || "Detailed description of the blog post.";
// console.log(truncateText(deltaToPlainText(blog?.blog?.content), 160, false))
        metadata.other = {
          "twitter:image": imageUrl || singleBlogMetaImage,
          "twitter:card": "summary_large_image",
          "twitter:title": metadata.title,
          "twitter:description": metadata.description,
          "og:title": metadata.title,
          "og:description": metadata.description,
          "og:url": `${host}/blogs/${blogId}`,
          "og:image": imageUrl || singleBlogMetaImage,
          "og:type": "article",
          "og:site_name": websiteName,
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
    return <NotFound />;
  else
    return (
      <Suspense fallback={<SuspenseFallback />}>
        <div className={` blog-layout`}>
          <section className="lg:mx-2 mx-1">
            <SingleBlogPage blog={blog} />
          </section>
          <section className="px-2 w-fit">
            <Sidebar />
          </section>
        </div>
      </Suspense>
    );
}
