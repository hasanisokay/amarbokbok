import "./globals.css";
import Providers from "@/providers/Providers";
import Navbar from "@/components/Navbar";
import Toaster from "@/components/Toaster";
import { hostname } from "@/constants/hostname.mjs";
import { homeMetaImage, websiteName } from "@/constants/constants.mjs";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const UserTracker = dynamic(() =>import("@/components/UserTracker"), { ssr: false });
// const inter = Inter({ subsets: ["latin"] });
export async function generateMetadata() {
  const host = await hostname();
  return {
    title: `${websiteName} - Home`,
    description: "Welcome to Ahmmad Robin's personal website. Explore insightful blogs, discover curated content, and stay updated with the latest from Ahmmad Robin.",
    publisher: "Ahmmad Robin",
    authors: [
      { name: "Ahmmad Robin", url: `${host}` },
      {
        name: "Ahmmad Robin",
        url: "https://web.facebook.com/bonjuiofficial",
      },
    ],
    keywords: ["Personal Website", "Blogs", "Jharfuk", "Ahmmad Robin's Blogs"],
    other: {
      "color-scheme": ["dark", "light"],
      "twitter:image": homeMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:description":
        "Explore Ahmmad Robin's personal website featuring insightful blogs, curated content, and more.",
      "og:title": `Home - ${websiteName}`,
      "og:url": `${host}`,
      "og:image": homeMetaImage,
      "og:description":
        "Visit Ahmmad Robin's personal website for blogs, curated content, and the latest updates.",
      "og:type": "website",
      "og:site_name": websiteName,
      locale: "en_US",
    },
    image: homeMetaImage,
    url: `${host}`,
  };
}


export const viewport = {
  width: "device-width",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#4c4c4c" },
    { media: "(prefers-color-scheme: light)", color: "#f5f4f069" },
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="transition-colors">
        <Providers>
          <header className="min-h-[60px]">
            <Navbar />
          </header>
          <main className="min-h-[calc(100vh-100px)]">{children}</main>
          <Footer />
          <UserTracker />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
