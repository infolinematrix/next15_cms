import { eq } from "drizzle-orm";
import { db } from "..";
import { roles, userRole, UserRoleType, users } from "../schema/users";
import { use } from "react";

export const getUsersQuery = async () => {
  const usersWithAccounts = await db.query.users.findMany({
    with: {
      userAccount: true,
      userRole: true,
    },
  });

  return usersWithAccounts;
};

export const getUserQuery = async (id: string) => {
  const data = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: { userAccount: true, userRole: true },
  });
  return data;
};

export const getRolesQuery = async () => {
  const data = await db.select().from(roles);
  return data;
};

export const getUserRoleQuery = async (userId: string): Promise<string> => {
  try {
    const user = await getUserQuery(userId);
    if (user?.userRole) {
      return user.userRole.roleIdentifier!;
    } else {
      const role = await db
        .insert(userRole)
        .values({ userId: userId, roleIdentifier: "USER" });

      return "USER";
    }
  } catch (error) {
    throw error;
  }
};

// export const getUserRoleFromRequest = async (userId: any) => {
//   try {
//     const user = await db.query.users.findFirst({
//       where: eq(users.id, userId),
//       with: { userRole: true },
//     });

//     const role = await db.query.roles.findFirst({
//       where: eq(roles.identifier, user?.userRole?.roleIdentifier!),
//     });

//     if (role) {
//       return role?.identifier;
//     }
//   } catch (error) {
//     return null;
//   }
// };
