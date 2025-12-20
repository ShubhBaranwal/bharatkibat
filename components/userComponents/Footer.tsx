export default function Footer() {
    return (
        <footer
            className="mt-12 border-t"
            style={{
                backgroundColor: "var(--dark-blue)",
                borderColor: "var(--dark-red)",
                color: "var(--white)",
            }}
        >
            <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                {/* Logo + Description */}
                <div className="text-center sm:text-left">
                    <h2
                        className="text-lg font-semibold"
                        style={{ color: "var(--light-red)" }}
                    >
                        Bharat Ki Baat
                    </h2>
                    <p className="text-xs mt-1 max-w-md">
                        Bharat Ki Baat एक स्वतंत्र हिंदी न्यूज़ प्लेटफ़ॉर्म है, जहाँ
                        राजनीति, समाज और देश से जुड़ी खबरें तथ्यात्मक और सरल भाषा में
                        प्रस्तुत की जाती हैं।
                    </p>
                </div>

                {/* SEO + AdSense Important Links */}
                <nav
                    aria-label="Footer Navigation"
                    className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm"
                >
                    <a href="/about-us" className="hover:underline">
                        About Us
                    </a>
                    <a href="/contact-us" className="hover:underline">
                        Contact Us
                    </a>
                    <a href="/privacy-policy" className="hover:underline">
                        Privacy Policy
                    </a>
                    <a href="/terms-and-conditions" className="hover:underline">
                        Terms
                    </a>
                    <a href="/disclaimer" className="hover:underline">
                        Disclaimer
                    </a>
                </nav>
            </div>

            {/* Bottom copyright */}
            <div
                className="text-center text-xs py-2"
                style={{ backgroundColor: "var(--dark-red)" }}
            >
                © {new Date().getFullYear()} Bharat Ki Baat · All Rights Reserved
            </div>
        </footer>
    );
}
