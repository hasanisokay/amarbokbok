import AudioList from "@/components/AudioList";
import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import SuspenseFallback from "@/components/SuspenseFallback";
import { pdfMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import getOthers from "@/utils/getOthers.mjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const SelectInBlogs = dynamic(() => import("@/components/SelectInBlogs"), {
  ssr: false,
});

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
    description:
      "প্রয়োজনীয় এবং উপকারী পিডিএফগুলো এখানে আছে। সাথে ডাউনলোড লিংকও থাকবে।",
    keywords: [
      "PDF",
      "Documents",
      "AmarBokBok_PDF",
      "প্রয়োজনীয় পিডিএফ",
      "আমার বকবক পিডিএফ",
      "পিডিএফ",
    ],
    url: `${host}/others/pdf`,
    canonical: `${host}/others/pdf`,
  };

  try {
    metadata.other = {
      "twitter:image": pdfMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `PDFs - ${websiteName}`,
      "twitter:description":
        "প্রয়োজনীয় এবং উপকারী পিডিএফগুলো এখানে আছে। সাথে ডাউনলোড লিংকও থাকবে।",
      "og:title": `PDFs - ${websiteName}`,
      "og:description":
       "প্রয়োজনীয় এবং উপকারী পিডিএফগুলো এখানে আছে। সাথে ডাউনলোড লিংকও থাকবে।",
      "og:url": `${host}/others/pdf`,
      "og:image": pdfMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
      "og:locale": "bn_BD",
    };
  } catch (error) {
    console.error("Error fetching PDF metadata:", error);
  }
  return metadata;
}
