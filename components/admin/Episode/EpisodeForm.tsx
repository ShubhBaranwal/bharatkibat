"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, Save, X } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";

const episodeSchema = z.object({
    episodeNumber: z.coerce.number().min(1, "Number is required"),
    title: z.string().min(2, "Title is required"),
    slug: z.string().optional(),
    coverImage: z.string().optional(),
    published: z.boolean().optional(),
    tags: z.string().optional(),
    meta: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.string().optional(),
        ogImage: z.string().optional(),
    }).optional(),
});

type EpisodeFormData = z.infer<typeof episodeSchema>;

interface EpisodeFormProps {
    parentContentId: string;
    initialData?: any;
    isEdit?: boolean;
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({ parentContentId, initialData, isEdit = false }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EpisodeFormData>({
        resolver: zodResolver(episodeSchema) as any,
        defaultValues: initialData ? {
            ...initialData,
            tags: initialData.tags?.join(", ") || "",
            meta: {
                ...initialData.meta,
                keywords: initialData.meta?.keywords?.join(", ") || "",
            }
        } : {
            published: false,
            episodeNumber: 1,
            tags: "",
        },
    });

    const titleValue = watch("title");
    const numberValue = watch("episodeNumber");

    useEffect(() => {
        if (!isEdit && titleValue && numberValue) {
            const slug = slugify(`${numberValue}-${titleValue}`, { lower: true, strict: true });
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [titleValue, numberValue, isEdit, setValue]);

    const onSubmit = async (data: EpisodeFormData) => {
        setLoading(true);
        setError("");

        try {
            const payload = {
                ...data,
                parentContentId, // Important for Create
                tags: data.tags ? (data.tags as string).split(",").map(k => k.trim()).filter(k => k) : [],
                meta: {
                    ...data.meta,
                    keywords: data.meta?.keywords
                        ? (data.meta.keywords as string).split(",").map(k => k.trim()).filter(k => k)
                        : [],
                }
            };

            const url = isEdit ? `/api/episodes/${initialData._id}` : "/api/episodes";
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
                throw new Error(result.error || "Failed to save episode");
            }

            if (!isEdit) {
                // Redirect to edit mode (same as content) to add blocks? Or just back to parent?
                // Plan said: Create & Link -> then Manage. 
                // Let's go to Edit Page of this Episode so user can add blocks.
                router.push(`/admin/content/${parentContentId}/episode/${result.data._id}`);
            } else {
                router.refresh();
                alert("Episode saved!");
            }

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-900 p-6 rounded-lg text-gray-100">
            {error && (
                <div className="bg-red-900/20 border border-red-500 text-red-400 p-3 rounded">
                    {error}
                </div>
            )}

            <h3 className="text-lg font-semibold border-b border-gray-700 pb-2">
                {isEdit ? "Edit Episode Details" : "New Episode Details"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Episode #</label>
                    <input
                        type="number"
                        {...register("episodeNumber")}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.episodeNumber && <p className="text-red-400 text-sm mt-1">{errors.episodeNumber.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        {...register("title")}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                        {...register("slug")}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                    <input
                        {...register("coverImage")}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <input
                        {...register("tags")}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="comma, separated"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    {...register("published")}
                    className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-medium">Published (Visible)</label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <Link
                    href={`/admin/content/${parentContentId}`}
                    className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700 transition flex items-center gap-2"
                >
                    <X size={16} /> Cancel
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-500 transition font-medium flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    {isEdit ? "Update Episode" : "Create Episode"}
                </button>
            </div>
        </form>
    );
};

export default EpisodeForm;
