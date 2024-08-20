import "./globals.css";
import Providers from "@/providers/Providers";
import Navbar from "@/components/Navbar";
import Toaster from "@/components/Toaster";
import { hostname } from "@/constants/hostname.mjs";
import { websiteName } from "@/constants/constants.mjs";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return {
    title: `${websiteName} - Home`,
    description: "A personal website.",
    publisher: "Ahmmad Robin",
    authors: [
      { name: "Ahmmad Robin", url: `${await hostname()}` },
      {
        name: "Ahmmad Robin",
        url: "https://web.facebook.com/bonjuiofficial",
      },
    ],
    keywords: ["Personal Website", "Blogs", "Jharfuk", "Ahmmad Robins Blogs"],
    other: {
      // todos: change the image links
      "color-scheme": ["dark", "light"],
      "twitter:image": "https://i.ibb.co/89yqcW8/home-page.jpg",
      "twitter:card": "summary_large_image",
      "og-url": `${await hostname()}`,
      "og:image": "https://i.ibb.co/89yqcW8/home-page.jpg",
      "og:type": "website",
      locale: "en_US",
    },
    image: "https://i.ibb.co/89yqcW8/home-page.jpg",
    url: `${await hostname()}`,
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
    <html lang="en" className="" >
      <body className="transition-colors">
        <Providers>
          <header className="min-h-[60px]">
            <Navbar />
          </header>
          <main className="min-h-[calc(100vh-100px)]">{children}</main>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
