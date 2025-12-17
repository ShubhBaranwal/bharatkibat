"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/types";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";

// Define Validation Schema
const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    uiLabel: z.string().min(1, "UI Label is required"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().optional(),
    icon: z.string().optional(),
    priority: z.coerce.number().optional(),
    isActive: z.boolean().optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.string().optional(),
        ogImage: z.string().optional(),
    }).optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;



interface CategoryFormProps {
    initialData?: Category;
    isEdit?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, isEdit = false }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema) as any,
        defaultValues: initialData ? {
            ...initialData,
            uiLabel: initialData.uiLabel || initialData.name || "",
            meta: {
                ...initialData.meta,
                keywords: Array.isArray(initialData.meta?.keywords)
                    ? initialData.meta.keywords.join(", ")
                    : (initialData.meta?.keywords as string) || "",
            }
        } : {
            isActive: true,
            priority: 0,
            slug: "",
        },
    });

    // Auto-generate slug from name if not in edit mode or slug is empty
    const nameValue = watch("name");
    useEffect(() => {
        if (!isEdit && nameValue) {
            const slug = slugify(nameValue, { lower: true, strict: true });
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [nameValue, isEdit, setValue]);

    const onSubmit = async (data: CategoryFormData) => {
        setLoading(true);
        setError("");

        try {
            // Transform keywords string back to array
            const payload = {
                ...data,
                meta: {
                    ...data.meta,
                    keywords: data.meta?.keywords
                        ? (data.meta.keywords as string).split(",").map(k => k.trim()).filter(k => k)
                        : [],
                }
            };

            const url = isEdit && initialData?._id ? `/api/categories/${initialData._id}` : "/api/categories";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                // Handle ZodValidation or generic errors
                if (Array.isArray(result.error)) {
                    throw new Error(result.error.map((e: { message: string }) => e.message).join(", "));
                }
                throw new Error(result.error || "Something went wrong");
            }

            router.push("/admin/category");
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-gray-900 p-6 rounded-lg text-gray-100">
            {error && (
                <div className="bg-red-500/10 border border-red-500 p-3 rounded text-red-500">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">Basic Info</h3>

                    <div>
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input
                            {...register("name")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Technology"
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">UI Label *</label>
                        <input
                            {...register("uiLabel")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Tech News"
                        />
                        {errors.uiLabel && <p className="text-red-400 text-sm mt-1">{errors.uiLabel.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Slug *</label>
                        <input
                            {...register("slug")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                            placeholder="e.g. technology"
                        />
                        {errors.slug && <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>}
                        <p className="text-xs text-gray-500 mt-1">Unique identifier for URL. Auto-generated from name.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            {...register("description")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                            placeholder="Category description..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Icon (Lucide Name)</label>
                            <input
                                {...register("icon")}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Cpu"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Priority</label>
                            <input
                                type="number"
                                {...register("priority")}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register("isActive")}
                            className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium">Active (Visible)</label>
                    </div>
                </div>

                {/* SEO Info */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">SEO Settings</h3>

                    <div>
                        <label className="block text-sm font-medium mb-1">Meta Title</label>
                        <input
                            {...register("meta.title")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="SEO Title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Meta Description</label>
                        <textarea
                            {...register("meta.description")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none h-24"
                            placeholder="SEO Description..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
                        <input
                            {...register("meta.keywords")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="news, tech, updates"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">OG Image URL</label>
                        <input
                            {...register("meta.ogImage")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-800">
                <Link
                    href="/admin/category"
                    className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition"
                >
                    <X size={16} /> Cancel
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 transition font-medium disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    {isEdit ? "Update Category" : "Create Category"}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
