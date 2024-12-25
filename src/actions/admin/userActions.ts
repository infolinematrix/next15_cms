"use server";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export const updateUserAction = async (formData: any, userId: string) => {
  try {
    const data = await db
      .update(users)
      .set({
        name: formData.name,
      })
      .where(eq(users.id, userId));
  } catch (error) {
    throw error;
  }
};
