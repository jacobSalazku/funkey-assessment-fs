"use client";

import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Mode } from "@/types";
import { Activity } from "@prisma/client";
import { ChevronLeft, Pencil } from "lucide-react";
import { useState } from "react";
import { Category } from "../actions/get-category";
import { CategoryEditForm } from "./category-edit";

const CategoryDetail = ({
  category,
  activities,
}: {
  category: Category;
  activities: Activity[];
}) => {
  const [mode, setMode] = useState<Mode>("view");

  const View = mode === "view";
  const Edit = mode === "edit";

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Category not found.</p>
      </div>
    );
  }
  return (
    <>
      {View && (
        <div className="flex flex-col items-center justify-start min-h-screen py-20 px-8 ">
          <div className="w-full max-w-7xl mb-8 flex justify-start">
            <Link variant="link" size="sm" href={{ pathname: "/categories" }}>
              <ChevronLeft size={16} className="mr-2" />
              Go Back
            </Link>
          </div>
          <div className="relative max-w-7xl w-full max-h-screen bg-neutral-900 rounded-2xl shadow-lg lg:p-20 space-y-8">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setMode("edit")}
              className="absolute top-4 right-4"
            >
              <Pencil size={16} />
            </Button>

            <h1 className="text-3xl font-bold text-white text-left">
              {category.title}
            </h1>

            <p className="text-gray-300 text-lg text-left">
              {category.description}
            </p>

            <div className="text-left space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Activities that are part of this Category
              </h2>

              {category.activities && category.activities.length > 0 ? (
                <div className="max-h-80 overflow-y-auto pr-2 space-y-2">
                  {category.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between w-full border border-gray-700 bg-neutral-800 py-4 px-4 rounded-lg hover:shadow transition"
                    >
                      <span className="text-white font-medium">
                        {activity.title}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No activities assigned.</p>
              )}
            </div>

            <div className="text-left space-y-4">
              <h2 className="text-xl font-semibold text-white">Media</h2>
              {category.media && category.media.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {category.media.map((mediaItem, index) => (
                    <a
                      key={index}
                      href={mediaItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
                    >
                      {mediaItem.title ?? `Media ${index + 1}`}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No media available.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {Edit && (
        <CategoryEditForm
          category={category}
          activities={activities}
          setMode={setMode}
        />
      )}
    </>
  );
};

export default CategoryDetail;
