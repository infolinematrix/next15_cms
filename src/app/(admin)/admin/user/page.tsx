import DashboardLayout from "@/components/admin/dashboard_layout";
import { UserType } from "@/db/schema/users";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { getUserQuery, getUsersQuery } from "@/db/queries/user";

const statusString = (status: number): string | undefined => {
  const userStatus = [
    {
      0: "Active",
    },
    {
      81: "Suspended",
    },
    {
      98: "Blocked",
    },
  ];
  const value = userStatus.find((obj) => status in obj)?.[0];

  return value;
};

export default async function UsersPage() {
  const data = await getUsersQuery();

  return (
    <DashboardLayout>
      <div className="text-lg font-bold mb-2">Users</div>
      <div className="">
        <Table>
          <TableCaption className="text-left">
            A list of your users
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">ID#</TableHead>
              <TableHead>Name</TableHead>

              <TableHead className="text-right">Role</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data! &&
              data.map((item: any, index: number) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.name}
                      <div className="text-xs text-muted-foreground font-light">
                        {item.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      {item.userAccount.city}
                      <div className="text-xs text-muted-foreground font-light">
                        {item.userAccount.state}, {item.userAccount.country}
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      {item.userRole.roleIdentifier}
                    </TableCell>
                    <TableCell className="text-right">
                      {" "}
                      {statusString(item.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <DotsHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Action</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={`/admin/user/${item.id}/update`}>
                              Update
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Billing</DropdownMenuItem>
                          <DropdownMenuItem>Team</DropdownMenuItem>
                          <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
