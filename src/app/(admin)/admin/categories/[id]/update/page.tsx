import DashboardLayout from "@/components/admin/dashboard_layout";
import CategoryUpdateForm from "../../_components/CategoryUpdateForm";
import {
  getCategoriesQuery,
  getCategoryQuery,
} from "@/db/queries/categoryQueries";
import { CategoryType } from "@/db/schema/categories";

interface Props {
  params: { id: string };
}

export default async function UpdateCategoryPage({ params }: Props) {
  const { id } = await params;
  const data = await getCategoryQuery(id);
  const categories = await getCategoriesQuery();

  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between">
        <div className="text-lg font-bold mb-2">Update Category</div>
      </div>
      <section className="title-section">
        <div className="title-section-name">Information</div>

        <div className="container mb-5">
          <div className="text-muted-foreground">
            <CategoryUpdateForm id={id} data={data!} categories={categories!} />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
