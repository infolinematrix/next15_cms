import DashboardLayout from "@/components/admin/dashboard_layout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { getRolesQuery } from "@/db/queries/user";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default async function UserRolesPage() {
  const data = await getRolesQuery();

  return (
    <DashboardLayout>
      <div className="text-lg font-bold mb-2">Roles</div>
      <div className="">
        <Table>
          <TableCaption className="text-left">
            A list of your user roles.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Role#</TableHead>
              <TableHead>Identifier</TableHead>

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
                    <TableCell> {item.identifier}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <DotsHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Profile</DropdownMenuItem>
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
