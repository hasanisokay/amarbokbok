"use server"
import BlogsPage from "@/components/BlogsPage";
import SearchBox from "@/components/SearchBox";
import SearchPage from "@/components/SearchPage";
import SuspenseFallback from "@/components/SuspenseFallback";
import { searchMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import capitalize from "@/utils/capitalize.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import { Suspense } from "react";

const searchPage = async ({ searchParams }) => {
  let items;
  let keyword;
  let type;

  const blog = searchParams?.blog;
  const audio = searchParams?.audio;
  const video = searchParams?.video;
  const book = searchParams?.book;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  const category =
    searchParams?.category === "any" ? "" : searchParams.category;

  if (blog) {
    keyword = blog;
    type = "blog";
  } else if (audio) {
    keyword = audio;
    type = "audio";
  } else if (video) {
    keyword = video;
    type = "video";
  } else if (book) {
    keyword = book;
    type = "book";
  }
  try {
    if (blog && keyword) {
      items = await getBlogs(category, page, limit, sort, keyword);
    }
  } catch (error) {
    items = null;
  }

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <SearchBox searchedText={keyword}  searchedType={type} searchedCategory={category}/>

      {blog && items?.blogs?.length > 0 && (
        <BlogsPage blogs={items} limit={limit} sort={sort} page={page} />
      )}
      {Object.keys(searchParams).length > 0 &&
        keyword &&
        items?.blogs?.length === 0 && (
          <h4 className="text-center">
            Nothing found with <span className="italic">{keyword}</span>
          </h4>
        )}
      {Object.keys(searchParams).length > 0 && (
        <SearchPage searchParams={searchParams} />
      )}
    </Suspense>
  );
};

export default searchPage;

export async function generateMetadata({ searchParams }) {
  let keyword;
  let type;
  const blog = searchParams?.blog;
  const audio = searchParams?.audio;
  const video = searchParams?.video;
  const book = searchParams?.book;

  if (blog) {
    keyword = blog;
    type = "blog";
  } else if (audio) {
    keyword = audio;
    type = "audio";
  } else if (video) {
    keyword = video;
    type = "video";
  } else if (book) {
    keyword = book;
    type = "book";
  }

  const host = await hostname();
  return {
    title: `${keyword ? `${keyword} in ${capitalize(type)}` : "Search Results"} - ${websiteName}`,
    description: `Find results for ${keyword ? `${keyword} in ${capitalize(type)}` : "your search"} on ${websiteName}.`,
    keywords: [
      "Search",
      "Search Results",
      "Blogs",
      "Audio",
      "Video",
      "Books",
      "Personal Website",
      "Jharfuk",
      "Ahmmad Robin's Blog",
      keyword,
      type
    ].filter(Boolean),
    url: `${host}/search`,
    image: searchMetaImage,
    other: {
      "twitter:image": searchMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `${keyword ? `${keyword} in ${capitalize(type)}` : "Search Results"} - ${websiteName}`,
      "twitter:description": `Find results for ${keyword ? `${keyword} in ${capitalize(type)}` : "your search"} on ${websiteName}.`,
      "og:title": `${keyword ? `${keyword} in ${capitalize(type)}` : "Search Results"} - ${websiteName}`,
      "og:description": `Find results for ${keyword ? `${keyword} in ${capitalize(type)}` : "your search"} on ${websiteName}.`,
      "og:url": `${host}/search`,
      "og:image": searchMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
      locale: "en_US",
    },
  };
}
