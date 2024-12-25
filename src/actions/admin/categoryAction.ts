//--Actions
"use server";
import { db } from "@/db";
import { categories, CategoryType } from "@/db/schema/categories";
import { generateRandomString, getFileNameAndExtension } from "@/lib/utils";

import fs from "fs";
import path from "path";
import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateCategoryAction = async (
  id: string,
  data: any
): Promise<void> => {
  try {
    if (data.new_icon) {
      const file: File | null = data.new_icon as unknown as File;
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
        const newData: any = {
          name: data.name,
          identifier: data.identifier,
          parent_id: data.parent_id,
          short_description: data.short_description,
          is_active: data.is_active,
          icon_image: fileUrl,
        };

        await db.update(categories).set(newData).where(eq(categories.id, id));

        // return NextResponse.json({ user: result });
      } catch (e) {
        console.error("Error while trying to upload a file\n", e);
      }
    } else {
      const newData: any = {
        name: data.name,
        identifier: data.identifier,
        parent_id: data.parent_id,
        short_description: data.short_description,
        is_active: data.is_active,
      };

      await db.update(categories).set(newData).where(eq(categories.id, id));
      revalidatePath("/admin/categories");
    }
  } catch (error) {
    throw error;
  }
};

//---Create
export const createCategoryAction = async (data: any): Promise<void> => {
  try {
    let fileUrl = null;

    if (data.new_icon) {
      const file: File | null = data.new_icon as unknown as File;
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

    const newData: any = {
      name: data.name,
      identifier: data.identifier,
      parent_id: data.parent_id,
      short_description: data.short_description,
      is_active: data.is_active,
      icon_image: fileUrl,
    };

    await db.insert(categories).values(newData);
    revalidatePath("/admin/categories");
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Unable to create category");
  }
};

//---Delete
export const deleteCategoryAction = async (id: string): Promise<void> => {
  try {
    await db.delete(categories).where(eq(categories.id, id));
    console.log(`Category with id ${id} deleted successfully.`);
    revalidatePath("/admin/categories");
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw new Error(`Unable to delete category with id ${id}`);
  }
};
