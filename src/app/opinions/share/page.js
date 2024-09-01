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
    description: "Share your thoughts and opinions on this page. Contribute your insights and be part of the discussion.",
    keywords: [
      "Opinions",
      "Share Opinion",
      "Bonjui Blog",
      "Ahmmad Robin's Blog",
      "Feedback",
      "Community Discussion"
    ],
    url: `${host}/opinions/share`,
  };

  try {
    metadata.other = {
      "twitter:image": opinionsMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `Share Your Opinion - ${websiteName}`,
      "twitter:description": "Contribute your opinions and insights on this page. Join the discussion and share your feedback.",
      "og:title": `Share Your Opinion - ${websiteName}`,
      "og:description": "Join the conversation by sharing your thoughts. Your feedback is valuable to us.",
      "og:url": `${host}/opinions/share`,
      "og:image": opinionsMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
    };
  } catch (error) {
    console.error("Error fetching opinion sharing metadata:", error);
  }

  return metadata;
}
