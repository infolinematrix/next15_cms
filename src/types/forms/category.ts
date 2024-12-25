import { z } from "zod";

export const baseSchema = z.object({
  name: z.string().min(1, "Title is required"),
  identifier: z.string().min(2, "Minimum 2 required"),
  short_description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  is_active: z.boolean().default(true),

  // ... other common fields
});

export type categoryBaseSchemaType = z.infer<typeof baseSchema>;

export const categoryCreateSchema = baseSchema.extend({
  // has_child: z.boolean().default(false),
  parent_id: z.string(),
  icon_image: z.string(),
});

export type categoryCreateSchemaType = z.infer<typeof categoryCreateSchema>;

export const categoryUpdateSchema = baseSchema.extend({
  icon_image: z.string().nullable(),
  parent_id: z.string(),
});

export type categoryUpdateSchemaType = z.infer<typeof categoryUpdateSchema>;
