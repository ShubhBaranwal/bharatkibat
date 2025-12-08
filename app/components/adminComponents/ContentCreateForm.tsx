"use client";

import { useEffect, useState } from "react";
import { contentService } from "@/app/services/contentService";
import { useRouter } from "next/navigation";

interface Content {
  _id?: string;
  title: string;
  slug: string;
  type: string;
  categoryId: string;
  author: string;
  coverImage: string;
  tags: string[];
  meta: any;
  published: boolean;
  contentBlocks: any[];
}

interface Props {
  updateValue: Content | null;
  setUpdateValue: React.Dispatch<React.SetStateAction<Content | null>>;
}

export default function ContentCreateForm({ updateValue, setUpdateValue }: Props) {
  const router = useRouter();

  const defaultForm: Content = {
    title: updateValue?.title || "",
    slug: updateValue?.slug || "",
    type: updateValue?.type || "news",
    categoryId: updateValue?.categoryId || "",
    author: updateValue?.author || "Admin",
    coverImage: updateValue?.coverImage || "",
    tags: updateValue?.tags || [],
    meta: updateValue?.meta || {},
    published: updateValue?.published || false,
    contentBlocks: updateValue?.contentBlocks || [],
  };

  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  // For input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // For tags (comma separated)
  const handleTags = (e: any) => {
    setForm((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((t: string) => t.trim()),
    }));
  };

  // CREATE CONTENT
  const createContent = async () => {
    setLoading(true);
    try {
      const res = await contentService.create(form);
      console.log("CONTENT CREATED:", res);
      alert("Content created!");
      router.refresh();
      window.location.reload();
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  // UPDATE CONTENT
  const updateContent = async () => {
    if (!updateValue) return;

    setLoading(true);
    try {
      await contentService.update({ id: updateValue._id }, form);

      alert("Content updated!");

      setUpdateValue(null);
      setForm(defaultForm);

      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl space-y-4 border p-4 rounded bg-gray-100">
      <h2 className="text-xl font-bold">
        {updateValue ? "Update Content" : "Create Content"}
      </h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="slug"
        placeholder="Slug"
        value={form.slug}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="type"
        placeholder="Type (news/blog/article)"
        value={form.type}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="categoryId"
        placeholder="Category ID"
        value={form.categoryId}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="coverImage"
        placeholder="Cover image URL"
        value={form.coverImage}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        placeholder="Tags (comma separated)"
        value={form.tags.join(", ")}
        onChange={handleTags}
        className="border p-2 w-full"
      />

      <textarea
        name="meta"
        placeholder="Meta JSON"
        value={JSON.stringify(form.meta)}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, meta: JSON.parse(e.target.value) }))
        }
        className="border p-2 w-full"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, published: e.target.checked }))
          }
        />
        <span>Published</span>
      </label>

      {/* Submit Button */}
      <button
        onClick={updateValue ? updateContent : createContent}
        disabled={loading}
        className={`px-4 py-2 rounded w-full text-white ${
          updateValue ? "bg-blue-600" : "bg-green-600"
        }`}
      >
        {loading
          ? updateValue
            ? "Updating..."
            : "Creating..."
          : updateValue
          ? "Update Content"
          : "Create Content"}
      </button>
    </div>
  );
}
