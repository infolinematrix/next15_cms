import DashboardLayout from "@/components/admin/dashboard_layout";
import { createObjectFromClassName } from "@/lib/node";

interface Props {
  params: { nodeType: string };
}
// class Mobile {
//   display: string = "450";
//   os: string = "Android";
//   brand: string = "NOKIYA";
// }
// class Garments {
//   color: string = "";
//   size: string = "";
// }
// const nodeClasses: { [key: string]: any } = {
//   Mobile,
//   Garments,
// };

export default async function TypePage({ params }: Props) {
  //   const nodeType = await params.nodeType;
  const nodeType = "Mobile";
  const [obj, properties] = createObjectFromClassName(nodeType);

  console.log(properties);

  return (
    <DashboardLayout>
      <div>Node Type: {nodeType}</div>
    </DashboardLayout>
  );
}
