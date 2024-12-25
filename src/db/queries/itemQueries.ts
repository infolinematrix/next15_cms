//--Query

import { db } from "..";
import { categories } from "../schema/categories";

export const getItemsQuery = async () => {
  const data = await db.select().from(categories);
  return data;
};
