"use server"
import CategoryCard from "@/components/CategoryCard";
import SuspenseFallback from "@/components/SuspenseFallback";
import { categoryMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <div className="flex items-center justify-center">
        <CategoryCard />
      </div>
    </Suspense>
  );
};

export default page;

export async function generateMetadata({ params }) {
  const host = await hostname();
  let metadata = {
    title: `Categories - ${websiteName}`,
    description: "ক্যাটাগরি অনুযায়ী লেখা পড়তে পারবেন এই পেইজ থেকে। আমার বকবকের সব ব্লগের ক্যাটাগরি একসাথে পাবেন।",
    keywords: ["Blogs", "Categories","Amar Bok Bok Blogs Categories", "সব ক্যাটাগরি", "আমার বকবক"],
    url: `${host}/blogs/categories`,
    canonical: `${host}/blogs/categories`, 
  };

  try {
    metadata.other = {
      // todos: change the image links with new category image. currently its blog image.
      "twitter:image": categoryMetaImage,
      "twitter:card": "summary_large_image",
      "og-title": "Categories | Blog",
      "og-description": "Blog categories",
      "og-url": `${host}/blogs/categories`,
      "og:image": categoryMetaImage,
      "og:locale": "bn_BD",
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return metadata;
}