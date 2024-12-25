import DashboardLayout from "@/components/admin/dashboard_layout";
import { Form } from "@/components/ui/form";

import { getRolesQuery, getUserQuery, getUsersQuery } from "@/db/queries/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserFormComponenet } from "../../_components/userForm";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

export default async function UserUpdatePage<Props>({ params }: any) {
  const { id } = await params;
  const [user, roles] = await Promise.all([getUserQuery(id), getRolesQuery()]);

  return (
    <DashboardLayout>
      <section className="title-section">
        <div className="title-section-name">User Information</div>

        <Suspense fallback={<h1>Loading feed...</h1>}>
          <div className="container mb-5">
            <div className="text-muted-foreground">ID#: {user?.id!}</div>
          </div>

          <UserFormComponenet user={user} roles={roles} />
        </Suspense>
      </section>
    </DashboardLayout>
  );
}
