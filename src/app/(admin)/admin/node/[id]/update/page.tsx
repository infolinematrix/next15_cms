import DashboardLayout from "@/components/admin/dashboard_layout";
import UpdateNodeForm from "../../_components/UpdateNodeForm";
import { findNode } from "@/db/queries/nodeQueries";

interface Props {
  params: { id: string };
}

export default async function NodeUpdate({ params }: Props) {
  const { id } = await params;
  const data = await findNode(id);
  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between py-4 items-center">
        <div className="text-lg font-bold flex-grow">
          <div className="">Update</div>
          <div className="text-sm font-normal text-muted-foreground mr-10">
            n case you need to extend the File with some additional properties,
            you should use.
          </div>
        </div>
      </div>
      <section className="title-section">
        <div className="title-section-name">Information</div>

        <div className="container mb-5">
          <UpdateNodeForm nodeId={id} initialData={data!} />
        </div>

        <div></div>
      </section>
    </DashboardLayout>
  );
}
