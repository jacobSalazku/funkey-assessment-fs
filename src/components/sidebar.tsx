"use client";

import { Button } from "@/components/button";
import ActivityModal from "@/features/activities/components/activity-modal";
import CategoryModal from "@/features/categories/components/category-modal";
import { Folder, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Link } from "./link";

export default function Aside() {
  const pathname = usePathname();
  const [openModalCategory, setOpenModalCategory] = useState(false);
  const [openModalActivity, setOpenModalActivity] = useState(false);

  return (
    <>
      <aside className="w-1/3 p-4 min-h-[800px] space-y-4 bg-transparent text-white border-l shadow-md">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        {pathname === "/" ? (
          <Link
            variant="primary"
            className="flex items-center gap-2 w-full"
            href={{
              pathname: "/categories",
            }}
          >
            <Folder size={16} /> Manage Categories
          </Link>
        ) : (
          <Link
            variant="primary"
            className="flex items-center gap-2 w-full"
            href={{
              pathname: "/",
            }}
          >
            <Folder size={16} /> Manage Activities
          </Link>
        )}
        <Button
          variant="default"
          className="flex items-center gap-2 w-full"
          onClick={() => setOpenModalCategory(true)}
        >
          <Plus size={16} /> New Category
        </Button>

        <Button
          variant="default"
          className="flex items-center gap-2 w-full"
          onClick={() => setOpenModalActivity(true)}
        >
          <Plus size={16} /> New Activity
        </Button>
      </aside>

      {openModalCategory && (
        <CategoryModal onClose={() => setOpenModalCategory(false)} />
      )}
      {openModalActivity && (
        <ActivityModal onClose={() => setOpenModalActivity(false)} />
      )}
    </>
  );
}
