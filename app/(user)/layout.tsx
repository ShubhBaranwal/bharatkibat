import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/userComponents/Navbar";
import Header from "@/components/userComponents/Header";
import BiographyHeader from "@/components/userComponents/BiographyHeader";
import { Analytics } from "@vercel/analytics/next"


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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
                <Navbar />
                <Header />
                {/* <BiographyHeader /> */}
                {children}
                <Analytics />

            </body>
        </html>
    );
}