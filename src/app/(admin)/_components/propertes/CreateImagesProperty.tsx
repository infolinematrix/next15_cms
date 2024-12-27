"use client";

import {
  createImagesUpload,
  deleteAllNodeImages,
} from "@/actions/admin/propertyImagesAction";
import LoadingButton from "@/components/loadingButton";
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
import { NodePropertiesType, NodeType } from "@/db/schema/node";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  node: NodeType;
  properties: NodePropertiesType[];
}

export default function CreateImagesProperty({ node, properties }: Props) {
  const router = useRouter();
  const dropZoneConfig = {
    maxFiles: 10,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };
  const form = useForm();
  const [files, setFiles] = useState<File[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string[] | null>();
  const [formStatus, setFormStatus] = useState({ pending: false });

  // if (properties) {
  //   // console.log("-----------------", properties);
  //   properties.map((p) => {
  //     if (p.property == "images") {
  //       console.log(p.propertyValue);
  //       // const file = new File();
  //       setFiles(p.propertyValue);
  //     }
  //   });
  // }

  // useEffect(() => {
  //   // const imageUrl = "https://image.png";
  //   // fetch(imageUrl)
  //   //   .then((response) => response.blob())
  //   //   .then((blob) => {
  //   //     const file = new File([blob], "mainImage");
  //   //     const url = URL.createObjectURL(file);
  //   //     setFiles([Object.assign(f, { preview: url })]);
  //   //   });
  //   // console.log("-----------------", properties);

  //   if (properties) {
  //     properties.map((p) => {
  //       if (p.property == "images") {
  //         const blob = p.propertyValue as Blob;
  //         const file = new File([blob], p.propertyValue as string);
  //         // const url = URL.createObjectURL(file);
  //         // setImageUrl([p.propertyValue as string]);
  //         // const t = p.propertyValue as File;

  //         console.log("---------", file);
  //         setFiles([Object.assign(file)]);
  //       }
  //     });
  //   }
  // }, []);

  // Preload existing images
  useEffect(() => {
    properties.map((p) => {
      if (p.property == "images") {
        const u = p.propertyValue as string;

        const preloadedFiles = {
          preview: u,
          name: u.split("/").pop(), // Extract filename from URL
          size: 0, // Set size to 0 for preloaded images
        };
        setFiles([Object.assign(preloadedFiles)]);
        // setFiles(preloadedFiles);
        console.log(preloadedFiles);
      }
    });
  }, [imageUrl]);

  const handleSubmit = async (formData: any) => {
    try {
      setFormStatus({ pending: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!files || files.length === 0) {
        toast({
          variant: "destructive",
          title: "No files",
          description: "Please upload at least one file.",
          duration: 2000,
        });
        setFormStatus({ pending: false });
        return;
      }

      await deleteAllNodeImages(node.id);
      files.map(async (file: File, index: number) => {
        console.log(node.id, "----", file);
        await createImagesUpload(file, node.id);
      });

      //-On success
      toast({
        title: "Success ",
        description: `Updated succesfully..`,
        duration: 2000,
      });
      setFormStatus({ pending: false });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fail ",
        description: `${error.name}: ${error.message}`,
        duration: 2000,
      });
      setFormStatus({ pending: false });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-5 text-black"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="w-full">
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
                        // const fileUrl = URL.createObjectURL(files[0]);
                        console.log("dropzone files----------", files);
                      }}
                    >
                      <FileInput
                        id="fileInput"
                        className="outline-dashed outline-1 outline-slate-500"
                        onChange={(event: any) => {
                          const file = event.target.files?.[0];
                          field.onChange(event);
                          form.setValue("icon_image", file.name);
                          // console.log("dsfsdf", files);
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
                            SVG, PNG or JPG
                          </p>
                        </div>
                      </FileInput>

                      <div className="container">
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          {files &&
                            files.length > 0 &&
                            files.map((file, i) => (
                              <div key={i} className="">
                                <img
                                  src={URL.createObjectURL(files[i])}
                                  alt="Uploaded Image"
                                  className="w-[200] h-[200] object-cover rounded-lg shadow-md"
                                />

                                <div className="flex pt-2">
                                  {file.name.substring(0, 15) + " ..."}
                                  <FileUploaderItem
                                    index={i}
                                    className="mt-0"
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </FileUploader>
                  </FormControl>
                  <FormDescription>Select a file to upload.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-start gap-4">
            <LoadingButton loading={formStatus.pending}>Submit</LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
