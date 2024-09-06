"use server";
import AudioPage from "@/components/AudioPage";
import NotFound from "@/components/NotFound";
import { audioMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
import getOthers from "@/utils/getOthers.mjs";

const page = async ({ searchParams }) => {
  const sort = searchParams?.sort || "newest";
  const page = parseInt(searchParams?.page) || 1;
  const limit = searchParams.limit || 10;
  const keyword = searchParams.keyword || "";
  let audios;
  try {
    audios = await getOthers("audio", page, limit, sort, keyword);
  } catch (error) {
    audios = null;
  }
  if (
    audios?.status === 500 ||
    audios?.status === 400 ||
    audios?.status === 404 ||
    !audios ||
    audios?.error
  )
    return <NotFound />;
  return (
    <>
      {audios?.others?.length > 0 ? (
        <AudioPage
          audios={audios?.others}
          totalCount={audios?.totalCount}
          limit={limit}
          page={page}
          sort={sort}
        />
      ) : (
        <p className="text-center mt-10 font-semibold">No audio found.</p>
      )}
    </>
  );
};

export default page;




export async function generateMetadata() {
  const host = await hostname();
  let metadata = {
    title: `Audio - ${websiteName}`,
    description: "Explore a curated collection of audios with detailed descriptions.",
    keywords: ["Audio", "AmarBokBok_Audio", "Ahmmad Robins Blog", "Music", "Podcasts"],
    url: `${host}/others`,
  };

  try {
    metadata.other = {
      "twitter:image": audioMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `Audio - ${websiteName}`,
      "twitter:description":
        "Discover recommended audios along with detailed descriptions to help you choose what to listen to.",
      "og:title": `Audio - ${websiteName}`,
      "og:description":
        "Check out my recommended audios with in-depth descriptions. Get insights into each audio selection.",
      "og:url": `${host}/others`,
      "og:image": audioMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return metadata;
}