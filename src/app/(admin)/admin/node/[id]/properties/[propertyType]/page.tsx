import { getNodeWithProperties } from "@/actions/admin/nodeActions";
import CreateImagesProperty from "@/app/(admin)/_components/propertes/CreateImagesProperty";
import DashboardLayout from "@/components/admin/dashboard_layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AllowedNodeTypes } from "@/lib/node";
import { Terminal } from "lucide-react";

interface Props {
  params: { propertyType: string; id: string };
}

export default async function TypePage({ params }: Props) {
  const { propertyType, id } = await params;

  const [node, properties] = await getNodeWithProperties(id);

  return (
    <DashboardLayout>
      {(() => {
        switch (propertyType) {
          case "images":
            return (
              <section className="title-section">
                <div className="title-section-name">{propertyType}</div>

                <div className="container">
                  <CreateImagesProperty node={node} properties={properties} />
                  {/* {node} */}
                </div>
              </section>
            );

          default:
            return (
              <section className="title-section">
                <div className="title-section-name">Undefined</div>

                <div className="container">
                  <div className="">Nothing found...</div>
                </div>
              </section>
            );
        }
      })()}
    </DashboardLayout>
  );
}
