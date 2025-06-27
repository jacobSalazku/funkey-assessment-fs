"use client";

import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Mode } from "@/types";
import { Category } from "@prisma/client";
import { ChevronLeft, Pencil } from "lucide-react";
import { useState } from "react";
import { Activity } from "../actions/get-activity";
import { ActivityEditForm } from "./activity-edit";

const ActivityDetail = ({
  activity,
}: {
  activity: Activity;
  categories: Category[];
}) => {
  const [mode, setMode] = useState<Mode>("view");

  const Edit = mode === "edit";
  const View = mode === "view";

  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <>
      {View && (
        <div className="flex flex-col items-center justify-start min-h-screen py-20 px-8">
          <div className="w-full max-w-7xl mb-8 flex justify-start">
            <Link variant="link" size="sm" href={{ pathname: "/" }}>
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
              {activity.title}
            </h1>
            <p className="text-gray-300 text-lg text-left">
              {activity.description}
            </p>
            <div className="text-left space-y-4">
              <h2 className="text-xl font-semibold text-white">Category</h2>
              {activity.category && activity.category.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {activity.category.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400"> No categories assigned.</p>
              )}
            </div>
            <div className="text-left space-y-4">
              <h2 className="text-xl font-semibold text-white">Media</h2>
              {activity.media && activity.media.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {activity.media.map((mediaItem, index) => (
                    <Link
                      key={index}
                      href={mediaItem.url}
                      target="_blank"
                      className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-indigo-700 transition max-w-fit"
                    >
                      {mediaItem.title ?? `Media ${index + 1}`}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400"> No media linked.</p>
              )}
            </div>
          </div>
        </div>
      )}
      {Edit && <ActivityEditForm activity={activity} setMode={setMode} />}
    </>
  );
};

export default ActivityDetail;
