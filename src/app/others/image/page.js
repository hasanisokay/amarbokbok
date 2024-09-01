import ImageList from "@/components/ImageList";
import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import SuspenseFallback from "@/components/SuspenseFallback";
import { imageMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import getOthers from "@/utils/getOthers.mjs";
import dynamic from "next/dynamic";
import { Suspense } from "react";


const SelectInBlogs = dynamic(() =>import("@/components/SelectInBlogs"), { ssr: false });

const page = async ({ searchParams }) => {
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;
  const sort = searchParams?.sort || "newest";
  const keyword = searchParams?.keyword || "";
  let images = [];

  try {
    images = await getOthers("image", page, limit, sort, keyword);
  } catch (error) {
    images = null;
  }
  if (
    images?.status === 500 ||
    images?.status === 400 ||
    images?.status === 404 ||
    !images ||
    images?.error
  ) {
    return <NotFound />;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, images?.totalCount);
  return (
    <Suspense fallback={<SuspenseFallback />}>
      {images?.others?.length > 0 ? (
        <section>
          <p className="my-1 ml-[20px]">
            Showing {start} - {end} of {images?.totalCount}
          </p>
          <div className="ml-[20px]">
            <SelectInBlogs sort={sort} limit={limit} page={page} />
          </div>
          <ImageList images={images?.others} />
          {images?.totalCount > limit && (
            <Pagination
              currentPage={page}
              total={images?.totalCount}
              limit={limit}
            />
          )}
        </section>
      ) : (
        <p className="text-center mt-10 font-semibold">No image found.</p>
      )}
    </Suspense>
  );
};
export default page;

export async function generateMetadata() {
  const host = await hostname();
  let metadata = {
    title: `Images - ${websiteName}`,
    description: "Browse a curated gallery of images with detailed descriptions and recommendations.",
    keywords: ["Images", "Gallery", "Bonjui Blog", "Ahmmad Robin's Blog", "Photography", "Art"],
    url: `${host}/others/image`,
  };

  try {
    metadata.other = {
      "twitter:image": imageMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `Images - ${websiteName}`,
      "twitter:description":
        "Explore a handpicked gallery of images with detailed descriptions and recommendations.",
      "og:title": `Images - ${websiteName}`,
      "og:description":
        "Browse a collection of curated images with in-depth descriptions. Discover art, photography, and more.",
      "og:url": `${host}/others/image`,
      "og:image": imageMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
    };
  } catch (error) {
    console.error("Error fetching image metadata:", error);
  }
  return metadata;
}
