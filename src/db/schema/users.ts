import {
  pgTable,
  uuid,
  text,
  integer,
  index,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { lifecycleDates } from "@/db/utils";
import { InferSelectModel, relations } from "drizzle-orm";
import { AdapterAccount } from "next-auth/adapters";

// export const users = pgTable(
//   "users",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     name: text("name").notNull(),
//   },
//   (t) => [index("idx_user").on(t.id)]
// );

export const users = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  status: integer("status").default(0),

  ...lifecycleDates,
});

export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    city: text("city"),
    state: text("state"),
    country: text("country"),
    zipcode: text("zipcode"),

    ...lifecycleDates,
  },
  (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  identifier: text("identifier").notNull().unique(),
  name: text("name").notNull().unique(),
});

export const userRole = pgTable("user_role", {
  userId: uuid("user_id").references(() => users.id, {
    onDelete: "restrict",
  }),
  roleIdentifier: text("role_identifier").references(() => roles.identifier, {
    onDelete: "restrict",
  }),
});

//--------Types
export type UserType = typeof users.$inferSelect;
export type UserAccountType = typeof users.$inferSelect;
export type UserRoleType = typeof roles.$inferSelect;

//---Relations
export const userRelations = relations(users, ({ one, many }) => ({
  userAccount: one(accounts),
  userRole: one(userRole),
}));

export const userAccountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const userRoleRelations = relations(userRole, ({ one }) => ({
  user: one(users, {
    fields: [userRole.userId],
    references: [users.id],
  }),
}));
