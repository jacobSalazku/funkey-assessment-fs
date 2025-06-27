"use client";

import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Trash2Icon } from "lucide-react";
import { Activity } from "../actions/get-activity";

interface ActivityListItemProps {
  activity: Activity;
  onDelete: (id: string) => void;
}

export const ActivityListItem = ({
  activity,
  onDelete,
}: ActivityListItemProps) => {
  return (
    <li key={activity?.id} className="mb-2 w-full">
      <div className="flex items-center justify-between w-full border-neutral-100 border py-6 px-4 rounded-lg">
        <h3>{activity?.title}</h3>
        <div className="flex items-center gap-4 justify-center">
          <Link
            aria-label="View activity details"
            href={{
              pathname: `/activities/${activity?.id}`,
            }}
          >
            View details
          </Link>
          <Button
            aria-label="Delete activity"
            variant="danger"
            size="sm"
            onClick={() => activity?.id && onDelete(activity.id)}
            disabled={!activity?.id}
          >
            <Trash2Icon size={20} />
          </Button>
        </div>
      </div>
    </li>
  );
};
