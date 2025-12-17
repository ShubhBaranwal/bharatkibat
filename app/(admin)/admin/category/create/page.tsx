"use client";

import React from 'react';
import CategoryForm from '@/components/admin/CategoryForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CreateCategoryPage = () => {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/category"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Categories
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Create New Category</h1>
                <p className="text-gray-400 mt-1">Add a new section to your news website.</p>
            </div>

            <CategoryForm />
        </div>
    );
};

export default CreateCategoryPage;
