"use server";
import SuspenseFallback from "@/components/SuspenseFallback";
import { searchMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import capitalize from "@/utils/capitalize.mjs";
import getBlogs from "@/utils/getBlogs.mjs";
import getOthers from "@/utils/getOthers.mjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SelectInBlogs = dynamic(() =>import("@/components/SelectInBlogs"), { ssr: false });
const VideoList = dynamic(() =>import("@/components/VideoList"), { ssr: false });
const SearchBox = dynamic(() =>import("@/components/SearchBox"));
const Pagination = dynamic(() =>import("@/components/Pagination"), { ssr: false });
const ImageList = dynamic(() =>import("@/components/ImageList"), { ssr: false });
const BlogsPage = dynamic(() =>import("@/components/BlogsPage"), { ssr: false });
const AudioList = dynamic(() =>import("@/components/AudioList"), { ssr: false });
// const Pagination = dynamic(() =>import(), { ssr: false });

const searchPage = async ({ searchParams }) => {
  let items;
  let keyword;
  let type;

  const blog = searchParams?.blog;
  const audio = searchParams?.audio;
  const video = searchParams?.video;
  const pdf = searchParams?.pdf;
  const image = searchParams?.image;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  const category =
    searchParams?.category === "any" ? "" :  searchParams.category;

  if (blog) {
    keyword = blog;
    type = "blog";
  } else if (audio) {
    keyword = audio;
    type = "audio";
  } else if (video) {
    keyword = video;
    type = "video";
  } else if (pdf) {
    keyword = pdf;
    type = "pdf";
  } else if (image) {
    keyword = image;
    type = "image";
  }
  try {
    if (blog && keyword) {
      items = await getBlogs(category, page, limit, sort, keyword);
    } else if (keyword) {
      items = await getOthers(type, page, limit, sort, keyword);
    }
  } catch (error) {
    items = null;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, items?.totalCount);
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <SearchBox
        searchedText={keyword}
        searchedType={type}
        searchedCategory={category}
      />
      {blog && items?.blogs?.length > 0 && (
        <BlogsPage blogs={items} limit={limit} sort={sort} page={page} />
      )}
      {Object.keys(searchParams).length > 0 &&
        keyword &&
        (items?.blogs?.length === 0) && (
          <h4 className="text-center">
            Nothing found with <span className="italic">{keyword}</span>
          </h4>
        )}
      {Object.keys(searchParams).length > 0 &&
        keyword && !blog &&
        (items?.totalCount === 0) && (
          <h4 className="text-center">
            Nothing found with <span className="italic">{keyword}</span>
          </h4>
        )}
      {Object.keys(searchParams).length > 0 && keyword && !blog && (
        <section className="md:max-w-[calc(100%-200px)] mx-auto">
          <div className="ml-[20px]">
            {items?.others?.length > 0 && (
              <>
                <p className="my-1">
                  Showing {start} - {end} of {items?.totalCount}
                </p>
                <SelectInBlogs sort={sort} limit={limit} page={page} />
              </>
            )}
          </div>
          {/* <AudioList audios={audios} /> */}
          {(type === "audio" || type === "pdf") && (
            <AudioList audios={items?.others} />
          )}
          {type === "video" && <VideoList videos={items?.others} />}
          {type === "image" && <ImageList images={items?.others} />}
          {/* {type==="pdf" && <Aud images={items?.others}/> } */}
          {items?.totalCount > limit && (
            <Pagination currentPage={page} total={totalCount} limit={limit} />
          )}
        </section>
      )}
    </Suspense>
  );
};

export default searchPage;

export async function generateMetadata({ searchParams }) {
  let items;
  let keyword;
  let type;

  const blog = searchParams?.blog;
  const audio = searchParams?.audio;
  const video = searchParams?.video;
  const pdf = searchParams?.pdf;
  const image = searchParams?.image;

  if (blog) {
    keyword = blog;
    type = "blog";
  } else if (audio) {
    keyword = audio;
    type = "audio";
  } else if (video) {
    keyword = video;
    type = "video";
  } else if (pdf) {
    keyword = pdf;
    type = "pdf";
  } else if (image) {
    keyword = image;
    type = "image";
  }

  const host = await hostname();
  return {
    title: `${
      keyword ? `${decodeURIComponent(keyword.trim())} in ${capitalize(type)}` : "Search Results"
    } - ${websiteName}`,
    description: `Find results for ${
      keyword ? `${keyword} in ${capitalize(type)}` : "your search"
    } on ${websiteName}.`,
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
      type,
    ].filter(Boolean),
    url: `${host}/search`,
    image: searchMetaImage,
    other: {
      "twitter:image": searchMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `${
        keyword ? `${keyword} in ${capitalize(type)}` : "Search Results"
      } - ${websiteName}`,
      "twitter:description": `Find results for ${
        keyword ? `${keyword} in ${capitalize(type)}` : "your search"
      } on ${websiteName}.`,
      "og:title": `${
        keyword ? `${keyword} in ${capitalize(type)}` : "Search Results"
      } - ${websiteName}`,
      "og:description": `Find results for ${
        keyword ? `${keyword} in ${capitalize(type)}` : "your search"
      } on ${websiteName}.`,
      "og:url": `${host}/search`,
      "og:image": searchMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
      locale: "en_US",
    },
  };
}
