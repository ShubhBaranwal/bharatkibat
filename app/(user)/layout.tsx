import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import Navbar from "@/components/userComponents/Navbar";
import Header from "@/components/userComponents/Header";
import Footer from "@/components/userComponents/Footer";
import { Analytics } from "@vercel/analytics/next";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ AdSense Account Verification (SAFE & REQUIRED) */}
        <meta
          name="google-adsense-account"
          content="ca-pub-2792598202487179"
        />

        {/* ✅ Google Analytics GA4 (USE next/script) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JNR5V1ZGY"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0JNR5V1ZGY');
          `}
        </Script>

        {/* ✅ Google AdSense (RAW SCRIPT – WARNING FIXED) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2792598202487179"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <Header />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
