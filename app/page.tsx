"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import logo from "@/public/final logo fom website.png";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 5);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = launchDate.getTime() - now;

      const updatedTime: TimeLeft = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };

      setTimeLeft(updatedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerUnits: Array<keyof TimeLeft> = [
    "days",
    "hours",
    "minutes",
    "seconds",
  ];

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
        <div className="mt-10 flex justify-center gap-4 md:gap-6 text-center">
          {timerUnits.map((unit) => (
            <div
              key={unit}
              className="bg-gray-800 rounded-xl px-4 py-3 w-20 md:w-24 shadow-xl"
            >
              <p className="text-3xl md:text-4xl font-bold text-yellow-400">
                {timeLeft[unit]}
              </p>
              <p className="text-xs md:text-sm uppercase tracking-wide text-gray-400">
                {unit}
              </p>
            </div>
          ))}
        </div>

        {/* Hindi Info Section */}
        <div className="mt-10 text-gray-300 leading-relaxed">
          <p className="text-xl font-semibold text-yellow-300">
            हम 5 दिनों में LIVE हो रहे हैं!
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