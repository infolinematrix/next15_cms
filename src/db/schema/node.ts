import {
  pgTable,
  uuid,
  varchar,
  text,
  index,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import { NodeStatus } from "@/lib/node";
import { lifecycleDates } from "../utils";
import { InferSelectModel, relations } from "drizzle-orm";

export const nodes = pgTable(
  "nodes",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
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

export const nodeProperties = pgTable(
  "node_properties",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    nodeId: uuid("nodeId")
      .notNull()
      .references(() => nodes.id, {
        onDelete: "restrict",
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

// //------- Relations -- you have to make both side relation
export const nodesRelations = relations(nodes, ({ one, many }) => ({
  properties: many(nodeProperties),
}));

export const propertiesRelations = relations(nodeProperties, ({ one }) => ({
  node: one(nodes, {
    fields: [nodeProperties.nodeId],
    references: [nodes.id],
  }),
}));
