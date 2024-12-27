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

// export function createObjectFromClassName(className: string) {
//   // if (!(className in content)) {
//   //   throw new Error(`Class ${className} does not exist in content module`);
//   // }

//   const d = Object.entries(content).find(([key]) => key === className)?.[1];
//   if (!d) {
//     throw new Error(`Class ${className} does not exist in content module`);
//   }
//   console.log(d);

//   // const contentClasses: { [key: string]: any } = {
//   const nodeInstance = new d();
//   //   // Add other classes here
//   // };
//   // const nodeInstance = new d();
//   // console.log(d);
//   // if (!(className in contentClasses)) {
//   //   throw new Error(`Class ${className} does not exist in content module`);
//   // }

//   // const nodeInstance = new contentClasses[className]();
//   console.log(nodeInstance);

//   return ["", ""];
// }

// export class NodeClass {
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
// }

interface RootObject {
  id: string;
  name: string;
  identifier: string;
  status: string;
  nodeType: string;
  shortDescription: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  properties: Property[];
}
interface Property {
  id: string;
  nodeId: string;
  property: string;
  propertyValue: string;
  createdAt: string;
  updatedAt: string;
}

export class NodeObject<RootObject> {
  private node: object;

  constructor(node: object) {
    this.node = node;
  }

  getProperties = (propery: string) => {
    return this.node;
  };
}

export class NodeModel {
  id?: string;
  name?: string;
  identifier?: string;
  status?: string;
  nodeType?: string;
  shortDescription?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  properties?: Properties[];

  constructor(
    id?: string,
    name?: string,
    identifier?: string,
    status?: string,
    nodeType?: string,
    shortDescription?: string,
    image?: string,
    createdAt?: string,
    updatedAt?: string,
    properties?: Properties[]
  ) {
    this.id = id;
    this.name = name;
    this.identifier = identifier;
    this.status = status;
    this.nodeType = nodeType;
    this.shortDescription = shortDescription;
    this.image = image;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.properties = properties;
  }

  static fromJson(json: Record<string, any>): NodeModel {
    const properties = json.properties
      ? json.properties.map((v: any) => Properties.fromJson(v))
      : undefined;
    return new NodeModel(
      json.id,
      json.name,
      json.identifier,
      json.status,
      json.nodeType,
      json.shortDescription,
      json.image,
      json.createdAt,
      json.updatedAt,
      properties
    );
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data.id = this.id;
    data.name = this.name;
    data.identifier = this.identifier;
    data.status = this.status;
    data.nodeType = this.nodeType;
    data.shortDescription = this.shortDescription;
    data.image = this.image;
    data.createdAt = this.createdAt;
    data.updatedAt = this.updatedAt;
    if (this.properties) {
      data.properties = this.properties.map((v) => v.toJson());
    }
    return data;
  }
}

class Properties {
  id?: string;
  nodeId?: string;
  property?: string;
  propertyValue?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    id?: string,
    nodeId?: string,
    property?: string,
    propertyValue?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.nodeId = nodeId;
    this.property = property;
    this.propertyValue = propertyValue;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(json: Record<string, any>): Properties {
    return new Properties(
      json.id,
      json.nodeId,
      json.property,
      json.propertyValue,
      json.createdAt,
      json.updatedAt
    );
  }

  toJson(): Record<string, any> {
    const data: Record<string, any> = {};
    data.id = this.id;
    data.nodeId = this.nodeId;
    data.property = this.property;
    data.propertyValue = this.propertyValue;
    data.createdAt = this.createdAt;
    data.updatedAt = this.updatedAt;
    return data;
  }
}

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
