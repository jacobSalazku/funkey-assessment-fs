"use client";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { toastStyling } from "@/features/toast-notification/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategory } from "../actions/create-category";
import { CategoryData, newCategorySchema } from "../zod";

type CategoryFormProps = {
  onClose: () => void;
};

const CategoryModal: FC<CategoryFormProps> = ({ onClose }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryData>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {},
  });

  const onSubmit = async (data: CategoryData) => {
    try {
      await createCategory(data);

      toast.success("Category created successfully!", {
        position: "top-right",
        ...toastStyling,
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl bg-white text-black shadow-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Create New Category</h2>
          <Button variant="outline" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            id="title"
            aria-label="Category title"
            label="Category title"
            type="text"
            variant="light"
            placeholder="Enter category title"
            {...register("title")}
            error={errors.title}
            errorMessage={errors.title?.message}
          />
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Optional description"
              rows={4}
              {...register("description")}
              className="w-full rounded-md border text-black border-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
            />
          </div>

          {errors && (
            <p className="text-sm text-red-600">
              {errors.description?.message}
            </p>
          )}
          <div className="flex justify-end pt-4">
            <Button
              aria-label="Create Category"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Category..." : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
