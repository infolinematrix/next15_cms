"use client";

import { z } from "zod";
import Garment from "./garment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/extensions/multi-select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { createGarmentsAction } from "@/actions/admin/propertiesAction";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import LoadingButton from "@/components/loadingButton";

interface Props {
  params: { nodeId: string; obj: Garment };
}

export default function GarmentCreateForm({ params }: Props) {
  const [formStatus, setFormStatus] = useState({ pending: false });

  const formSchema = z.object({
    color: z
      .array(
        z.enum([...Object.values(params.obj.colors)] as [string, ...string[]])
      )
      .min(1, "At least one color must be selected"),
    size: z
      .array(
        z.enum([...Object.values(params.obj.sizes)] as [string, ...string[]])
      )
      .min(1, "At least one size must be selected"),
    // ... other common fields
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    formState: { errors },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      color: [],
      size: [],
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: any) => {
    try {
      setFormStatus({ pending: true });
      //-parse zod schema
      const monkeyParse = formSchema.safeParse(formData);
      if (!monkeyParse.success) {
        toast({
          variant: "destructive",
          title: "Fail ",
          description: `Parse fail..`,
          duration: 3000,
        });
        return;
      }

      const data = monkeyParse.data;

      //--submit data
      await createGarmentsAction(data, params.nodeId);
      setFormStatus({ pending: false });
      toast({
        title: "Success ",
        description: `Data submitted successfully..`,
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error ",
        description: `${error.name}: ${error.message}`,
        duration: 3000,
      });
      setFormStatus({ pending: false });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 text-black"
        >
          <div className="flex md:flex-row sm:flex-col  gap-4">
            <div className="w-full sm:w-full md:w-1/2 ">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Colors</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <MultiSelect
                          options={Object.values(params.obj.colors).map(
                            (color) => ({
                              label: color,
                              value: color,
                            })
                          )}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          placeholder="Select options"
                          variant="inverted"
                          animation={2}
                          maxCount={3}
                        />
                      </FormControl>
                    </Select>
                    <FormDescription>select size.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full sm:w-full md:w-1/2 ">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>

                    <FormControl>
                      <MultiSelect
                        options={Object.values(params.obj.sizes).map(
                          (size) => ({
                            label: size,
                            value: size,
                          })
                        )}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select options"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                    </FormControl>
                    <FormDescription>Select Size.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <LoadingButton loading={formStatus.pending}>Submit</LoadingButton>
        </form>
      </Form>
    </div>
  );
}
