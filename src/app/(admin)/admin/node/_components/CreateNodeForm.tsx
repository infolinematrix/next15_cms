"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";
import {
  createNodeFormSchema,
  createNodeFormSchemaType,
} from "@/types/forms/node";
import { NodeStatus, AllowedNodeTypes } from "@/lib/node";

import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { createNodeAction } from "@/actions/admin/nodeActions";
import Link from "next/link";
import NodeImageUpload from "./NodeImageUpload";
import LoadingButton from "@/components/loadingButton";

const CreateNodeForm = () => {
  const router = useRouter();
  const {
    formState: { errors },
  } = useForm<createNodeFormSchemaType>({
    resolver: zodResolver(createNodeFormSchema),
  });

  const form = useForm<z.infer<typeof createNodeFormSchema>>({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      identifier: "",
      status: NodeStatus.DRAFT,
      nodeType: "",
    },
    resolver: zodResolver(createNodeFormSchema),
  });

  const [files, setFiles] = useState<File[] | null>(null);
  const [formStatus, setFormStatus] = useState({ pending: false });

  async function onSubmit(formData: z.infer<typeof createNodeFormSchema>) {
    try {
      //-parse zod schema
      const monkeyParse = createNodeFormSchema.safeParse(formData);
      if (!monkeyParse.success) {
        toast({
          variant: "destructive",
          title: "Fail ",
          description: `Parse fail..`,
          duration: 3000,
        });
        return;
      }

      const data = {
        image: files ? files[0] : null,
        ...monkeyParse.data,
      };

      // console.log("file--------", data);

      await createNodeAction(data);

      //-On success
      toast({
        title: "Success ",
        description: `Created succesfully..`,
        duration: 2000,
      });
      router.back();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fail ",
        description: `${error.name}: ${error.message}`,
        duration: 2000,
      });
    }
  }

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 text-black"
        >
          <div className="flex md:flex-row sm:flex-col  gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        type=""
                        {...field}
                        onChange={(ev) => {
                          field.onChange(ev);
                          form.setValue("identifier", slugify(ev.target.value));
                        }}
                      />
                    </FormControl>
                    <FormDescription>Unique node name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identifier</FormLabel>
                    <FormControl>
                      <Input placeholder="Url" type="" {...field} />
                    </FormControl>
                    <FormDescription>
                      slag or unique identifier used for web url.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex-1">
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Give a short description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description of category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8">
              {/* Add your first column content here */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select parent category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={NodeStatus.DRAFT}>
                                Draft
                              </SelectItem>
                              <SelectItem value={NodeStatus.PUBLISHED}>
                                Published
                              </SelectItem>
                              <SelectItem value={NodeStatus.PENDING}>
                                Pending
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Select the status of the node.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="nodeType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Node type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select " />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(AllowedNodeTypes).map(
                                (item: string, index: number) => (
                                  <SelectItem key={index} value={item}>
                                    {item}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>Node type.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex justify-end">
                <div className="">
                  <div>
                    <NodeImageUpload setFiles={setFiles} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start gap-4">
            <LoadingButton loading={formStatus.pending}>Submit</LoadingButton>
            <Button type="button">
              <Link href="/admin/node/create/GARMENT">Create Garment</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateNodeForm;
