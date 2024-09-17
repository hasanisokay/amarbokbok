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
    description: "দরকারী অডিওগুলো পাবেন এখানে। অডিওর সাথে সংক্ষেপে পরিচিতি এবং ডাউনলোড লিংক থাকবে।",
    keywords: ["Audio", "AmarBokBok Audio", "অডিও","আমার বকবক", ],
    url: `${host}/others`,
    canonical: `${host}/others`, 
  };

  try {
    metadata.other = {
      "twitter:image": audioMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `Audio - ${websiteName}`,
      "twitter:description":
"দরকারী অডিওগুলো পাবেন এখানে। অডিওর সাথে সংক্ষেপে পরিচিতি এবং ডাউনলোড লিংক থাকবে।",
      "og:title": `Audio - ${websiteName}`,
      "og:description":
"দরকারী অডিওগুলো পাবেন এখানে। অডিওর সাথে সংক্ষেপে পরিচিতি এবং ডাউনলোড লিংক থাকবে।",
      "og:url": `${host}/others`,
      "og:image": audioMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
      "og:locale": "bn_BD",
    };
  } catch (error) {
    console.error("Error fetching blog metadata:", error);
  }

  return metadata;
}