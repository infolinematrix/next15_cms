/*
 * Node class to represent a node in a content management system.
 * The class fetches node properties and images from an API endpoint.
 * const nodeId = "123"; // Replace with your actual node ID
 * const node = await Node.create(nodeId);
 * console.log(node.name);
 * const images = await node.fetchImages();
 */

import { db } from "@/db";
import { nodes } from "@/db/schema/node";
import * as content from "@/content";
import { any } from "zod";

export enum NodeStatus {
  PUBLISHED = "PUBLISHED",
  PENDING = "PENDING",
  DRAFT = "DRAFT",
  PRIVATE = "PRIVATE",
  TRASH = "TRASH",
}

export const AllowedNodeTypes = {
  GARMENT: "Garments",
  FOOTWARE: "Footware",
  MOBILE: "Mobile",
  COSMETIC: "Cosmetics",
};

export function createObjectFromClassName(className: string) {
  // if (!(className in content)) {
  //   throw new Error(`Class ${className} does not exist in content module`);
  // }

  const d = Object.entries(content).find(([key]) => key === className)?.[1];
  if (!d) {
    throw new Error(`Class ${className} does not exist in content module`);
  }
  console.log(d);

  // const contentClasses: { [key: string]: any } = {
  const nodeInstance = new d();
  //   // Add other classes here
  // };
  // const nodeInstance = new d();
  // console.log(d);
  // if (!(className in contentClasses)) {
  //   throw new Error(`Class ${className} does not exist in content module`);
  // }

  // const nodeInstance = new contentClasses[className]();
  console.log(nodeInstance);

  return ["", ""];
}

// export class Node {
//   id: string;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date | null;
//   identifier: string;
//   status: NodeStatus | null;
//   nodeType: string;
//   private constructor(id: string) {
//     this.id = id;
//     this.name = "";
//     this.createdAt = new Date();
//     this.updatedAt = null;
//     this.identifier = "";
//     this.status = null;
//     this.nodeType = "";
//   }

//   static async create(id: string): Promise<Node> {
//     const node = new Node(id);
//     await node.initialize();
//     return node;
//   }

//   private async initialize() {
//     await this.get();
//   }

//   private async get(): Promise<void> {
//     try {
//       const node = await db
//         .select()
//         .from(nodes)
//         .where(nodes.id.eq(this.id))
//         .execute();
//       if (!node) {
//         throw new Error("Failed to fetch node properties");
//       }

//       this.name = node.name;
//       this.createdAt = new Date(node.createdAt);
//       this.updatedAt = node.updatedAt ? new Date(node.updatedAt) : null;
//       this.identifier = node.identifier;
//       this.status = node.status;
//       this.nodeType = node.nodeType;
//     } catch (error) {
//       console.error("Error fetching node properties:", error);
//       throw error;
//     }
//   }

//   async fetchImages(): Promise<string[]> {
//     try {
//       // Replace with your actual API endpoint or database query
//       const response = await fetch(`/api/nodes/${this.id}/images`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch images");
//       }
//       const images: string[] = await response.json();
//       return images;
//     } catch (error) {
//       console.error("Error fetching images:", error);
//       throw error;
//     }
//   }
// }
