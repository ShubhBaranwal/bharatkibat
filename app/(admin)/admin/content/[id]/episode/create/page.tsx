"use client";

import React, { use } from 'react';
import EpisodeForm from '@/components/admin/Episode/EpisodeForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CreateEpisodePage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params); // Parent Content ID

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="mb-6">
                <Link
                    href={`/admin/content/${id}`}
                    className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Series
                </Link>
                <h1 className="text-3xl font-bold text-gray-100">Add New Episode</h1>
                <p className="text-gray-400 text-sm mt-1">Add an episode to this series.</p>
            </div>

            <EpisodeForm parentContentId={id} />
        </div>
    );
};

export default CreateEpisodePage;
