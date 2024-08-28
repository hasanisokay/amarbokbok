import { opinionsMetaImage } from "@/constants/constants.mjs";

const page = () => {
    return (
        <div>
            share
        </div>
    );
};

export default page;

export async function generateMetadata() {
    const host = await hostname();
    let metadata = {
      title: `Share Your Opinion - ${websiteName}`,
      description: "Opinion sharing page",
      keywords: ["Opinions", "Share Opinion", "Bonjui Blog", "Ahmmad Robins Blog"],
      url: `${host}/opinions/share`,
    };
  
    try {
      metadata.other = {
        "twitter:image": opinionsMetaImage,
        "twitter:card": "summary_large_image",
        "og-title": "Opinions - Blog",
        "og-description": "Share your opinion about this site.",
        "og-url": `${host}/opinions/share`,
        "og:image": opinionsMetaImage,
      };
    } catch (error) {
      console.error("Error fetching blog metadata:", error);
    }
  
    return metadata;
  }
  