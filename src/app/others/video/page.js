import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
// import SelectInBlogs from ";
import SuspenseFallback from "@/components/SuspenseFallback";
import VideoList from "@/components/VideoList";
import getOthers from "@/utils/getOthers.mjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SelectInBlogs = dynamic(() => import("@/components/SelectInBlogs"), {
  ssr: false,
});

const page = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  const keyword = searchParams?.keyword || "";
  let videos = [];

  try {
    videos = await getOthers("video", page, limit, sort, keyword);
  } catch (error) {
    videos = null;
  }
  if (
    videos?.status === 500 ||
    videos?.status === 400 ||
    videos?.status === 404 ||
    !videos ||
    videos?.error
  ) {
    return <NotFound />;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, videos?.totalCount);
  return (
    <Suspense fallback={<SuspenseFallback />}>
      {videos?.others?.length > 0 ? (
        <section>
          <p className="my-1 ml-[20px]">
            Showing {start} - {end} of {videos?.totalCount}
          </p>
          <div className="ml-[20px]">
            <SelectInBlogs sort={sort} limit={limit} page={page} />
          </div>
          <VideoList videos={videos?.others} />
          {videos?.totalCount > limit && (
            <Pagination
              currentPage={page}
              total={videos?.totalCount}
              limit={limit}
            />
          )}
        </section>
      ) : (
        <p className="text-center mt-10 font-semibold">Oho! No video found.</p>
      )}
    </Suspense>
  );
};
export default page;
