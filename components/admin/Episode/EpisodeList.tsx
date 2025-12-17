"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, GripVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface iEpisode {
    _id: string;
    episodeNumber: number;
    title: string;
    slug: string;
    published: boolean;
    views: number;
}

interface EpisodeListProps {
    parentContentId: string;
    episodes: string[]; // Array of IDs from parent
}

const EpisodeList: React.FC<EpisodeListProps> = ({ parentContentId, episodes }) => {
    const router = useRouter();
    const [episodeList, setEpisodeList] = useState<iEpisode[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch full episode details based on IDs or just fetch all episodes for this parent?
        // Better to fetch by parentContentId if API supports it, or individual fetches (slow).
        // Let's assume we can fetch all episodes for this parent. 
        // We didn't explicitly make a "Get Episodes by Parent" API, but we can usually filter by parentContentId logic if we added it to GET /api/episodes? 
        // Or we can just populate them in the Parent Content GET request.
        // CHECK: Content GET populate? 
        // The Content Model has `episodes` array of IDs. 
        // The /api/content/[id] route currently only populates categoryId. 
        // Let's fetch them individually for now or better, update Content API to populate? 
        // Updating Content API is cleaner. 
        // BUT for now, let's just fetch them if we can. 
        // Actually, we can just use the ids to fetch? 

        // Alternative: Create a helper endpoint or just fetch each.
        // Let's implement a simple fetch loop for now to be safe without changing Content API too much yet.

        const fetchEpisodes = async () => {
            if (!episodes || episodes.length === 0) {
                setEpisodeList([]);
                setLoading(false);
                return;
            }

            try {
                // Fetch all episodes linked to this parent (more efficient than N requests)
                // But we don't have that route. 
                // Let's do N requests for now, N is usually small for seasons.
                const promises = episodes.map(id => fetch(`/api/episodes/${id}`).then(res => res.json()));
                const results = await Promise.all(promises);
                const validEpisodes = results
                    .filter(r => r.success)
                    .map(r => r.data)
                    .sort((a, b) => a.episodeNumber - b.episodeNumber);

                setEpisodeList(validEpisodes);
            } catch (err) {
                console.error("Error fetching episodes", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [episodes]);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (!confirm("Are you sure you want to delete this episode?")) return;

        try {
            const res = await fetch(`/api/episodes/${id}`, { method: "DELETE" });
            if (res.ok) {
                setEpisodeList(prev => prev.filter(ep => ep._id !== id));
                router.refresh();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mt-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                        <GripVertical className="text-gray-400" /> Episodes
                    </h3>
                    <p className="text-sm text-gray-400">Manage episodes for this series.</p>
                </div>
                <Link
                    href={`/admin/content/${parentContentId}/episode/create`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium transition"
                >
                    <Plus size={16} /> Add Episode
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-8 text-gray-500">Loading episodes...</div>
            ) : episodeList.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-800/50 rounded border border-gray-700 border-dashed">
                    No episodes found. Click "Add Episode" to start.
                </div>
            ) : (
                <div className="space-y-3">
                    {episodeList.map((ep) => (
                        <div key={ep._id} className="flex items-center justify-between p-4 bg-gray-800 rounded border border-gray-700 hover:border-gray-600 transition group">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300 font-bold text-sm">
                                    {ep.episodeNumber}
                                </span>
                                <div>
                                    <div className="font-medium text-gray-200">{ep.title}</div>
                                    <div className="text-xs text-gray-500 font-mono">{ep.slug}</div>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${ep.published ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                                    {ep.published ? 'Pub' : 'Draft'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/admin/content/${parentContentId}/episode/${ep._id}`}
                                    className="p-2 text-blue-400 hover:bg-blue-900/30 rounded"
                                >
                                    <Edit size={16} />
                                </Link>
                                <button
                                    onClick={(e) => handleDelete(ep._id, e)}
                                    className="p-2 text-red-400 hover:bg-red-900/30 rounded opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EpisodeList;
