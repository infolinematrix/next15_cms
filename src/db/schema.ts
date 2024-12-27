import { categories } from "./schema/categories";

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
import {
  nodes,
  nodeProperties,
  nodesRelations,
  propertiesRelations,
} from "./schema/node";

export const schema = {
  users,
  roles,
  userRole,
  accounts,
  sessions,
  verificationTokens,
  //--------

  userAccountRelations,
  userRoleRelations,
  userRelations,

  //----------
  pickup,
  categories,

  nodes,
  nodeProperties,
  nodesRelations,
  propertiesRelations,
};
