"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

interface ContentItem {
    _id: string;
    title: string;
    slug: string;
    type: string;
    categoryId: { name: string; uiLabel?: string };
    published: boolean;
    views: number;
    createdAt: string;
}

const ContentPage = () => {
    const router = useRouter();
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'articles' | 'series'>('all');

    useEffect(() => {
        fetch('/api/content', { cache: 'no-store' })
            .then(res => res.json())
            .then(json => {
                if (json.success) setContents(json.data);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const filteredContents = contents.filter(c => {
        if (activeTab === 'all') return true;
        if (activeTab === 'series') return c.type === 'episode';
        return c.type !== 'episode';
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this content?")) return;
        try {
            const res = await fetch(`/api/content/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setContents(prev => prev.filter(c => c._id !== id));
                router.refresh();
            }
        } catch (error) {

        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-100">Content Management</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage standard articles and video series.</p>
                </div>
                <Link
                    href="/admin/content/create"
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition shadow-lg shadow-blue-900/20"
                >
                    <Plus size={18} />
                    Create New
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-800">
                <button
                    onClick={() => setActiveTab('all')}
                    className={`pb-3 px-1 text-sm font-medium transition relative ${activeTab === 'all' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    All Content
                    {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>}
                </button>
                <button
                    onClick={() => setActiveTab('articles')}
                    className={`pb-3 px-1 text-sm font-medium transition relative ${activeTab === 'articles' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    Articles
                    {activeTab === 'articles' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>}
                </button>
                <button
                    onClick={() => setActiveTab('series')}
                    className={`pb-3 px-1 text-sm font-medium transition relative ${activeTab === 'series' ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
                >
                    Series
                    {activeTab === 'series' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
            ) : (
                <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-gray-400 text-sm uppercase">
                                <th className="p-4 font-medium">Title</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Category</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {filteredContents.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">No content found in this tab.</td>
                                </tr>
                            ) : (
                                filteredContents.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-800/50 transition">
                                        <td className="p-4">
                                            <div className="font-medium text-gray-200">{item.title}</div>
                                            <div className="text-xs text-gray-500 font-mono">{item.slug}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs capitalize border ${item.type === 'episode' ? 'bg-purple-900/30 text-purple-400 border-purple-800' : 'bg-gray-800 text-gray-300 border-gray-700'}`}>
                                                {item.type === 'episode' ? 'Series' : item.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm">
                                            {item.categoryId?.uiLabel || item.categoryId?.name || "Uncategorized"}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${item.published ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'}`}>
                                                {item.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="p-4 flex items-center justify-end gap-2">
                                            <Link href={`/admin/content/${item._id}`} className="p-2 text-blue-400 hover:bg-blue-900/30 rounded transition">
                                                <Edit size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(item._id)} className="p-2 text-red-400 hover:bg-red-900/30 rounded transition">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ContentPage;
