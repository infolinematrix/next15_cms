"use server";

import { db } from "@/db";
import { nodeProperties, NodePropertiesType, nodes } from "@/db/schema/node";
import { and, eq } from "drizzle-orm";
import { mkdir, stat, unlink, writeFile } from "fs/promises";
import path from "path";

export const deleteAllNodeImages = async (nodeId: string) => {
  try {
    const images = await db
      .select()
      .from(nodeProperties)
      .where(
        and(
          eq(nodeProperties.nodeId, nodeId),
          eq(nodeProperties.property, "images")
        )
      );

    if (!images || images.length > 0) {
      for (const image of images) {
        const imagePath = path.join(
          process.cwd(),
          "public",
          image.propertyValue as string
        );

        console.log("---------------------", imagePath);

        try {
          await stat(imagePath);
          await unlink(imagePath);

          //--delete
          await db
            .delete(nodeProperties)
            .where(eq(nodeProperties.id, image.id));

          console.log(`---------Deleted image--: ${image.id}`);
        } catch (e: any) {
          if (e.code !== "ENOENT") {
            console.error(`Error deleting image: ${imagePath}\n`, e);
          }
        }
      }

      console.log("ALL IMAGES DELETED..........");
    }
  } catch (error) {
    throw error;
  }
};

export const createImagesUpload = async (file: File, nodeId: string) => {
  try {
    if (!file) throw new Error("No file uploaded");

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    const uploadPath = path.join(process.cwd(), "/public/uploads/");

    try {
      await stat(uploadPath);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        // This is for checking the directory is exist (ENOENT : Error No Entry)
        await mkdir(uploadPath, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
      }
    }
    try {
      await writeFile(`${uploadPath}/${filename}`, buffer);
      const fileUrl = `uploads/${filename}`;

      // Save to database
      const newData = {
        nodeId: nodeId,
        property: "images",
        propertyValue: fileUrl,
      } as NodePropertiesType;

      await db.insert(nodeProperties).values(newData);
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
    }
  } catch (error) {
    throw error;
  }
};
