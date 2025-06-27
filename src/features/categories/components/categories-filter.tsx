"use client";

import { Badge } from "@/components/badge";
import { cn } from "@/utils/tw-merge";
import { Category } from "../actions/get-category";

type CategoryFilterProps = {
  categories: Category[];
  onSelect: (categoryId: string) => void;
  selectedCategoryId?: string | null;
};

const CategoryFilter = ({
  categories,
  onSelect,
  selectedCategoryId,
}: CategoryFilterProps) => {
  return (
    <div className="mb-2 max-w-full flex flex-row gap-2 py-4">
      {categories.map((category) => (
        <button
          key={category?.id}
          onClick={() => category?.id && onSelect(category.id)}
          className={cn(
            selectedCategoryId === category?.id ? "opacity-100" : "opacity-60",
            "cursor-pointer",
          )}
          aria-label={`Filter by category ${category?.title}`}
          type="button"
        >
          <Badge label={category?.title ?? ""} />
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
