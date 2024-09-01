import NotFound from "@/components/NotFound";
import OpinionList from "@/components/OpinionList";
import Pagination from "@/components/Pagination";
import SelectInBlogs from "@/components/SelectInBlogs";
import SuspenseFallback from "@/components/SuspenseFallback";
import { opinionsMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import getOpinions from "@/utils/getOpinions.mjs";
import Link from "next/link";
import { Suspense } from "react";

const page = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  const keyword = searchParams?.keyword || "";
  let opinions = [];

  try {
    opinions = await getOpinions(page, limit, sort, true, keyword);
  } catch (error) {
    opinions = null;
  }
  if (
    opinions?.status === 500 ||
    opinions?.status === 400 ||
    opinions?.status === 404 ||
    !opinions ||
    opinions?.error
  ) {
    return <NotFound />;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, opinions?.totalCount);
  return (
    <Suspense fallback={<SuspenseFallback />}>
      {opinions?.opinions?.length > 0 ? (
        <section>
          <p className="my-1 ml-[20px]">
            Showing {start} - {end} of {opinions?.totalCount}
          </p>
          <div className="ml-[20px]">
            <SelectInBlogs sort={sort} limit={limit} page={page} />
          </div>
          <OpinionList opinions={opinions?.opinions} />
          {opinions?.totalCount > limit && (
            <Pagination
              currentPage={page}
              total={opinions?.totalCount}
              limit={limit}
            />
          )}
        </section>
      ) : (
        <p className="text-center mt-10 font-semibold">
          Oho! No opinion found. You can share yours.{" "}
          <Link className="text-blue-500" href={"/opinions/share"}>
            Click here
          </Link>{" "}
        </p>
      )}
    </Suspense>
  );
};

export default page;

export async function generateMetadata() {
  const host = await hostname();
  let metadata = {
    title: `Opinions - ${websiteName}`,
    description: "Explore diverse opinions and discussions on various topics. Share your thoughts and see what others are saying.",
    keywords: ["Opinions", "Discussions", "Bonjui Blog", "Ahmmad Robin's Blog", "Community", "Feedback"],
    url: `${host}/opinions`,
  };

  try {
    metadata.other = {
      "twitter:image": opinionsMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `Opinions - ${websiteName}`,
      "twitter:description":
        "Join the conversation on various topics. Share your opinions and see what others think on this page.",
      "og:title": `Opinions - ${websiteName}`,
      "og:description":
        "Discover and engage with a range of opinions on our blog. Share your views and read others' insights.",
      "og:url": `${host}/opinions`,
      "og:image": opinionsMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
    };
  } catch (error) {
    console.error("Error fetching opinions metadata:", error);
  }

  return metadata;
}
