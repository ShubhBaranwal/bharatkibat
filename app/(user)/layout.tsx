// app/(user)/layout.tsx
import "../globals.css";
import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
export const metadata: Metadata = {
  title: {
    default: "Bharat Ki Baat – Latest News, Breaking News, Trending",
    template: "%s | Bharat Ki Baat"
  },
  description:
    "Bharat Ki Baat – Latest India news, breaking news, politics, sports, entertainment, tech & trending stories.",
  keywords: [
    "India news",
    "Bharat news",
    "breaking news",
    "latest news",
    "hindi news"
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bharatkibat.com",
    siteName: "Bharat Ki Baat",
    title: "Bharat Ki Baat – Latest News",
    description:
      "Get the latest India news, breaking news, trends, politics, entertainment & more."
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Ki Baat – Latest News",
    description: "Daily updated Indian & world news."
  }
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>

   
    <html lang="en">
      <body>
        {/* HEADER */}
        <header className="w-full border-b bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Bharat Ki Baat</h1>
            <nav className="flex gap-6">
              <a href="/" className="hover:text-blue-600">Home</a>
              <a href="/news" className="hover:text-blue-600">News</a>
              <a href="/about" className="hover:text-blue-600">About</a>
              <a href="/contact" className="hover:text-blue-600">Contact</a>
            </nav>
          </div>
          <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </header>

        <main className="max-w-6xl mx-auto p-4">{children}</main>

        {/* FOOTER */}
        <footer className="mt-20 py-10 border-t bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} Bharat Ki Baat. All Rights Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
     </ClerkProvider>
  );
}
