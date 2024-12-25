import DashboardLayout from "@/components/admin/dashboard_layout";
import CategoryCreateForm from "../_components/CategoryCreateForm";
import { useForm } from "react-hook-form";
import {
  categoryCreateSchema,
  categoryCreateSchemaType,
} from "@/types/forms/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCategoriesQuery } from "@/db/queries/categoryQueries";

export default async function CreateCategoryPage() {
  const categories = await getCategoriesQuery();

  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between">
        <div className="text-lg font-bold mb-2">Create Category</div>
      </div>
      <section className="title-section">
        <div className="title-section-name">Information</div>

        <div className="container mb-5">
          <div className="text-muted-foreground">
            <CategoryCreateForm categories={categories} />
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
