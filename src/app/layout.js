import "./globals.css";
import Providers from "@/providers/Providers";
import { GoogleAnalytics } from '@next/third-parties/google'
import Navbar from "@/components/Navbar";
import Toaster from "@/components/Toaster";
import { hostname } from "@/constants/hostname.mjs";
import { homeMetaImage, websiteName } from "@/constants/constants.mjs";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import getThemeCookie from "@/utils/getThemeCookie.mjs";
// const kalpurush = localFont({
//   src: '@/../../../public/font/kalpurush.ttf',
//   display: 'swap',
// })

const UserTracker = dynamic(() => import("@/components/UserTracker"), {
  ssr: false,
});

export default async function RootLayout({ children }) {
  let storedTheme = await getThemeCookie();
  const themeColor = storedTheme === "dark" ? "#121212" : "#bfcfb4";
  return (
    <html lang="en" data-theme={storedTheme || "light"}>
      <head>
        <meta name="theme-color" content={themeColor} />
        <link rel="apple-touch-icon" sizes="180x180" href="./../../public/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="./../../public/android-chrome-512x512.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="./../../public/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./../../public/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="./../../public/favicon-16x16.png" />
        <link rel="manifest" href="./../../public/site.webmanifest" />
      </head>
      <body className="transition-colors">
        <Providers initialTheme={storedTheme}>
          <header className="min-h-[60px]">
            <Navbar />
          </header>
          <main className="min-h-[calc(100vh-100px)]">{children}</main>
          <Footer />
          <UserTracker />
        </Providers>
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}

export async function generateMetadata() {
  const host = await hostname();
  return {
    title: `${websiteName} - Home`,
    description:
      "আহম্মাদ রবিনের ব্যক্তিগত ওয়েবসাইটে আপনাকে স্বাগতম। ব্লগগুলি অন্বেষণ করুন, নির্বাচিত বিষয়বস্তু খুঁজে নিন এবং আহম্মাদ রবিনের সর্বশেষ আপডেটের সাথে থাকুন।",
    publisher: "Ahmmad Robin",
    authors: [
      { name: "Ahmmad Robin", url: `${host}` },
      {
        name: "Ahmmad Robin",
        url: "https://web.facebook.com/bonjuiofficial",
      },
    ],
    keywords: [
      "আহমাদ রবিনের বকবক",
      "ব্লগ",
      "ঝাড়ফুঁক",
      "আমার বকবক",
      "আহমাদ রবিন",
    ],
    other: {
      "color-scheme": ["dark", "light"],
      "twitter:image": homeMetaImage,
      "twitter:card": "summary_large_image",
      "twitter:description":
        "আহমাদ রবিনের ব্যক্তিগত ওয়েবসাইট আমার বকবক এ ব্লগ, নির্বাচিত বিষয়বস্তু এবং আরও অনেক কিছু আবিষ্কার করুন।",
      "og:title": `Home - ${websiteName}`,
      "og:url": `${host}`,
      "og:image": homeMetaImage,
      "og:description":
        "আহমাদ রবিনের ব্যক্তিগত ওয়েবসাইট আমার বকবক এ ব্লগ, নির্বাচিত বিষয়বস্তু এবং সর্বশেষ আপডেটগুলি পান।",
      "og:type": "website",
      "og:site_name": websiteName,
      "og:locale": "bn_BD",
    },
    image: homeMetaImage,
    canonical: `${host}`,
    url: `${host}`,
    charset: "UTF-8",
    robots: "index, follow",

    httpEquiv: {
      "Content-Security-Policy":
        "default-src 'self'; img-src https: data:; script-src 'self'; style-src 'self' 'unsafe-inline';",
    },
    // Favicon and Apple touch icon
  };
}

export const viewport = {
  width: "device-width",
  // themeColor: [
  //   { media: "(prefers-color-scheme: dark)", color: "#121212" },
  //   { media: "(prefers-color-scheme: light)", color: "#bfcfb4" },
  // ],
};
