import {
  pgEnum,
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  foreignKey,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { lifecycleDates } from "../utils";
import { relations } from "drizzle-orm/relations";

export const inputEnum = pgEnum("attribute_type", [
  "TEXTBOX",
  "SELECT",
  "SELECT-MULTIPLE",
  "OPTIONS",
  "TEXTAREA",
]);

export const attributes = pgTable(
  "attributes",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    name: text("name").notNull().unique(),
    identifier: text("identifier").notNull().unique(),
    custom_name: text("custom_name"),
    input_type: inputEnum("input_type").notNull().default("TEXTBOX"),
    status: integer("status").default(51),
    ...lifecycleDates,
  },
  (table) => ({
    identifierIdx: index("identifier_idx").on(table.identifier),
    inputTypeIdx: index("input_type_idx").on(table.input_type),
  })
);

//------------------
export const attribute_values = pgTable(
  "attribute_values",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    attribute_id: uuid("attribute_id")
      .notNull()
      .references(() => attributes.id, { onDelete: "cascade" }),
    attribute_value: text("attribute_value").notNull(),

    ...lifecycleDates,
  },
  (table) => ({
    // parentReference: foreignKey({
    //   columns: [table.attribute_id],
    //   foreignColumns: [attributes.id],
    //   name: "fkey_attribute",
    // }).onDelete("cascade"),

    attributeValueUniqueIndex: unique("value_unique_index").on(
      table.attribute_id,
      table.attribute_value
    ),

    attributeCalueIdx: index("attribute_value_idx").on(
      table.attribute_id,
      table.attribute_value
    ),
  })
);

//--------Types
export type AttributeType = typeof attributes.$inferSelect;
export type AttributeValueType = typeof attribute_values.$inferSelect;

//------- Relations
export const attributesRelations = relations(attributes, ({ one, many }) => ({
  attribute_values: many(attribute_values),
}));

export const attributeValuesRelations = relations(
  attribute_values,
  ({ one }) => ({
    attribute: one(attributes, {
      fields: [attribute_values.attribute_id],
      references: [attributes.id],
    }),
  })
);
