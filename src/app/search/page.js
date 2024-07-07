import SearchBox from "@/components/SearchBox";
import SearchPage from "@/components/SearchPage";
import SuspenseFallback from "@/components/SuspenseFallback";
import { Suspense } from "react";

const page = async({ searchParams }) => {
  let items;
  let keyword;
  const blog = searchParams?.blog;
  const audio = searchParams?.audio;
  const video = searchParams?.video;
  const book = searchParams?.book;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";

  if(blog) keyword = blog;
  else if(audio) keyword = audio;
  else if(video) keyword = video
  else if(book) keyword = book

  try {
    if (blog && keyword) {
      items = await getBlogs("", page, limit, sort, keyword);
    }
  } catch (error) {
    items = null;
  }

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <SearchBox />
      {Object.keys(searchParams).length > 0 && keyword && !items && <p>Nothing found with {keyword}</p>}
      {Object.keys(searchParams).length > 0 && (
        <SearchPage searchParams={searchParams} />
      )}
    </Suspense>
  );
};

export default page;
