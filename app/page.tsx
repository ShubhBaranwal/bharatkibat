"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import logo from "@/public/final logo fom website.png";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";

export default function Home() {
  // Target Date: December 15, 2025
  const targetDate = new Date("2025-12-16T00:00:00");
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  const handleDaysChange = useCallback((days: number) => {
    setDaysRemaining(days);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800 text-white px-6">
      <div className="text-center max-w-2xl w-full animate-fadeIn">

        {/* LOGO */}
        <Image
          src={logo}
          alt="Bharat Ki Bat Logo"
          width={160}
          height={160}
          className="object-contain shadow-xl m-auto drop-shadow-xl"
          priority
        />

        {/* Tagline */}
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-yellow-400">
          भारत की बात — आपकी आवाज़, आपका न्यूज़
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300">
          विश्वसनीय खबरें • निष्पक्ष विश्लेषण • राष्ट्र की धड़कन
        </p>

        {/* Countdown Timer */}
        <CountdownTimer targetDate={targetDate} onDaysChange={handleDaysChange} />

        {/* Hindi Info Section */}
        <div className="mt-10 text-gray-300 leading-relaxed">
          <p className="text-xl font-semibold text-yellow-300">
            हम {daysRemaining} दिनों में LIVE हो रहे हैं!
          </p>

          <p className="mt-3">
            <strong>Bharat Ki Bat</strong> एक ऐसा मंच है जहाँ आपको मिलेगी —
          </p>

          <ul className="mt-4 space-y-2 text-left mx-auto max-w-md">
            <li>🇮🇳 अद्यतन और सटीक खबरें</li>
            <li>📢 लोगों की असली आवाज़ और मुद्दे</li>
            <li>📰 बिना पक्षपात का विश्लेषण</li>
          </ul>
        </div>

        {/* Social Buttons */}
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4">

          {/* WhatsApp */}
          <Link
            href="https://whatsapp.com/channel/0029VbB5mdfBKfi8TlKgVU19"
            target="_blank"
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 rounded-full font-semibold shadow-lg"
          >
            💬 WhatsApp पर जुड़ें
          </Link>

          {/* Facebook */}
          <Link
            href="https://www.facebook.com/profile.php?id=61584098969969"
            target="_blank"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full font-semibold shadow-lg"
          >
            👍 Facebook पर Follow करें
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Bharat Ki Bat. सर्वाधिकार सुरक्षित।
        </p>
      </div>
    </main>
  );
}