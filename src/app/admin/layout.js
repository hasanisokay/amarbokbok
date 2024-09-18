import AdminSelectionBar from "@/components/AdminSelectionBar";
import { websiteName } from "@/constants/constants.mjs";
import { hostname } from "@/constants/hostname.mjs";
// import ReplyModal from "@/modal/ReplyModal";

const adminLayout = ({ children }) => {
  return (
    <>
      <AdminSelectionBar />
      {children}
    </>
  );
};

export default adminLayout;

export async function generateMetadata() {
  const host = await hostname()
  return {
    title: `${websiteName} - Admin`,
    authors: [
      { name: "Ahmmad Robin", url: `${host}` },
      {
        name: "Ahmmad Robin",
        url: "https://web.facebook.com/bonjuiofficial",
      },
    ],
    keywords: ["Personal Website", "Admin", "Blogs", "Jharfuk"],
    other: {
      // todos: change the image links
      "og-url": `${host}/admin`,
      "og:type": "website",
      "og:locale": "bn_BD",
    },
    canonical: `${host}/admin`, 
    url: `${host}/admin`,
  };
}
