"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import logo from "@/public/final logo fom website.png";

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.success) {
                setError("Invalid username or password");
                setIsLoading(false);
                return;
            }

            // SUCCESS → check role
            const role = data.user?.role;

            if (role === "admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-black flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="flex flex-col items-center">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold">
                        Sign in to your account
                    </h2>
                    <p className="text-sm text-gray-600">
                        Or{" "}
                        <Link href="/" className="text-indigo-600 font-medium">
                            return to home
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            id="identifier"
                            name="identifier"
                            type="text"
                            label="Email or Username"
                            required
                            placeholder="Enter your email or username"
                            value={formData.identifier}
                            onChange={handleChange}
                        />

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <Button type="submit" isLoading={isLoading} className="w-full">
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}
