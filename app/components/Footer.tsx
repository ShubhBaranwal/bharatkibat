"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="w-full text-white mt-10"
      style={{ backgroundColor: "var(--dark-blue)" }}
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-12">

        {/* Brand */}
        <div>
          <h2
            className="text-2xl font-semibold mb-3"
            style={{ color: "var(--light-red)" }}
            itemProp="name"
          >
            भारत की बात
          </h2>
          <p className="text-sm opacity-80 leading-relaxed" itemProp="description">
            भारत की बात — एक नया डिजिटल न्यूज़ प्लेटफ़ॉर्म जहाँ आप पाएँगे
            ट्रेंडिंग न्यूज़, बायोग्राफ़ी, वायरल अपडेट और चुनावी कवरेज।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="/" className="hover:text-[var(--light-red)]">Home</Link></li>
            <li><Link href="/news" className="hover:text-[var(--light-red)]">Latest News</Link></li>
            <li><Link href="/biography" className="hover:text-[var(--light-red)]">Biographies</Link></li>
            <li><Link href="/trending" className="hover:text-[var(--light-red)]">Trending</Link></li>
            <li><Link href="/viral" className="hover:text-[var(--light-red)]">Viral</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="/category/national" className="hover:text-[var(--light-red)]">National News</Link></li>
            <li><Link href="/category/local" className="hover:text-[var(--light-red)]">Local News</Link></li>
            <li><Link href="/category/election" className="hover:text-[var(--light-red)]">Elections</Link></li>
            <li><Link href="/category/education" className="hover:text-[var(--light-red)]">Education</Link></li>
            <li><Link href="/category/viral" className="hover:text-[var(--light-red)]">Viral</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:text-[var(--light-red)]"
                itemProp="sameAs"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[var(--light-red)]"
                itemProp="sameAs"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[var(--light-red)]"
                itemProp="sameAs"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        className="text-center text-sm py-4 border-t border-gray-600"
        style={{ backgroundColor: "var(--shade-black)" }}
      >
        <p className="opacity-90">
          © {new Date().getFullYear()} भारत की बात — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
