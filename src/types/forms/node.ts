import { z } from "zod";
import { NodeStatus } from "@/lib/node";

export const createNodeFormSchema = z.object({
  name: z.string().nonempty("Node name is required"),
  identifier: z.string().nonempty("Identifier is required"),
  short_description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  status: z.enum([
    NodeStatus.PUBLISHED,
    NodeStatus.PENDING,
    NodeStatus.DRAFT,
    NodeStatus.PRIVATE,
    NodeStatus.TRASH,
  ]),
  nodeType: z
    .string()
    .min(2, "Minimum 2 required")
    .max(100, "Max 100 characters long"),
});

export type createNodeFormSchemaType = z.infer<typeof createNodeFormSchema>;

//--
export const updateNodeFormSchema = z.object({
  name: z.string().nonempty("Node name is required"),
  identifier: z.string().nonempty("Identifier is required"),
  short_description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  status: z.enum([
    NodeStatus.PUBLISHED,
    NodeStatus.PENDING,
    NodeStatus.DRAFT,
    NodeStatus.PRIVATE,
    NodeStatus.TRASH,
  ]),

  nodeType: z
    .string()
    .min(2, "Minimum 2 required")
    .max(100, "Max 100 characters long"),
});

export type updateNodeFormSchemaType = z.infer<typeof updateNodeFormSchema>;
