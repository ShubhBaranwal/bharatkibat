"use client";
import { Category } from "@/app/lib/categoryTypes";
import { categoryService } from "@/app/services/categoryService";
import React, { useEffect, useState } from "react";

interface AllCategoryProps {
  setUpdateValue: (value: Category | null) => void;
}

const AllCategory: React.FC<AllCategoryProps> = ({ setUpdateValue }) => {

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const deleteCategory = async (id: string) => {
    console.log(id)
  if (!confirm("Are you sure you want to delete this category?")) return;
  
  setLoading(true);

  try {
    const res = await categoryService.remove({ id });
    console.log("DELETE RESPONSE:", res);

    alert("Category deleted!");

    await loadCategories(); // refresh list
  } catch (err) {
    console.error(err);
    alert((err as Error).message);
  }

  setLoading(false);
};


  const loadCategories = async () => {
    setLoading(true);

    try {
      const res = await categoryService.list(); // FIXED → fully typed automatically
      console.log("API FULL RESPONSE:", res.data);

      setCategories(res.data); // No type error
    } catch (err) {
      console.error("Error loading categories:", err);
      alert((err as Error).message);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Categories</h1>

      {loading && <p>Loading...</p>}

      {!loading && categories.length === 0 && <p>No categories found.</p>}

     {!loading && categories.length > 0 && (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-900 text-white">
          <th className="p-3 border">Name</th>
          <th className="p-3 border">Description</th>
          <th className="p-3 border">Slug</th>
          <th className="p-3 border">Priority</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {categories.map((cat) => (
          <tr
            key={cat._id}
            className="border bg-black text-white hover:bg-gray-800 transition"
          >
            <td className="p-3 border">{cat.name}</td>
            <td className="p-3 border">{cat.description}</td>
            <td className="p-3 border">{cat.slug}</td>
            <td className="p-3 border">{cat.priority}</td>

            {/* Action Buttons */}
            <td className="p-3 border">
              <div className="flex gap-3">
                <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-xs"
                onClick={() => setUpdateValue(cat)} 
                >
                  Edit
                </button>
                <button 
                onClick={() => deleteCategory(cat._id)}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-xs">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

    </div>
  );
};

export default AllCategory;
