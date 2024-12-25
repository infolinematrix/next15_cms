import { categories } from "./schema/categories";
import { nodes, nodeProperties } from "./schema/node";

import { pickup } from "./schema/pickup";
import {
  accounts,
  roles,
  sessions,
  userAccountRelations,
  userRelations,
  userRole,
  userRoleRelations,
  users,
  verificationTokens,
} from "./schema/users";
// import { demo } from "./schemas/demo";
// import { todos } from "./schemas/todo";
//c34b74cb-737a-4253-8d3a-e7271ce47f5f  14a26d68-c53c-49c0-89c0-ce97a323826a
export const schema = {
  users,
  roles,
  userRole,
  accounts,
  sessions,
  verificationTokens,
  //--------
  // userAccount,
  // userSession,
  // userVerificationToken,
  userAccountRelations,
  userRoleRelations,
  userRelations,

  //----------
  pickup,
  categories,

  nodes,
  nodeProperties,
};
