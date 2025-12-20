"use client";

import React, { useState } from "react";
import { Plus, Trash2, GripVertical, Image as ImageIcon, Type, Link as LinkIcon, Quote, ArrowUp, ArrowDown, Edit2, Save, X } from "lucide-react";
import { Loader2 } from "lucide-react";

interface Block {
    blockId?: string;
    type: "heading" | "paragraph" | "image" | "quote" | "list" | "embed";
    data: any;
}

interface BlockManagerProps {
    contentId: string;
    initialBlocks: Block[];
    apiEndpoint?: string; // e.g. "/api/episodes"
}

const BlockManager: React.FC<BlockManagerProps> = ({ contentId, initialBlocks, apiEndpoint = "/api/content" }) => {
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks || []);
    const [isAdding, setIsAdding] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [newBlockType, setNewBlockType] = useState<Block["type"]>("paragraph");
    const [newBlockData, setNewBlockData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    // Save Blocks to Server
    const saveBlocks = async (updatedBlocks: Block[]) => {
        try {
            const res = await fetch(`${apiEndpoint}/${contentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contentBlocks: updatedBlocks }),
            });

            const json = await res.json();
            if (json.success) {
                setBlocks(json.data.contentBlocks);
                return true;
            } else {

                alert(`Failed to save: ${JSON.stringify(json.error)}`);
                return false;
            }
        } catch (error) {

            alert("Error checking save: Network error");
            return false;
        }
    };

    // Add or Update Block
    const handleSaveBlock = async () => {
        if (!newBlockData) return;
        setLoading(true);

        const newBlock: Block = {
            type: newBlockType,
            data: newBlockData,
        };

        let updatedBlocks = [...blocks];
        if (editingIndex !== null) {
            // Update existing
            updatedBlocks[editingIndex] = newBlock;
        } else {
            // Add new
            updatedBlocks.push(newBlock);
        }

        const success = await saveBlocks(updatedBlocks);
        if (success) {
            resetForm();
        }
        setLoading(false);
    };

    const resetForm = () => {
        setIsAdding(false);
        setEditingIndex(null);
        setNewBlockData({});
        setNewBlockType("paragraph");
    };

    // Edit Start
    const handleEditBlock = (index: number) => {
        const block = blocks[index];
        setNewBlockType(block.type);
        setNewBlockData({ ...block.data }); // Clone to avoid direct ref
        setEditingIndex(index);
        setIsAdding(true);
        // Scroll to form?
        setTimeout(() => {
            document.getElementById("block-form")?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    // Move Block
    const handleMoveBlock = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === blocks.length - 1) return;

        const newBlocks = [...blocks];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        [newBlocks[index], newBlocks[swapIndex]] = [newBlocks[swapIndex], newBlocks[index]];

        // Optimistic UI
        setBlocks(newBlocks);
        await saveBlocks(newBlocks);
    };

    // Delete Block
    const handleDeleteBlock = async (index: number) => {
        if (!confirm("Delete this block?")) return;
        const updatedBlocks = blocks.filter((_, i) => i !== index);
        // Optimistic UI
        setBlocks(updatedBlocks);
        await saveBlocks(updatedBlocks);
    };

    // Render Input Fields based on Type
    const renderInput = () => {
        // Reuse same render logic, just ensure value binding matches newBlockData
        switch (newBlockType) {
            case "heading":
                return (
                    <input
                        className="w-full bg-gray-800 border border-gray-700 p-2 rounded text-xl font-bold mb-2"
                        placeholder="Enter Heading..."
                        value={newBlockData.text || ""}
                        onChange={(e) => setNewBlockData({ ...newBlockData, text: e.target.value, level: 2 })}
                    />
                );
            case "paragraph":
                return (
                    <textarea
                        className="w-full bg-gray-800 border border-gray-700 p-2 rounded h-24 mb-2"
                        placeholder="Type paragraph content..."
                        value={newBlockData.text || ""}
                        onChange={(e) => setNewBlockData({ ...newBlockData, text: e.target.value })}
                    />
                );
            case "quote":
                return (
                    <div className="space-y-2">
                        <textarea
                            className="w-full bg-gray-800 border border-gray-700 p-2 rounded h-20"
                            placeholder="Quote text..."
                            value={newBlockData.text || ""}
                            onChange={(e) => setNewBlockData({ ...newBlockData, text: e.target.value })}
                        />
                        <input
                            className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
                            placeholder="Author / Caption"
                            value={newBlockData.caption || ""}
                            onChange={(e) => setNewBlockData({ ...newBlockData, caption: e.target.value })}
                        />
                    </div>
                );
            case "image":
                return (
                    <div className="space-y-2">
                        <input
                            className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
                            placeholder="Image URL..."
                            value={newBlockData.url || ""}
                            onChange={(e) => setNewBlockData({ ...newBlockData, url: e.target.value })}
                        />
                        <input
                            className="w-full bg-gray-800 border border-gray-700 p-2 rounded"
                            placeholder="Caption (Alt Text)"
                            value={newBlockData.caption || ""}
                            onChange={(e) => setNewBlockData({ ...newBlockData, caption: e.target.value })}
                        />
                    </div>
                );
            default:
                return (
                    <textarea
                        className="w-full bg-gray-800 border border-gray-700 p-2 rounded h-24 mb-2"
                        placeholder="Content..."
                        value={newBlockData.text || ""}
                        onChange={(e) => setNewBlockData({ ...newBlockData, text: e.target.value })}
                    />
                );
        }
    };

    return (
        <div className="mt-8 bg-gray-900 p-6 rounded-lg text-gray-100">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-4 mb-4 flex items-center gap-2">
                <GripVertical className="text-gray-400" /> Content Blocks
            </h3>

            {/* Block List */}
            <div className="space-y-4 mb-8">
                {blocks.length === 0 && <p className="text-gray-500 italic">No blocks added yet.</p>}
                {blocks.map((block, index) => (
                    <div key={block.blockId || index} className={`group flex items-start gap-4 bg-gray-800 p-4 rounded border ${editingIndex === index ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-700 hover:border-gray-600'} transition`}>
                        <div className="flex flex-col gap-1 pt-1 opacity-50 group-hover:opacity-100 transition">
                            <button onClick={() => handleMoveBlock(index, 'up')} disabled={index === 0} className="hover:text-blue-400 disabled:opacity-20"><ArrowUp size={16} /></button>
                            <button onClick={() => handleMoveBlock(index, 'down')} disabled={index === blocks.length - 1} className="hover:text-blue-400 disabled:opacity-20"><ArrowDown size={16} /></button>
                        </div>

                        <span className="text-xs font-mono text-gray-500 uppercase mt-1 w-16">{block.type}</span>

                        <div className="flex-1">
                            {/* Simple Render Preview */}
                            {block.type === 'heading' && <h4 className="text-lg font-bold">{block.data.text}</h4>}
                            {block.type === 'paragraph' && <p className="text-gray-300">{block.data.text}</p>}
                            {block.type === 'image' && (
                                <div>
                                    <img src={block.data.url} alt={block.data.caption} className="max-h-48 rounded object-cover" />
                                    {block.data.caption && <p className="text-xs text-gray-400 mt-1">{block.data.caption}</p>}
                                </div>
                            )}
                            {block.type === 'quote' && (
                                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300">
                                    "{block.data.text}" <br />
                                    <span className="text-xs not-italic text-gray-500">- {block.data.caption}</span>
                                </blockquote>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                            <button
                                onClick={() => handleEditBlock(index)}
                                className="p-2 text-gray-400 hover:text-blue-400 rounded bg-gray-900/50"
                                title="Edit Block"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDeleteBlock(index)}
                                className="p-2 text-gray-400 hover:text-red-500 rounded bg-gray-900/50"
                                title="Delete Block"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Block Form */}
            {isAdding ? (
                <div id="block-form" className="bg-gray-800 p-4 rounded border border-blue-500/50 shadow-lg shadow-blue-500/10">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold uppercase text-blue-400">{editingIndex !== null ? 'Editing Block' : 'New Block'}</h4>
                        <div className="flex gap-2">
                            {["heading", "paragraph", "image", "quote"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => { if (t !== newBlockType) { setNewBlockType(t as any); setNewBlockData({}); } }}
                                    className={`px-3 py-1 rounded text-xs uppercase font-bold ${newBlockType === t ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {renderInput()}

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 rounded text-gray-400 hover:text-white flex items-center gap-2"
                        >
                            <X size={16} /> Cancel
                        </button>
                        <button
                            onClick={handleSaveBlock}
                            disabled={loading}
                            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 font-medium"
                        >
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            {editingIndex !== null ? "Update Block" : "Add Block"}
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-700 rounded text-gray-400 hover:border-blue-500 hover:text-blue-500 transition flex items-center justify-center gap-2"
                >
                    <Plus size={20} /> Add Content Block
                </button>
            )}
        </div>
    );
};

export default BlockManager;
