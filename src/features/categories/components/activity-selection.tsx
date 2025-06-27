import { Badge } from "@/components/badge";
import { Activity } from "@prisma/client";
import { X } from "lucide-react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { EditCategoryData } from "../zod";

type ActivitySelectionProps = {
  activities: Activity[];
  setValue: UseFormSetValue<EditCategoryData>;
  watch: UseFormWatch<EditCategoryData>;
};

export const ActivitySelection = ({
  activities,
  setValue,
  watch,
}: ActivitySelectionProps) => {
  const activitiesSelectionOptions = watch("activityIds") || [];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId && !activitiesSelectionOptions?.includes(selectedId)) {
      setValue("activityIds", [
        ...(activitiesSelectionOptions ?? []),
        selectedId,
      ]);
    }
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white text-left">Categories</h2>

      <div className="flex flex-wrap gap-4 mb-2">
        {activitiesSelectionOptions.map((actId) => {
          const category = activities.find((a) => a?.id === actId);
          if (!category) return null;

          return (
            <Badge
              color="transparent"
              key={actId}
              label={category.title}
              className="gap-1"
            >
              <button
                type="button"
                className="cursor-pointer"
                onClick={() =>
                  setValue(
                    "activityIds",
                    activitiesSelectionOptions.filter((id) => id !== actId),
                  )
                }
              >
                <X size={16} />
              </button>
            </Badge>
          );
        })}
      </div>

      <select
        className="px-4 py-2 mt-4 rounded-md border border-gray-700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={handleCategoryChange}
      >
        <option value="">Select category</option>
        {activities
          .filter((a) => a && !activitiesSelectionOptions?.includes(a.id))
          .map((act) => (
            <option key={act?.id} value={act?.id}>
              {act?.title}
            </option>
          ))}
      </select>
    </div>
  );
};
