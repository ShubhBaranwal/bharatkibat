"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import CategoryTable from '@/components/admin/CategoryTable';

// Define the shape of our data
import { Category } from "@/types";

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories', { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch categories');
            const json = await res.json();
            if (json.success) {
                setCategories(json.data);
            } else {
                setError(json.error || "Unknown error");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-100">Categories</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage news sections and content organization.</p>
                </div>
                <Link
                    href="/admin/category/create"
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition shadow-lg shadow-blue-900/20"
                >
                    <Plus size={18} />
                    Add New Category
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64 text-gray-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-2"></div>
                    Loading categories...
                </div>
            ) : error ? (
                <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-200">
                    Error: {error}
                </div>
            ) : (
                <CategoryTable categories={categories} />
            )}
        </div>
    );
};

export default CategoryPage;
