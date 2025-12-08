"use client";

import { useState, useEffect, JSX } from "react";

export default function DateTime(): JSX.Element {
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      // Format: Wed, 20 Nov 2025 • 10:51 AM
      const formatted = now
        .toLocaleString("en-IN", options)
        .replace(",", "")
        .replace(",", " •");

      setDateTime(formatted);
    };

    updateTime(); // initial render

    // Update every minute (fast + efficient)
    const interval = setInterval(updateTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className="font-bold">{dateTime}</span>;
}
