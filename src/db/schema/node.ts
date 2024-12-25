import {
  pgTable,
  uuid,
  varchar,
  text,
  index,
  jsonb,
} from "drizzle-orm/pg-core";
import { NodeStatus } from "@/lib/node";
import { lifecycleDates } from "../utils";

export const nodes = pgTable(
  "nodes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    status: varchar("status", { length: 25 }).notNull().$type<NodeStatus>(),
    nodeType: varchar("node_type", { length: 255 }).notNull(),
    shortDescription: text("short_description"),
    image: text("image"),

    ...lifecycleDates,
  },
  (table) => [
    {
      identifierIndex: index("identifier_idx").on(table.identifier),
      statusIndex: index("status_idx").on(table.status),
      nodeTypeIndex: index("node_type_idx").on(table.nodeType),
    },
  ]
);

export const nodeImages = pgTable(
  "node_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    nodeId: uuid("node_id")
      .references(() => nodes.id)
      .notNull(),
    imageUrl: varchar("image_url", { length: 255 }).notNull(),
    ...lifecycleDates,
  },
  (table) => [
    {
      nodeIdIndex: index("node_id_idx").on(table.nodeId),
    },
  ]
);

export const nodeProperties = pgTable(
  "node_properties",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    nodeId: uuid("node_id").references(() => nodes.id, {
      onDelete: "cascade",
    }),
    property: varchar("property", { length: 100 }).notNull(),
    propertyValue: jsonb("property_value").notNull(),

    ...lifecycleDates,
  },
  (table) => [
    {
      nodeIdIndex: index("nodeId_idx").on(table.nodeId),
      combinedIndex: index("nodeId_property_idx").on(
        table.nodeId,
        table.property
      ),
    },
  ]
);

export type NodeType = typeof nodes.$inferSelect;
export type NodePropertiesType = typeof nodeProperties.$inferSelect;
