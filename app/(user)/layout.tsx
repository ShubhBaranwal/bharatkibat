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
  metadataBase: new URL("https://www.bharatkibaat.com"),
  title: "Bharat Ki Baat – India's Latest News & Biographies",
  description:
    "Bharat Ki Baat brings verified Hindi news, politics updates, biographies, explainers and ground reports from India with trust and clarity.",
  openGraph: {
    type: "website",
    siteName: "Bharat Ki Baat",
    url: "https://www.bharatkibaat.com",
    images: [
      {
        url: "https://www.bharatkibaat.com/logo.png",
        width: 512,
        height: 512,
        alt: "Bharat Ki Baat Logo",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        {/* ✅ AdSense Account Verification (SAFE & REQUIRED) */}
        <meta property="og:site_name" content="Bharat Ki Baat" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="language" content="Hindi, English" />


        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Bharat Ki Baat",
              "alternateName": "भारत की बात",
              "url": "https://www.bharatkibaat.com",
              "logo": "https://www.bharatkibaat.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=61584098969969",
                "https://x.com/BatKi6140"
              ]
            })
          }}
        />

        <meta
          name="google-adsense-account"
          content="ca-pub-2792598202487179"
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://www.bharatkibaat.com" />


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
