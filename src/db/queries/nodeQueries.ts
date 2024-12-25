// Adjust the import path as needed
import { nodeImages, nodes, NodeType } from "@/db/schema/node";
import { NodeStatus } from "@/lib/node";
import { db } from "..";
import { eq } from "drizzle-orm";

const nodeId = "f5c0778f-fe15-4968-ad65-e599bd04a43a"; // Replace with the actual node ID

/**
 * Retrieves a node by its identifier.
 *
 * @param identifier - The identifier of the node to retrieve.
 * @returns A promise that resolves to the node data if found, or null if not found.
 * @throws Will throw an error if the retrieval process fails.
 */
export const findNode = async (noodeId: string): Promise<NodeType | null> => {
  try {
    const node = await db.query.nodes.findFirst({
      where: eq(nodes.id, noodeId),
    });
    return node || null;
  } catch (error) {
    console.error("Error while trying to retrieve a node\n", error);
    throw error;
  }
};

export const fetchNodesWithPagination = async () => {
  try {
    const nodesWithPagination = await db
      .select()
      .from(nodes)
      .offset(0)
      .limit(25)
      .execute();
    return nodesWithPagination;
  } catch (error) {
    console.error("Error fetching nodes with pagination:", error);
    throw new Error("Unable to fetch nodes with pagination");
  }
};

export const fetchImages = async () => {
  try {
    const images = await db
      .select()
      .from(nodeImages)
      .where(eq(nodeImages.nodeId, nodeId));
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Unable to fetch images");
  }
};

export const publishedNodes = await db
  .select()
  .from(nodes)
  .where(eq(nodes.status, NodeStatus.PUBLISHED))
  .execute();

export const nodeWithImages = await db
  .select()
  .from(nodes)
  .leftJoin(nodeImages, eq(nodeImages.nodeId, nodes.id))
  .where(eq(nodes.id, nodeId))
  .execute();
