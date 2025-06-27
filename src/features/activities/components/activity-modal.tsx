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
import { createActivity } from "../actions/create-activity";
import { ActivityData, activitySchema } from "../zod";

type ActivityFormProps = {
  onClose: () => void;
};

const ActivityModal: FC<ActivityFormProps> = ({ onClose }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityData>({ resolver: zodResolver(activitySchema) });

  const onSubmit = async (data: ActivityData) => {
    try {
      await createActivity(data);

      toast.success("Activity created successfully!", {
        position: "top-right",
        ...toastStyling,
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-xl bg-white text-black shadow-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Create New Activity</h2>
          <Button variant="outline" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <Input
            id="title"
            aria-label="Activity title"
            label="Activity title"
            type="text"
            variant="light"
            placeholder="Enter activity title"
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
              aria-label="Activity Description"
              placeholder="Enter activity description"
              rows={4}
              {...register("description")}
              className="w-full rounded-md border bg-white text-black border-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
            />
          </div>
          {errors && (
            <p className="text-sm text-red-600">
              {errors.description?.message}
            </p>
          )}
          <div className="flex justify-end pt-4 ">
            <Button
              aria-label="Create Category"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Activity..." : "Create Activity"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;
