import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Link } from "@/components/link";
import { Textarea } from "@/components/textarea";
import { toastStyling } from "@/features/toast-notification/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { Activity } from "@prisma/client";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mode } from "../../../types";
import { Category } from "../actions/get-category";
import { updateCategory } from "../actions/update-category";
import { EditCategoryData, editCategorySchema } from "../zod";
import { ActivitySelection } from "./activity-selection";

type CategoryEditFormProps = {
  category: Category;
  setMode: (mode: Mode) => void;
  activities: Activity[];
};

export const CategoryEditForm = ({
  setMode,
  category,
  activities,
}: CategoryEditFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditCategoryData>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      title: category?.title,
      description: category?.description,
      activityIds: category?.activities?.map((cat) => cat.id),
      media: category?.media?.map((m) => ({
        title: m.title ?? "",
        url: m.url ?? "",
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const onSubmit = async (data: EditCategoryData) => {
    if (!category?.id) {
      console.error("Category ID is missing.");
      return;
    }

    try {
      await updateCategory(category.id, data);

      toast.success("Activity updated successfully!", {
        position: "top-right",
        ...toastStyling,
      });

      setMode("view");
      router.refresh();
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-start min-h-screen py-20 px-8"
    >
      <div className="w-full max-w-7xl mb-8 flex justify-start">
        <Link variant="link" size="sm" href={{ pathname: "/" }}>
          <ChevronLeft size={16} className="mr-2" />
          Go Back
        </Link>
      </div>

      <div className="max-w-7xl w-full max-h-screen bg-neutral-900 rounded-2xl shadow-lg lg:p-20 space-y-8">
        <div className="space-y-2">
          <Input
            id="title"
            aria-label="Category title"
            label="Category title"
            type="text"
            labelColor="light"
            placeholder="Enter category title"
            error={errors.title}
            errorMessage={errors.title?.message}
            {...register("title")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-white text-sm text-left block">
            Description
          </label>
          <Textarea
            id="description"
            aria-label="Activity Description"
            defaultValue={category?.description ?? ""}
            placeholder="Enter activity description"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <ActivitySelection
          activities={activities}
          setValue={setValue}
          watch={watch}
        />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white text-left">Media</h2>
          {fields.map((media, index) => (
            <div key={media.id} className="flex gap-2 items-center">
              <Input
                id={`media.${index}.title`}
                aria-label="Media title"
                type="text"
                placeholder="Title"
                {...register(`media.${index}.title`)}
              />
              <Input
                id={`media-${index}-url`}
                aria-label="Media URL"
                type="text"
                placeholder="URL"
                {...register(`media.${index}.url`)}
              />
              <button
                type="button"
                aria-label="Remove Media Item"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <Button
            variant="primary"
            aria-label="Add Media"
            type="button"
            onClick={() => append({ title: "", url: "" })}
          >
            <Plus size={16} /> Add Media
          </Button>
        </div>

        <div className="w-1/2 flex flex-row gap-4">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            aria-label="Update Category"
          >
            {isSubmitting ? "Updating Category..." : "Update Category"}
          </Button>
          <Button
            onClick={() => setMode("view")}
            variant="danger"
            size="lg"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
