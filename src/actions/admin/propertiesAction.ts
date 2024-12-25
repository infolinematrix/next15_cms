"use server";

import { db } from "@/db";
import { nodeProperties, NodePropertiesType } from "@/db/schema/node";
import { and, eq } from "drizzle-orm";

export const createGarmentsAction = async (
  data: object,
  nodeId: string
): Promise<void> => {
  try {
    await db.transaction(async (tx) => {
      //--delete data if exists
      await tx
        .delete(nodeProperties)
        .where(
          and(
            eq(nodeProperties.nodeId, nodeId),
            eq(nodeProperties.property, "attributes")
          )
        );

      Object.entries(data).forEach(async (item: any) => {
        // console.log(item[0]);
        // console.log(item[1]);

        const newData = {
          nodeId: nodeId,
          property: "attributes",
          propertyValue: {
            [item[0]]: item[1],
          },
        } as NodePropertiesType;

        await tx.insert(nodeProperties).values(newData);
      });
    });
  } catch (error) {
    throw error;
  }
};
