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
  return {
    title: `${websiteName} - Admin`,
    authors: [
      { name: "Ahmmad Robin", url: `${await hostname()}` },
      {
        name: "Ahmmad Robin",
        url: "https://web.facebook.com/bonjuiofficial",
      },
    ],
    keywords: ["Personal Website", "Admin", "Blogs", "Jharfuk"],
    other: {
      // todos: change the image links
      "og-url": `${await hostname()}/admin`,
      "og:type": "website",
      locale: "en_US",
    },
    url: `${await hostname()}/admin`,
  };
}
