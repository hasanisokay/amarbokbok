import AudioList from "@/components/AudioList";
import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import SelectInBlogs from "@/components/SelectInBlogs";
import SuspenseFallback from "@/components/SuspenseFallback";
import { pdfMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import getOthers from "@/utils/getOthers.mjs";
import { Suspense } from "react";

const pdfPage = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  const keyword = searchParams?.keyword || "";
  let pdf = [];

  try {
    pdf = await getOthers("pdf", page, limit, sort, keyword);
  } catch (error) {
    pdf = null;
  }
  if (
    pdf?.status === 500 ||
    pdf?.status === 400 ||
    pdf?.status === 404 ||
    !pdf ||
    pdf?.error
  ) {
    return <NotFound />;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, pdf?.totalCount);
  return (
    <Suspense fallback={<SuspenseFallback />}>
      {pdf?.others?.length > 0 ? (
        <section>
          <p className="my-1 ml-[20px]">
            Showing {start} - {end} of {pdf?.totalCount}
          </p>
          <div className="ml-[20px]">
            <SelectInBlogs sort={sort} limit={limit} page={page} />
          </div>
          <AudioList audios={pdf?.others} />
          {pdf?.totalCount > limit && (
            <Pagination
              currentPage={page}
              total={pdf?.totalCount}
              limit={limit}
            />
          )}
        </section>
      ) : (
        <p className="text-center mt-10 font-semibold">No pdf found.</p>
      )}
    </Suspense>
  );
};
export default pdfPage;

export async function generateMetadata() {
  const host = await hostname();
  let metadata = {
    title: `PDFs - ${websiteName}`,
    description: "Access a collection of PDFs with detailed descriptions and useful resources.",
    keywords: ["PDF", "Documents", "Bonjui Blog", "Ahmmad Robin's Blog", "Educational PDFs", "Resources"],
    url: `${host}/others/pdf`,
  };

  try {
    metadata.other = {
      "twitter:image": pdfMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `PDFs - ${websiteName}`,
      "twitter:description":
        "Browse a curated selection of PDFs with detailed descriptions and valuable resources.",
      "og:title": `PDFs - ${websiteName}`,
      "og:description":
        "Explore a collection of useful PDFs with comprehensive descriptions and resources.",
      "og:url": `${host}/others/pdf`,
      "og:image": pdfMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
    };
  } catch (error) {
    console.error("Error fetching PDF metadata:", error);
  }
  return metadata;
}
