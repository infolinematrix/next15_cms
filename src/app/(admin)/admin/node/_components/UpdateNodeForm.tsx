"use client";

import { NodeType } from "@/db/schema/node";
import React, { useEffect, useState } from "react";
import NodeDeleteForm from "./NodeDeleteForm";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AllowedNodeTypes, NodeStatus } from "@/lib/node";
import { z } from "zod";

import {
  updateNodeFormSchema,
  updateNodeFormSchemaType,
} from "@/types/forms/node";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NodeImageUpload from "./NodeImageUpload";
import LoadingButton from "@/components/loadingButton";
import { toast } from "@/hooks/use-toast";
import { updateNodeAction } from "@/actions/admin/nodeActions";

interface UpdateNodeFormProps {
  nodeId: string;
  initialData: NodeType;
}

const UpdateNodeForm: React.FC<UpdateNodeFormProps> = ({
  nodeId,
  initialData,
}) => {
  const {
    formState: { errors },
  } = useForm<updateNodeFormSchemaType>({
    resolver: zodResolver(updateNodeFormSchema),
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof updateNodeFormSchema>>({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: initialData.name,
      identifier: initialData.identifier,
      status: initialData.status,
      short_description: initialData.shortDescription ?? undefined,
      nodeType: initialData.nodeType,
    },
    resolver: zodResolver(updateNodeFormSchema),
  });

  const [files, setFiles] = useState<File[] | null>(null);
  const [formStatus, setFormStatus] = useState({ pending: false });

  //   useEffect(() => {
  //     if (initialData.image) {
  //       const imageFile = new File([initialData.image], initialData.image, {
  //         type: "image/jpeg",
  //       });

  //       //   console.log(imageFile);

  //       setFiles([imageFile]);
  //     }
  //   }, []);

  const handleSubmit = async (
    formData: z.infer<typeof updateNodeFormSchema>
  ) => {
    try {
      //-parse zod schema
      const monkeyParse = updateNodeFormSchema.safeParse(formData);
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
        ...monkeyParse.data,
        image: files && files.length > 0 ? files[0] : undefined,
      };

      if (initialData.image && (!files || files.length === 0)) {
        delete data.image;
      }

      await updateNodeAction(nodeId, data);

      //-On success
      toast({
        title: "Success ",
        description: `Updated succesfully..`,
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
  };

  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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

          <div className="w-full">
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
                            disabled
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
                    <NodeImageUpload
                      setFiles={setFiles}
                      image={initialData.image}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start gap-4">
            <LoadingButton loading={formStatus.pending}>Submit</LoadingButton>
          </div>
        </form>
      </Form>

      <div className="mt-10">
        <NodeDeleteForm nodeId={nodeId} />
      </div>
    </div>
  );
};

export default UpdateNodeForm;
