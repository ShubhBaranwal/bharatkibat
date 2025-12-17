"use client";

import React from 'react';
import ContentForm from '@/components/admin/Content/ContentForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CreateContentPage = () => {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/content"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Content
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Create New Content</h1>
                <p className="text-gray-400 text-sm mt-1">Start by filling out the basic details. You can add content blocks in the next step.</p>
            </div>

            <ContentForm />
        </div>
    );
};

export default CreateContentPage;
