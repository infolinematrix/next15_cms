import DashboardLayout from "@/components/admin/dashboard_layout";
import { Button } from "@/components/ui/button";
import { fetchNodesWithPagination } from "@/db/queries/nodeQueries";
import Link from "next/link";
import React from "react";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NodeType } from "@/db/schema/node";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default async function AdminNodesPage() {
  const nodes: NodeType[] = await fetchNodesWithPagination();

  return (
    <DashboardLayout>
      <div className="flex gap-4 justify-between mb-4">
        <div className="text-lg font-bold mb-2">Nodes</div>
        <Button variant="secondary">
          <Link href="/admin/node/create">Create</Link>
        </Button>
      </div>

      {nodes.length == 0 ? (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>No data found!</AlertTitle>
          <AlertDescription>
            System could not find the requested data. Add a new node and
            populate it with the necessary data
          </AlertDescription>
        </Alert>
      ) : (
        nodesTable()
      )}
    </DashboardLayout>
  );

  function nodesTable() {
    return (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Identifier</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodes.map((node: NodeType) => (
              <TableRow key={node.id}>
                <TableCell>
                  {!node.image ? (
                    <img
                      src={"/no-image.png"}
                      alt={node.name}
                      height={48}
                      width={48}
                      className="rounded-full w-14 h-14 object-cover"
                    />
                  ) : (
                    <img
                      src={"/" + node.image}
                      alt={node.name}
                      height={48}
                      width={48}
                      className="rounded-full w-14 h-14 object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {node.name}
                  <div className="text-xs text-muted-foreground font-light">
                    {node.id}
                  </div>
                </TableCell>
                <TableCell>{node.identifier}</TableCell>
                <TableCell>{node.nodeType}</TableCell>
                <TableCell>{node.status}</TableCell>
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
                        <Link href={`/admin/node/${node.id}/update`}>
                          Update
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Link href={`/admin/node/${node.id}/properties`}>
                          Properties
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Other</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}
