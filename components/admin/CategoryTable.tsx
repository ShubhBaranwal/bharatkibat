"use client";

import React from "react";
import Link from "next/link";
import { Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Category } from "@/types";

interface CategoryTableProps {
    categories: Category[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories }) => {
    const router = useRouter();

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete category");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting category");
        }
    };

    if (categories.length === 0) {
        return (
            <div className="text-center py-12 text-gray-400 bg-gray-900 rounded-lg">
                No categories found. Create one to get started.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-gray-900 rounded-lg shadow border border-gray-800">
            <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-800 text-gray-200 uppercase font-medium">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">UI Label</th>
                        <th className="px-6 py-4">Slug</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Priority</th>
                        <th className="px-6 py-4">Created At</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    {categories.map((category) => (
                        <tr key={category._id} className="hover:bg-gray-800/50 transition">
                            <td className="px-6 py-4 font-medium text-gray-100">
                                {category.name}
                                {category.description && (
                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{category.description}</p>
                                )}
                            </td>
                            <td className="px-6 py-4 text-gray-300">{category.uiLabel || category.name}</td>
                            <td className="px-6 py-4">{category.slug}</td>
                            <td className="px-6 py-4">
                                {category.isActive ? (
                                    <span className="flex items-center gap-1 text-green-400 text-xs px-2 py-1 bg-green-900/20 rounded-full w-fit">
                                        <CheckCircle size={12} /> Active
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-red-400 text-xs px-2 py-1 bg-red-900/20 rounded-full w-fit">
                                        <XCircle size={12} /> Inactive
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4">{category.priority}</td>
                            <td className="px-6 py-4">{category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}</td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-3">
                                    <Link
                                        href={`/admin/category/${category._id}`}
                                        className="text-blue-400 hover:text-blue-300 transition"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(category._id, category.name)}
                                        className="text-red-400 hover:text-red-300 transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
