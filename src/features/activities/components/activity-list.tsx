"use client";

import { Category } from "@/features/categories/actions/get-category";
import CategoryFilter from "@/features/categories/components/categories-filter";
import { deleteStyling } from "@/features/toast-notification/styling";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deleteActivity } from "../actions/delete-activity";
import { Activity } from "../actions/get-activity";
import { ActivityListItem } from "./activity-item";

type ListProps = {
  activities: Activity[];
  categories: Category[];
};

const ActivityList = ({ activities, categories }: ListProps) => {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteActivity(id);

      toast.error("Activity deleted successfully", {
        icon: <Trash2Icon />,
        position: "top-right",
        ...deleteStyling,
      });

      router.refresh();
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  const filteredActivities = !selectedCategoryId
    ? activities
    : activities.filter(
        (activity) =>
          Array.isArray(activity?.category) &&
          activity.category.some((cat) => cat.id === selectedCategoryId),
      );

  return (
    <>
      <CategoryFilter
        categories={categories}
        onSelect={handleCategorySelect}
        selectedCategoryId={selectedCategoryId ?? undefined}
      />
      <ul className="flex flex-col justify-start gap-4 h-[700px] overflow-y-auto w-full items-center text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivityListItem
              key={activity?.id}
              activity={activity}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="flex flex-col items-start w-full py-8">
            <p className="text-gray-500 text-left">
              No categories found. Please create a new category.
            </p>
          </div>
        )}
      </ul>
    </>
  );
};

export default ActivityList;
