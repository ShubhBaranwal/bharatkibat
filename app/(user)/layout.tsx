import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/userComponents/Navbar";
import Header from "@/components/userComponents/Header";
import BiographyHeader from "@/components/userComponents/BiographyHeader";
import { Analytics } from "@vercel/analytics/next"
import Footer from "@/components/userComponents/Footer";

import Script from "next/script";

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
            <head>
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
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2792598202487179"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <Navbar />
                <Header />
                {/* <BiographyHeader /> */}
                {children}
                <Analytics />
                <Footer />
            </body>
        </html>
    );
}

// G-0JNR5V1ZGY   mesid
// Stream ID
// 13169858694