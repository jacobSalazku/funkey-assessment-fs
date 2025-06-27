import Aside from "@/components/sidebar";
import { getAllActivities } from "@/features/activities/actions/get-activities";
import ActivityList from "@/features/activities/components/activity-list";
import { getAllCategories } from "@/features/categories/actions/get-categories";

export default async function Home() {
  const activities = await getAllActivities();
  const categories = await getAllCategories();
  return (
    <main className="max-w-7xl mx-auto min-h-screen p-8 flex flex-col justify-center items-center gap-16">
      <div className="flex flex-row w-full gap-20 justify-center items-center">
        <div className="w-2/3  h-full space-y-8">
          <h1 className="text-3xl font-bold">Activities</h1>
          <ActivityList activities={activities} categories={categories} />
        </div>
        <Aside />
      </div>
    </main>
  );
}
