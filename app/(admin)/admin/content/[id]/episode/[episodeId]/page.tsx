"use client";

import React, { useEffect, useState, use } from 'react';
import EpisodeForm from '@/components/admin/Episode/EpisodeForm';
import BlockManager from '@/components/admin/Content/BlockManager';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const EditEpisodePage = ({ params }: { params: Promise<{ id: string, episodeId: string }> }) => {
    const { id, episodeId } = use(params); // id = parentContentId, episodeId = episodeId
    const [episode, setEpisode] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/episodes/${episodeId}`)
            .then(res => res.json())
            .then(json => {
                if (json.success) setEpisode(json.data);
            })
            .finally(() => setLoading(false));
    }, [episodeId]);

    if (loading) return <div className="p-12 text-center text-gray-500">Loading episode...</div>;
    if (!episode) return <div className="p-12 text-center text-red-500">Episode not found</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link
                    href={`/admin/content/${id}`}
                    className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Series
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-100">Edit Episode {episode.episodeNumber}</h1>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono border ${episode.published ? 'border-green-800 text-green-400' : 'border-yellow-800 text-yellow-500'}`}>
                        {episode.published ? 'Published' : 'Draft'}
                    </span>
                </div>
            </div>

            <div className="space-y-12">
                <EpisodeForm parentContentId={id} initialData={episode} isEdit={true} />

                <div className="border-t border-gray-800 pt-8">
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Episode Content</h2>
                    <p className="text-gray-400 text-sm mb-6">Manage blocks for this episode.</p>

                    {/* Reuse BlockManager but point to Episode API logic? 
                         BlockManager uses `/api/content/${id}` by default. 
                         We need to make it flexible.
                      */}
                    <BlockManager
                        contentId={episode._id}
                        initialBlocks={episode.contentBlocks || []}
                        apiEndpoint="/api/episodes"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditEpisodePage;
