"use server";

import { db } from "@/db";
import { pickup } from "@/db/schema/pickup";
import { eq } from "drizzle-orm";

class Garment {
  sizes: string[];
  colors: string[];

  constructor(sizes: string[], colors: string[]) {
    this.sizes = sizes;
    this.colors = colors;
  }
  static async getAllColors(): Promise<string[]> {
    const pickups = await db.query.pickup.findMany({
      columns: {
        value: true,
      },
      where: eq(pickup.code, "GARMENTS_COLOR"),
    });
    return pickups.map((p) => p.value);
  }
  static async getAllSizes(): Promise<string[]> {
    const pickups = await db.query.pickup.findMany({
      columns: {
        value: true,
      },
      where: eq(pickup.code, "GARMENTS_SIZE"),
    });
    return pickups.map((p) => p.value);
  }
  static async initialize(): Promise<Promise<Garment>> {
    return new Garment(await this.getAllSizes(), await this.getAllColors());
  }
}
export default Garment;

//--

// export const GarmentObject = await Garment.initialize();
// const s: string[] = GarmentObject.sizes;
// console.log(s);
