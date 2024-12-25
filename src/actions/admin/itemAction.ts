import { getItemsQuery } from "@/db/queries/itemQueries";

export const getItems = async () => {
  try {
    const data = await getItemsQuery();

    return data;
  } catch (error) {
    throw error;
  }
};
