"use client";

import { useEffect, useState } from "react";
import { categoryService } from "@/app/services/categoryService";
import { useRouter } from "next/navigation";
import { Category } from "@/app/lib/categoryTypes";

interface CategoryCreateFormProps {
  updateValue: Category | null;
  setUpdateValue: React.Dispatch<React.SetStateAction<Category | null>>;
}

export default function CategoryCreateForm({
  updateValue,
  setUpdateValue,
}: CategoryCreateFormProps) {
  const router = useRouter();

  const defaultForm = {
    name: updateValue?.name || "",
    slug: updateValue?.slug || "",
    description: updateValue?.description || "",
    icon: updateValue?.icon || "Folder",
    priority: updateValue?.priority || 0,
  };

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (updateValue) {
      setForm(updateValue);
    }
  }, [updateValue]);

  const updateCategory = async () => {
    setLoading(true);

    try {
      if (!updateValue) return;

      // FIX: wrap id inside object
      await categoryService.update({ id: updateValue._id }, form);

      alert("Category updated!");

      setUpdateValue(null); // exit edit mode

      // reset form
      setForm({
        name: "",
        slug: "",
        description: "",
        icon: "Folder",
        priority: 0,
      });

      router.refresh();
    } catch (err) {
      alert((err as Error).message);
    }

    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createCategory = async () => {
    setLoading(true);
    try {
      const res = await categoryService.create(form);
      console.log("CATEGORY CREATED:", res);
      // alert("Category created!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    }
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="max-w-lg space-y-4 border bg-red-500 p-4 rounded">
      <h2 className="text-xl font-semibold">Create Category</h2>

      <input
        name="name"
        placeholder="Category Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="slug"
        placeholder="Slug (optional)"
        value={form.slug}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="icon"
        placeholder="Icon name (e.g., Folder, Flag)"
        value={form.icon}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        name="priority"
        type="number"
        value={form.priority}
        onChange={handleChange}
        className="border p-2 w-full"
      />

     <button
  onClick={updateValue ? updateCategory : createCategory}
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
    ? "Update Category"
    : "Create Category"}
</button>
    </div>
  );
}
