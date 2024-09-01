import ContactDetails from "@/components/ContactDetails";
import { aboutMetaImage, websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";

const AboutPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      <div className="space-y-2">
        <p>
          <strong>নামঃ</strong> আহমাদ রবীন
        </p>
        <p>
          <strong>পড়াশুনাঃ</strong> জেনারেল লাইনে। অন্যান্য কিছু বিষয়ে অফলাইন
          এবং অনলাইনে পড়াশুনা করেছেন।
        </p>
        <ContactDetails />
      </div>
      <div className="mt-6 space-y-4">
        <p>
          লেখালিখি করি শখের বসে। কিছু কিছু নিজের খেয়াল-খুশি মত। আর কিছু হয়ত
          গুরুত্বপূর্ণ লেখা। এই সাইটে অনলাইন জগতে লেখালেখির বেশিরভাগ অংশ
          প্রকাশিত হয়েছে। মনে রাখতে হবে এর মধ্যে কিছু লেখা অনেক আগের এবং মানহীন।
          আলাদা করে এখন যাচাই বাছাই করার ইচ্ছা এবং সময় কোনটাই নেই। সবই তুলে দেয়া
          হল।
        </p>
        <p>
          হানাফী ফিকহের অনুসারী এবং এই ব্যাপারে মানার দিক থেকে No Compromise.
          অন্যরা আক্রমণ না করলে ঘাটাতে পছন্দ করি না।
        </p>
        <p>
          বিবাহিত। বহুদিন ধরে রুকইয়াহ সাপোর্ট বিডি গ্রুপে কাজ করি। এর আগেও
          বিভিন্ন রকমের পেইজ/গ্রুপে কাজ করেছি। আপাতত আর কোনও তথ্য দিতে
          স্বাচ্ছন্দবোধ করছি না।
        </p>
      </div>
    </div>
  );
};

export default AboutPage;

export async function generateMetadata() {
  const host = await hostname();
  return {
    title: `About - ${websiteName}`,
    description: "Discover more about Ahmad Robin, including his background, education, and contact information. Learn about his journey and achievements.",
    keywords: [
      "Ahmad Robin",
      "About",
      "Biography",
      "Contact Information",
      "Education",
      "Personal Website",
      "Jharfuk"
    ],
    url: `${host}/about`,
    image: aboutMetaImage,
    other: {
      "twitter:image": aboutMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:title": `About - ${websiteName}`,
      "twitter:description": "Learn more about Ahmad Robin, including his biography, education, and how to get in touch.",
      "og:title": `About - ${websiteName}`,
      "og:description": "Explore Ahmad Robin's background, education, and contact details. Get to know the person behind the website.",
      "og:url": `${host}/about`,
      "og:image": aboutMetaImage,
      "og:type": "website",
      "og:site_name": websiteName,
      locale: "en_US",
    },
  };
}

