"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: Date;
    onDaysChange?: (days: number) => void;
}

export default function CountdownTimer({ targetDate, onDaysChange }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            };
        };

        // Initial calculation
        const initialTime = calculateTimeLeft();
        setTimeLeft(initialTime);
        if (onDaysChange) {
            onDaysChange(initialTime.days);
        }

        const timer = setInterval(() => {
            const updatedTime = calculateTimeLeft();
            setTimeLeft(updatedTime);
            if (onDaysChange) {
                onDaysChange(updatedTime.days);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onDaysChange]);

    if (!isMounted) {
        return null; // Avoid hydration mismatch
    }

    const timerUnits: Array<keyof TimeLeft> = ["days", "hours", "minutes", "seconds"];

    return (
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
    );
}
