import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import ScrollTop from "@/components/ScrollTop";
import Navbar from "@/components/Navbar";
import Toaster from "@/components/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bonjui | Home",
  description: "A personal website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar/>
          {children}
          <ScrollTop />
        </Providers>
        <Toaster/>
      </body>
    </html>
  );
}
