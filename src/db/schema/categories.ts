// import { generateId } from "@/lib/id";

import { relations } from "drizzle-orm";
import { boolean, foreignKey, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { lifecycleDates } from "../utils";

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parent_id: text("parent_id"),
    name: text("name").notNull().unique(),
    identifier: text("identifier").notNull().unique(),
    short_description: text("short_description"),
    has_child: boolean("has_child").default(false),
    is_active: boolean("active").default(true),
    icon_image: text("icon_image").default("/no-image.png"),

    ...lifecycleDates,
  },
  (table) => [
    // {
    //   parentReference: foreignKey({
    //     columns: [table.parent_id],
    //     foreignColumns: [table.id],
    //     name: "fkey_parent_id",
    //   }).onDelete("cascade"),
    // },
  ]
);

export type CategoryType = typeof categories.$inferSelect;
