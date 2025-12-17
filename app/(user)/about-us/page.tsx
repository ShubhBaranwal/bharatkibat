import { Metadata } from "next";
import Image from "next/image";
import logo from "@/public/final logo fom website.png";

export const metadata: Metadata = {
    title: "हमारे बारे में – भारत की बात | भरोसेमंद हिंदी न्यूज़ वेबसाइट",
    description:
        "भारत की बात एक स्वतंत्र हिंदी न्यूज़ पोर्टल है जो ब्रेकिंग न्यूज़, राजनीति, स्थानीय खबरें और ज़मीनी रिपोर्टिंग प्रस्तुत करता है।",
    alternates: {
        canonical: "https://bharatkibat.com/about-us",
    },
};

export default function AboutUsPage() {
    return (
        <main className="bg-[var(--white)] text-[var(--shade-black)]">
            {/* HERO */}
            <section className="bg-[var(--dark-blue)] text-[var(--white)]">
                <div className="max-w-6xl mx-auto px-4 py-7 sm:py-12 flex flex-col md:flex-row items-center gap-8">
                    {/* Logo Section */}
                    <div className="shrink-0  p-4 rounded-full backdrop-blur-sm">
                        <Image
                            src={logo}
                            alt="Bharat Ki Bat Logo"
                            width={120}
                            height={120}
                            className="object-contain drop-shadow-lg"
                            priority
                        />
                    </div>

                    {/* Text Section */}
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white mb-2">
                            हमारे बारे में
                        </h1>
                        <p className="text-sm sm:text-base max-w-2xl text-[var(--white)]/90">
                            भारत की बात — एक स्वतंत्र हिंदी न्यूज़ प्लेटफ़ॉर्म,
                            जो तथ्य और भरोसे को प्राथमिकता देता है।
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <article className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8">
                <p className="text-base sm:text-lg leading-relaxed">
                    <strong className="text-[var(--dark-red)]">
                        भारत की बात
                    </strong>{" "}
                    की शुरुआत इस सोच के साथ हुई कि पाठकों तक
                    सही, प्रमाणिक और ज़मीनी खबरें पहुँचाई जाएँ।
                    हमारे लिए खबर सिर्फ़ सूचना नहीं,
                    बल्कि समाज के प्रति जिम्मेदारी है।
                </p>

                <section>
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--dark-blue)] mb-2">
                        हमारा उद्देश्य
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                        <li>तेज़ लेकिन प्रमाणिक खबरें देना</li>
                        <li>फेक न्यूज़ और अफवाहों से दूरी</li>
                        <li>स्थानीय आवाज़ों को मंच देना</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--dark-blue)] mb-2">
                        हमारी संपादकीय सोच
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        भारत की बात में हर खबर प्रकाशित होने से पहले
                        तथ्यों की जाँच की जाती है।
                        हम आधिकारिक जानकारी, ज़मीनी रिपोर्टिंग
                        और विश्वसनीय स्रोतों पर भरोसा करते हैं।
                    </p>
                </section>

                <section>
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--dark-blue)] mb-2">
                        हम क्या कवर करते हैं
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                        <li>ब्रेकिंग न्यूज़ और ताज़ा अपडेट</li>
                        <li>राजनीति और प्रशासन</li>
                        <li>स्थानीय और ज़िला स्तर की खबरें</li>
                        <li>शिक्षा, स्वास्थ्य और समाज</li>
                        <li>मनोरंजन और विशेष रिपोर्ट</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--dark-blue)] mb-2">
                        पाठकों के प्रति हमारी जिम्मेदारी
                    </h2>
                    <p className="text-sm sm:text-base leading-relaxed">
                        हमारा लक्ष्य क्लिक बढ़ाना नहीं,
                        बल्कि भरोसा बनाना है।
                        निष्पक्ष और जिम्मेदार पत्रकारिता
                        भारत की बात की पहचान है।
                    </p>
                </section>

                <section>
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--dark-blue)] mb-2">
                        संपर्क करें
                    </h2>
                    <p className="text-sm sm:text-base">
                        आपके सुझाव और प्रतिक्रियाएँ हमारे लिए महत्वपूर्ण हैं।
                        आप हमसे सीधे संपर्क कर सकते हैं:
                    </p>
                    <p className="mt-1 text-sm sm:text-base">
                        📧{" "}
                        <a
                            href="mailto:bharatkibat9580@gmail.com"
                            className="text-[var(--light-red)] font-medium hover:underline"
                        >
                            bharatkibat9580@gmail.com
                        </a>
                    </p>
                </section>
            </article>

            {/* FOOTER STRIP */}
            <footer className="bg-[var(--dark-red)] text-[var(--white)] text-center py-5 text-sm sm:text-base font-medium">
                भारत की बात – सच के साथ, जिम्मेदारी के साथ
            </footer>
        </main>
    );
}
