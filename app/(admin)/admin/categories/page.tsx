"use client";
// import CategoryManager from "@/app/components/adminComponents/CategoryManager";
import AllCategory from "@/app/components/adminComponents/AllCategory";
import CategoryCreateForm from "@/app/components/adminComponents/CategoryCreateForm";

import { useState } from "react";
import {Category} from "@/app/lib/categoryTypes"

export default function CategoriesPage() {
const [updateValue, setUpdateValue] = useState<Category | null>(null);

 console.log(updateValue);
 

  return (
    <div className=" overflow-x-hidden ms-[15.2%] bg-red-400  min-h-screen text-white ">
      <CategoryCreateForm  updateValue={updateValue}
        setUpdateValue={setUpdateValue} />

      <AllCategory  setUpdateValue={setUpdateValue}/>
    </div>
  );
}
