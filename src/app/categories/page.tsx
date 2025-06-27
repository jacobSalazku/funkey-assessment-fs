import Aside from "@/components/sidebar";
import { getAllCategories } from "@/features/categories/actions/get-categories";
import CategoryList from "@/features/categories/components/category-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="max-w-7xl mx-auto min-h-screen p-8 flex flex-col justify-center items-center gap-16">
      <div className="flex flex-row w-full gap-20 min-h-screen justify-center items-center">
        <div className="w-2/3 min-h-[800px] h-full space-y-8">
          <h1 className="text-3xl font-bold">Categories</h1>
          {categories.length > 0 ? (
            <CategoryList categories={categories} />
          ) : (
            <div>
              <p className="text-gray-500">
                No categories found. Please create a new category.
              </p>
            </div>
          )}
        </div>
        <Aside />
      </div>
    </main>
  );
}
