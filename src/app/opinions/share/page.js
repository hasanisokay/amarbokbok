import NewOpinionForm from "@/components/NewOpinionForm";
import { opinionsMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";

const page = () => {
  return (
    <>
      <NewOpinionForm />
    </>
  );
};

export default page;
export async function generateMetadata() {
  const host = await hostname();
  let metadata = {
    title: `Share Your Opinion - ${websiteName}`,
    description: "আপনার মতামত বা যেকোন গঠনমূলক মন্তব্য শেয়ার করুন।",
    keywords: ["Opinions", "AmarBokBok opinions", "Ahmmad Robin's Blog","মতামত","আমার বকবক", "Feedback"],
    canonical: `${host}/opinions/share`, 
    url: `${host}/opinions/share`,
  };

  try {
    metadata.other = {
      "twitter:image": opinionsMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `Share Your Opinion - ${websiteName}`,
      "twitter:description": metadata.description,
      "og:title": `Share Your Opinion - ${websiteName}`,
      "og:description": metadata.description,
      "og:url": `${host}/opinions/share`,
      "og:image": opinionsMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
      "og:locale": "bn_BD",
    };
  } catch (error) {
    console.error("Error fetching opinion sharing metadata:", error);
  }

  return metadata;
}
