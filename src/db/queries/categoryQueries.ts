//--Query

import { eq } from "drizzle-orm";
import { db } from "..";
import { categories, CategoryType } from "../schema/categories";

export const getCategoriesQuery = async () => {
  try {
    const data = await db.select().from(categories);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch categories");
  }
};

export const getCategoryQuery = async (id: string): Promise<CategoryType> => {
  try {
    const res = await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    return res!;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw new Error(`Unable to fetch category with id ${id}`);
  }
};
