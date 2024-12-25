"use client";

import {
  deleteCategoryAction,
  updateCategoryAction,
} from "@/actions/admin/categoryAction";
import ConfirmationDialog from "@/components/confirmation_dialog";
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
import { CategoryType } from "@/db/schema/categories";
import { toast } from "@/hooks/use-toast";
import { slugify } from "@/lib/utils";
import { categoryUpdateSchema } from "@/types/forms/category";
import { zodResolver } from "@hookform/resolvers/zod";

import { CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  id: string;
  data: CategoryType;
  categories: CategoryType[];
}

export default function CategoryUpdateForm({ id, data, categories }: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof categoryUpdateSchema>>({
    defaultValues: {
      name: data.name,
      identifier: data.identifier,
      short_description: data.short_description!,
      is_active: data.is_active ?? false,
      icon_image: data.icon_image!,
      parent_id: data.parent_id!,
    },
    resolver: zodResolver(categoryUpdateSchema),
  });

  const handleDelete = async () => {
    try {
      await deleteCategoryAction(id);
      toast({
        title: "Success",
        description: "Category deleted successfully.",
        duration: 2000,
      });
      router.back();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete category.",
        duration: 3000,
      });
    }
  };
  async function onSubmit(formData: z.infer<typeof categoryUpdateSchema>) {
    //-parse zod schema
    const monkeyParse = categoryUpdateSchema.safeParse(formData);
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

    const resp = await updateCategoryAction(id, fdata);

    //-On success
    toast({
      title: "Success ",
      description: `Updated succesfully..`,
      duration: 2000,
    });
    router.back();
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
                        placeholder="Name"
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
                      <Input placeholder="slug" type="" {...field} />
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
                      placeholder="Placeholder"
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
            <div className="md:w-1/3">
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
                          // console.log("File Name---------", fileUrl);
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
                            {files && files.length > 0 ? (
                              files.map((file: any, i: number) => (
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
                              ))
                            ) : (
                              <div className="mt-2">
                                <img
                                  src={"/" + data.icon_image}
                                  alt="Uploaded Image"
                                  height={48}
                                  width={48}
                                  className="rounded-full w-14 h-14 object-cover"
                                />
                              </div>
                            )}
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
            <div className="md:w-2/3 space-y-5">
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
                            <SelectValue placeholder="Select root or parent category" />
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

      <div>
        {/* ...existing form code... */}
        <div className="w-2/3">
          <p className="text-sm mb-4">
            Please be aware that deleting this category will result in the
            permanent loss of all associated data. This action cannot be
            reversed.
          </p>
          <Button variant="secondary" onClick={() => setOpenDeleteDialog(true)}>
            Delete
          </Button>
        </div>

        <ConfirmationDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}
