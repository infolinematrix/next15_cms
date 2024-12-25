//--Actions
"use server";
import { db } from "@/db";
import { nodes, NodeType } from "@/db/schema/node";
import { revalidatePath } from "next/cache";
import path from "path";
import { mkdir, stat, unlink, writeFile } from "fs/promises";
import { eq } from "drizzle-orm";
import { findNode } from "@/db/queries/nodeQueries";

/**
 * Creates a new node action with the provided data.
 *
 * @param data - The data to be used for creating the node action.
 * @returns A promise that resolves when the node action is created.
 * @throws Will throw an error if the creation process fails.
 */
export const createNodeAction = async (data: any): Promise<void> => {
  try {
    let fileUrl;

    if (data.image) {
      const file: File | null = data.image as unknown as File;
      if (!file) throw new Error("No file uploaded");

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");
      const uploadPath = path.join(process.cwd(), "/public/uploads/");
      try {
        await stat(uploadPath);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          await mkdir(uploadPath, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file\n",
            e
          );
          throw e;
        }
      }

      try {
        await writeFile(`${uploadPath}/${filename}`, buffer);
        fileUrl = `uploads/${filename}`;
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        throw e;
      }
      //---
    }
    const newData = {
      name: data.name,
      identifier: data.identifier,
      status: data.status,
      shortDescription: data.short_description,
      nodeType: data.nodeType,
      image: fileUrl,
    } as NodeType;

    // console.log(newData);

    await db.insert(nodes).values(newData);
    revalidatePath("/admin/node");
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a node action with the provided id.
 *
 * @param id - The id of the node action to be deleted.
 * @returns A promise that resolves when the node action is deleted.
 * @throws Will throw an error if the deletion process fails.
 */
export const deleteNodeAction = async (id: string): Promise<void> => {
  try {
    //--delete image
    const node = await findNode(id);
    if (node?.image) {
      const imagePath = path.join(process.cwd(), "/public/", node.image);

      try {
        await stat(imagePath);
        await unlink(imagePath);
      } catch (e: any) {
        if (e.code !== "ENOENT") {
          console.error("Error while trying to delete image\n", e);
          throw e;
        }
      }
    }

    await db.delete(nodes).where(eq(nodes.id, id));
    revalidatePath("/admin/node");
  } catch (error) {
    console.error("Error while trying to delete a node\n", error);
    throw error;
  }
};

/**
 * Updates a node action with the provided data.
 *
 * @param id - The id of the node action to be updated.
 * @param data - The data to be used for updating the node action.
 * @returns A promise that resolves when the node action is updated.
 * @throws Will throw an error if the update process fails.
 */
export const updateNodeAction = async (
  id: string,
  data: any
): Promise<void> => {
  try {
    let fileUrl;

    if (data.image) {
      const file: File | null = data.image as unknown as File;
      if (!file) throw new Error("No file uploaded");

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + file.name.replaceAll(" ", "_");
      const uploadPath = path.join(process.cwd(), "/public/uploads/");
      try {
        await stat(uploadPath);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          await mkdir(uploadPath, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file\n",
            e
          );
          throw e;
        }
      }

      try {
        await writeFile(`${uploadPath}/${filename}`, buffer);
        fileUrl = `uploads/${filename}`;
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
        throw e;
      }
    }

    const updatedData = {
      name: data.name,
      identifier: data.identifier,
      status: data.status,
      shortDescription: data.short_description,

      image: fileUrl,
    };

    if (!updatedData.image) {
      delete updatedData.image;
    }

    await db.update(nodes).set(updatedData).where(eq(nodes.id, id));
    revalidatePath("/admin/node");
  } catch (error) {
    console.error("Error while trying to update a node\n", error);
    throw error;
  }
};
