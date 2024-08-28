import { opinionsMetaImage } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";

const page = () => {
    return (
        <div>
opinion            
        </div>
    );
};

export default page;


export async function generateMetadata() {
    const host = await hostname();
    let metadata = {
      title: `Opinions - ${websiteName}`,
      description: "Opinions Page",
      keywords: ["Opinions", "Bonjui Blog", "Ahmmad Robins Blog"],
      url: `${host}/opinions`,
    };
  
    try {
      metadata.other = {
        // change the image links
        "twitter:image": opinionsMetaImage,
        "twitter:card": "summary_large_image",
        "og-title": "Opinions - Blog",
        "og-description": "Share your opinion and see what people saying about this site.",
        "og-url": `${host}/opinions`,
        "og:image": opinionsMetaImage,
      };
    } catch (error) {
      console.error("Error fetching blog metadata:", error);
    }
  
    return metadata;
  }
  