import DashboardLayout from "@/components/admin/dashboard_layout";
import Garment from "@/content/garment";
import GarmentCreateForm from "@/content/garment_create_form";
import React from "react";

interface Props {
  params: { id: string };
}

const AttributesPage = async ({ params }: Props) => {
  const { id } = await params;
  const objGarment = await Garment.initialize();
  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between py-4 items-center">
        <div className="text-lg font-bold">Attributes</div>
      </div>

      <section className="title-section">
        <div className="title-section-name">Information</div>

        <div className="container">
          <GarmentCreateForm
            params={{
              nodeId: id,
              obj: { ...objGarment },
            }}
          />
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AttributesPage;
