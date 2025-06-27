import { getActivity } from "@/features/activities/actions/get-activity";
import ActivityDetail from "@/features/activities/components/activity-detail";
import { getAllCategories } from "@/features/categories/actions/get-categories";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = await getActivity(id);

  if (!activity) return null;

  return {
    title: `${activity.title}`,
    description: activity.description,
  };
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const activity = await getActivity(id);
  const categories = await getAllCategories();

  return <ActivityDetail activity={activity} categories={categories} />;
}
