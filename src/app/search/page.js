"use server";
import BlogsPage from "@/components/BlogsPage";
import SearchBox from "@/components/SearchBox";
import SearchPage from "@/components/SearchPage";
import SuspenseFallback from "@/components/SuspenseFallback";
import getBlogs from "@/utils/getBlogs.mjs";
import { Suspense } from "react";

const page = async ({ searchParams }) => {
  let items;
  let keyword;
  const blog = searchParams?.blog;
  const audio = searchParams?.audio;
  const video = searchParams?.video;
  const book = searchParams?.book;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  const category =
    searchParams?.category === "any" ? "" : searchParams.category;

  if (blog) keyword = blog;
  else if (audio) keyword = audio;
  else if (video) keyword = video;
  else if (book) keyword = book;
  try {
    if (blog && keyword) {
      items = await getBlogs(category, page, limit, sort, keyword);
    }
  } catch (error) {
    items = null;
  }

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <SearchBox />

      {blog && items && (
        <BlogsPage blogs={items} limit={limit} sort={sort} page={page} />
      )}
      {Object.keys(searchParams).length > 0 && keyword && !items && (
        <p>Nothing found with {keyword}</p>
      )}
      {Object.keys(searchParams).length > 0 && (
        <SearchPage searchParams={searchParams} />
      )}
    </Suspense>
  );
};

export default page;

export async function generateMetadata() {
  return {
    title: "Search - Bonjui",
    description: "Search in this website.",
    keywords: ["Personal Website", "Search", "Search Bojui", "Blogs", "Jharfuk", "Ahmmad Robins Blogs"],
    other: {
      "twitter:image": "https://i.ibb.co/89yqcW8/home-page.jpg",
      "twitter:card": "summary_large_image",
      "og-url": `${hostname}/search`,
      "og:image": "https://i.ibb.co/89yqcW8/home-page.jpg",
      "og:type": "website",
      locale: "en_US",
    },
    image: "https://i.ibb.co/89yqcW8/home-page.jpg",
    url: `${hostname}/search`,
  };
}