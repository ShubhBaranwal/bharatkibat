"use client";

import React, { useEffect, useState, use } from 'react';
import CategoryForm from '@/components/admin/CategoryForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Category } from "@/types";

const EditCategoryPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch(`/api/categories/${id}`);
                const json = await res.json();

                if (json.success) {
                    setCategory(json.data);
                } else {
                    setError(json.error || "Failed to load category");
                }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCategory();
    }, [id]);

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center h-screen text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
                Loading category data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-200">
                    {error}
                </div>
                <Link href="/admin/category" className="mt-4 inline-block text-blue-400 hover:underline">
                    &larr; Back to Categories
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/category"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Categories
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-100">Edit Category</h1>
                    <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs font-mono border border-blue-800">
                        {category?.slug}
                    </span>
                </div>
            </div>

            <CategoryForm initialData={category} isEdit={true} />
        </div>
    );
};

export default EditCategoryPage;
