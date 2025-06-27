"use client";

import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { deleteStyling } from "@/features/toast-notification/styling";
import { Category } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCategory } from "../actions/delete-category";

const CategoryList = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);

      toast.error("Category deleted successfully", {
        icon: <Trash2Icon />,
        position: "top-right",
        ...deleteStyling,
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <ol className="flex flex-col justify-center gap-4 max-h-[700px] overflow-y-hidden w-full items-center text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
      {categories.map((category) => (
        <li key={category.id} className="mb-2 w-full">
          <div className="flex items-center justify-between w-full border-neutral-100 border py-6 px-4 rounded-lg">
            {category.title}
            <div className="flex items-center gap-4 justify-center">
              <Link
                aria-label="View activity details"
                href={{
                  pathname: `/categories/${category.id}`,
                }}
              >
                View details
              </Link>
              <Button
                aria-label="Delete Category"
                variant="danger"
                size="sm"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2Icon size={20} />
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default CategoryList;
