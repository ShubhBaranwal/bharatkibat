"use client";

import React, { useEffect, useState, use } from 'react';
import ContentForm from '@/components/admin/Content/ContentForm';
import BlockManager from '@/components/admin/Content/BlockManager';
import EpisodeList from '@/components/admin/Episode/EpisodeList';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const EditContentPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params);
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/content/${id}`)
            .then(res => res.json())
            .then(json => {
                if (json.success) setContent(json.data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-12 text-center text-gray-500">Loading...</div>;
    if (!content) return <div className="p-12 text-center text-red-500">Content not found</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/content"
                    className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Content
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-100">Edit Content</h1>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono border ${content.published ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-500'}`}>
                        {content.published ? 'Published' : 'Draft'}
                    </span>
                </div>
            </div>

            <div className="space-y-12">
                <ContentForm initialData={content} isEdit={true} />

                <div className="border-t border-gray-800 pt-8">
                    {content.type === 'episode' ? (
                        <>
                            <h2 className="text-2xl font-bold text-gray-100 mb-2">Series Management</h2>
                            <p className="text-gray-400 text-sm mb-6">Manage episodes for this series.</p>
                            <EpisodeList parentContentId={content._id} episodes={content.episodes || []} />
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-gray-100 mb-2">Content Blocks</h2>
                            <p className="text-gray-400 text-sm mb-6">Manage the actual content (paragraphs, images, etc).</p>
                            <BlockManager
                                contentId={content._id}
                                initialBlocks={content.contentBlocks || []}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditContentPage;
