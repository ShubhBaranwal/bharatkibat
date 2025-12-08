import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import TopSocialMediaHeader from "../components/TopSocialMediaHeader";
import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharat Ki Baat – India's Latest News & Biographies",
};

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TopSocialMediaHeader />
        <HeaderNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
