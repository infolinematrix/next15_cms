import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";

export const client = drizzle(process.env.DATABASE_URL!, { schema });

// const client = drizzle(process.env.DATABASE_URL!);
export const db = client;
// const client = postgres(process.env.DATABASE_URL);
// export const db = drizzle(client, { schema });
