"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";

// Define Validation Schema
const contentSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    type: z.enum(["news", "biography", "story", "episode"]),
    categoryId: z.string().min(1, "Category is required"),
    author: z.string().optional(),
    coverImage: z.string().optional(),
    published: z.boolean().optional(),
    tags: z.string().optional(), // Handled as comma-sep string in form
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.string().optional(),
        ogImage: z.string().optional(),
    }).optional(),
});

type ContentFormData = z.infer<typeof contentSchema>;

import { Category } from "@/types";

interface ContentFormProps {
    initialData?: any;
    isEdit?: boolean;
}

const ContentForm: React.FC<ContentFormProps> = ({ initialData, isEdit = false }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ContentFormData>({
        resolver: zodResolver(contentSchema) as any,
        defaultValues: initialData ? {
            ...initialData,
            tags: initialData.tags?.join(", ") || "",
            meta: {
                ...initialData.meta,
                keywords: initialData.meta?.keywords?.join(", ") || "",
            }
        } : {
            type: "news",
            published: false,
            author: "Admin",
            tags: "",
        },
    });

    // Fetch Categories on Mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const json = await res.json();
                if (json.success) setCategories(json.data);
            } catch (err) {

            }
        };
        fetchCategories();
    }, []);

    // Auto-generate slug from title
    const titleValue = watch("title");
    useEffect(() => {
        if (!isEdit && titleValue) {
            const slug = slugify(titleValue, { lower: true, strict: true });
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [titleValue, isEdit, setValue]);

    const typeValue = watch("type");

    const onSubmit = async (data: ContentFormData) => {
        setLoading(true);
        setError("");

        try {
            // Transform tags/keywords string back to array
            const payload = {
                ...data,
                tags: data.tags ? (data.tags as string).split(",").map(k => k.trim()).filter(k => k) : [],
                meta: {
                    ...data.meta,
                    keywords: data.meta?.keywords
                        ? (data.meta.keywords as string).split(",").map(k => k.trim()).filter(k => k)
                        : [],
                }
            };

            const url = isEdit ? `/api/content/${initialData._id}` : "/api/content";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                if (Array.isArray(result.error)) {
                    throw new Error(result.error.map((e: { message: string }) => e.message).join(", "));
                }
                throw new Error(result.error || "Something went wrong");
            }

            // Redirect logic: 
            // - If Create: Go to Edit page to add blocks
            // - If Edit: updates saved, stay or refresh? Maybe stay to continue editing blocks
            if (!isEdit) {
                router.push(`/admin/content/${result.data._id}`); // Go to Edit to add blocks
            } else {
                router.refresh();
                // Show success toast? For now just silent refresh or maybe a message
                alert("Content updated successfully!");
            }

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    // Dynamic Labels
    const isSeries = typeValue === 'episode';
    const labelTitle = isSeries ? "Series Title" : "Article Headline";
    const buttonText = isEdit
        ? "Update Basic Info"
        : isSeries ? "Create Series & Add Episodes" : "Create & Add Blocks";

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
                        <label className="block text-sm font-medium mb-1">{labelTitle} *</label>
                        <input
                            {...register("title")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Article Headline"
                        />
                        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Slug *</label>
                        <input
                            {...register("slug")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                            placeholder="url-slug"
                        />
                        {errors.slug && <p className="text-red-400 text-sm mt-1">{errors.slug.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Type *</label>
                            <select
                                {...register("type")}
                                className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="news">News Article</option>
                                <option value="biography">Biography</option>
                                <option value="story">Story</option>
                                <option value="episode">Series (Collection of Episodes)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category *</label>
                            {categories.length === 0 ? (
                                <div className="text-sm text-gray-500">
                                    No categories found. <Link href="/admin/category/create" className="text-blue-400 hover:underline">Create one</Link> first.
                                </div>
                            ) : (
                                <select
                                    {...register("categoryId")}
                                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(c => (
                                        <option key={c._id} value={c._id}>{c.uiLabel || c.name}</option>
                                    ))}
                                </select>
                            )}
                            {errors.categoryId && <p className="text-red-400 text-sm mt-1">{errors.categoryId.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Author</label>
                        <input
                            {...register("author")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                        <input
                            {...register("coverImage")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                        <input
                            {...register("tags")}
                            className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="world, politics, breaking"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            {...register("published")}
                            className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium">Published (Visible on site)</label>
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
                    href="/admin/content"
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
                    {buttonText}
                </button>
            </div>
        </form>
    );
};

export default ContentForm;
