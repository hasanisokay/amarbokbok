"use server";
import CategoryPage from "@/components/CategoryPage";
import SuspenseFallback from "@/components/SuspenseFallback";
import { hostname } from "@/constants/hostname.mjs";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <CategoryPage />
    </Suspense>
  );
};

export default page;

export async function generateMetadata({ params }) {
  const host = await hostname();
  let metadata = {
    title: "Categories | Bonjui",
    description: "Category Page",
    keywords: ["Blog","Categories", "Bonjui Blog", "Ahmmad Robins Blog"],
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
