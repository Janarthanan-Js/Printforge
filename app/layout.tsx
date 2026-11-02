import type { Metadata } from "next";
import "./globals.css";
import { Albert_Sans, Montserrat_Alternates } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { RootLayoutProps } from "./types";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "PrintForge | Discover 3D Printing Models",
    template: "%s | PrintForge",
  },
  description:
    "Discover, search and share community-made 3D printing models. A library of STL files for makers, designers and hobbyists.",
  keywords: ["3D printing", "3D models", "STL files", "maker", "PrintForge"],
  openGraph: {
    type: "website",
    siteName: "PrintForge",
    title: "PrintForge | Discover 3D Printing Models",
    description:
      "Discover, search and share community-made 3D printing models.",
    images: [{ url: "/printforge.png", width: 500, height: 500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PrintForge | Discover 3D Printing Models",
    description:
      "Discover, search and share community-made 3D printing models.",
    images: ["/printforge.png"],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${albertSans.className} ${montserratAlternates.variable} antialiased text-gray-900 bg-white`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
