import DashboardLayout from "@/components/admin/dashboard_layout";
import { Button } from "@/components/ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DotSquare, Ghost } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  getCategoriesQuery,
  getCategoryQuery,
} from "@/db/queries/categoryQueries";

export default async function CategoriesPage() {
  const data = await getCategoriesQuery();

  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between mb-4">
        <div className="text-lg font-bold mb-2">Categories - Root</div>

        <Button variant="secondary">
          <Link href="/admin/categories/create">Create new category</Link>
        </Button>
      </div>
      <div className="">
        <Table>
          <TableCaption className="text-left">
            A list of your Category.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Icon</TableHead>
              <TableHead className="w-[400px]">ID#</TableHead>
              <TableHead>Identifier</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data! &&
              data.map(async (item: any, index: number) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.icon_image == null ? (
                        <img
                          src={"/no-image.png"}
                          alt={item.name}
                          height={48}
                          width={48}
                          className="rounded-full w-14 h-14 object-cover"
                        />
                      ) : (
                        <img
                          src={"/" + item.icon_image}
                          alt={item.name}
                          height={48}
                          width={48}
                          className="rounded-full w-14 h-14 object-cover"
                        />
                      )}
                    </TableCell>
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
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link href={`/admin/categories/${item.id}/update`}>
                              Update
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Items</DropdownMenuItem>
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
