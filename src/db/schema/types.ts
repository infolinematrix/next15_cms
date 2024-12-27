// import {
//   pgTable,
//   uuid,
//   text,
//   integer,
//   index,
//   boolean,
// } from "drizzle-orm/pg-core";
// import { lifecycleDates } from "../utils";
// import { relations } from "drizzle-orm/relations";
// import { attributes } from "./attributes";

// export const types = pgTable(
//   "types",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     name: text("name").notNull().unique(),
//     identifier: text("identifier").notNull().unique(),

//     ...lifecycleDates,
//   },
//   (table) => ({
//     typeIdentifierIdx: index("typeIdentifierIdx").on(table.identifier),
//   })
// );

// export const type_properties = pgTable(
//   "type_properties",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     type_id: uuid("type_id").references(() => types.id, {
//       onDelete: "cascade",
//     }),
//     attribute_id: uuid("attribute_id").references(() => attributes.id, {
//       onDelete: "cascade",
//     }),
//     filterable: boolean("filterable").default(false),
//     price_varient: boolean("price_varient").default(false),
//     required: boolean("required").default(false),
//     status: integer("status").default(51),

//     ...lifecycleDates,
//   },
//   (table) => ({
//     typePropertiesIdx: index("typePropertiesIdx").on(
//       table.filterable,
//       table.price_varient,
//       table.required
//     ),
//   })
// );

// //--------Types
// export type TypesType = typeof types.$inferSelect;
// export type TypePropertiesType = typeof type_properties.$inferSelect;

// //--------Relations
// export const typesRelations = relations(types, ({ one, many }) => ({
//   type_properties: many(type_properties),
// }));

// export const typePropertiesRelations = relations(
//   type_properties,
//   ({ one }) => ({
//     type: one(types, {
//       fields: [type_properties.type_id],
//       references: [types.id],
//     }),

//     attribute: one(attributes, {
//       fields: [type_properties.attribute_id],
//       references: [attributes.id],
//     }),
//   })
// );

// // export const typePropertyAttributeRelations = relations(
// //   type_properties,
// //   ({ one }) => ({
// //     attribute: one(attributes, {
// //       fields: [type_properties.attribute_id],
// //       references: [attributes.id],
// //     }),
// //   })
// // );
