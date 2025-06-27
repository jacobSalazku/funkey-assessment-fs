import { getAllActivities } from "@/features/activities/actions/get-activities";
import { getCategory } from "@/features/categories/actions/get-category";
import CategoryDetail from "@/features/categories/components/categories-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) return null;

  return {
    title: `${category.title}`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await getCategory(id);
  const activities = await getAllActivities();

  if (!category) {
    return <div>Category is not found</div>;
  }
  return <CategoryDetail category={category} activities={activities} />;
}
