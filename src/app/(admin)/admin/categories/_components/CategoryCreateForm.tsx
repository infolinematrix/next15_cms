"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extensions/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { slugify } from "@/lib/utils";
import {
  categoryCreateSchema,
  categoryCreateSchemaType,
} from "@/types/forms/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload } from "lucide-react";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CategoryType } from "@/db/schema/categories";
import { createCategoryAction } from "@/actions/admin/categoryAction";

export default function CategoryCreateForm({ categories }: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<categoryCreateSchemaType>({
    resolver: zodResolver(categoryCreateSchema),
  });

  const form = useForm<z.infer<typeof categoryCreateSchema>>({
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      name: "",
      identifier: "",
      short_description: "",
      icon_image: "",
      is_active: true,
    },
    resolver: zodResolver(categoryCreateSchema),
  });

  async function onSubmit(formData: z.infer<typeof categoryCreateSchema>) {
    try {
      //-parse zod schema
      const monkeyParse = categoryCreateSchema.safeParse(formData);

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

      let fdata = {};
      if (files && files.length > 0) {
        fdata = {
          ...data,
          new_icon: files[0],
        };
      } else {
        fdata = { ...data };
      }

      await createCategoryAction(fdata);
      // console.log(fdata);

      //-On success
      toast({
        title: "Success ",
        description: `Created succesfully..`,
        duration: 2000,
      });
      // Redirect to previous page and refresh
      router.back();
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: "Fail ",
        description: `${e.name}: ${e.message}`,
        duration: 2000,
      });
    }
  }

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  const [files, setFiles] = useState<File[] | null>(null);

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
                    <FormDescription>Unique category name.</FormDescription>
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

          <div className="flex  md:flex-row sm:flex-col gap-4">
            <div className="w-1/3">
              <FormField
                control={form.control}
                name="icon_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select File</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={files}
                        onValueChange={setFiles}
                        dropzoneOptions={dropZoneConfig}
                        className="bg-background rounded-lg p-2"
                        onDrop={(files: any) => {
                          const fileUrl = URL.createObjectURL(files[0]);
                          // console.log("dsfsdf", fileUrl);
                        }}
                      >
                        <FileInput
                          id="fileInput"
                          className="outline-dashed outline-1 outline-slate-500"
                          onChange={(event: any) => {
                            const file = event.target.files?.[0];
                            field.onChange(event);
                            form.setValue("icon_image", file.name);
                            // console.log("dsfsdf", file.name);
                          }}
                        >
                          <div className="flex items-center justify-center flex-col p-8 w-full ">
                            <CloudUpload className="text-gray-500 w-10 h-10" />
                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              &nbsp; or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF
                            </p>
                          </div>
                        </FileInput>

                        <div className="">
                          <FileUploaderContent className="">
                            {files &&
                              files.length > 0 &&
                              files.map((file, i) => (
                                <div key={i} className="">
                                  <FileUploaderItem index={i}>
                                    <img
                                      src={URL.createObjectURL(files[0])}
                                      alt="Uploaded Image"
                                      height={48}
                                      width={48}
                                      className="rounded-full w-14 h-14 object-cover"
                                    />

                                    <div>
                                      {file.name.substring(0, 25) + " ..."}
                                    </div>
                                  </FileUploaderItem>
                                </div>
                              ))}
                          </FileUploaderContent>
                        </div>
                      </FileUploader>
                    </FormControl>
                    <FormDescription>Select a file to upload.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-2/3 space-y-5">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="parent_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent</FormLabel>
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
                          <SelectItem value="root">Root</SelectItem>

                          {categories.map(
                            (item: CategoryType, index: number) => (
                              <SelectItem value={item.id} key={item.id}>
                                {item.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage parent category.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Active</FormLabel>
                        <FormDescription>
                          Inactive categoey is not usable for any kind of
                          operation.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          //   disabled
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
