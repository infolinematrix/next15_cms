"use client";

import DashboardLayout from "@/components/admin/dashboard_layout";
import { Button } from "@/components/ui/button";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const coreProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(10, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // ... other common fields
});

export const clothingSchema = coreProductSchema.extend({
  size: z.enum(["S", "M", "L", "XL"]),
  color: z.string(),
});

export const electronicsSchema = coreProductSchema.extend({
  warranty: z.number().min(1, "Warranty period must be at least 1 year"),
  storage: z.string(),
});

const category = "clothing";
const schema = category === "clothing" ? clothingSchema : electronicsSchema;

export default function ItemsPage() {
  const formItems = [
    {
      name: "first_name",
      label: "Your name?",
      description: "This is your name, you should know it.",
      type: "text",
      validation: [
        {
          type: "min",
          value: 2,
          message: "Must be at least 2 chars",
        },
      ],
    },
  ];

  const schema: Record<string, z.ZodType<any>> = {};

  formItems.forEach((item) => {
    let fieldSchema = z.string();

    item.validation.forEach((rule) => {
      switch (rule.type) {
        case "min":
          fieldSchema = fieldSchema.min(rule.value, { message: rule.message });
          break;
        default:
          throw new Error("Unsupported validation type");
      }
    });

    schema[item.name] = fieldSchema;
  });

  const zodSchema = z.object(schema);
  type formSchemaType = z.infer<typeof zodSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(zodSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <DashboardLayout>
      <div className="text-lg font-bold mb-2">Items</div>

      <div className="container mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="space-y-6">
            {formItems.map((item) => (
              <li key={item.name}>
                <div>
                  <Label htmlFor={item.name}>{item.label}</Label>
                  <Input
                    {...register(item.name)}
                    type={item.type}
                    placeholder={item.label}
                  />
                </div>
                {errors[item.name] && <p className="text-xs">Error</p>}
              </li>
            ))}
          </ul>

          <Button type="submit" className="mt-10">
            Submit
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
