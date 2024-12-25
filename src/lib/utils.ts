import { clsx, type ClassValue } from "clsx";
// import { writeFile } from "fs/promises";
import { join } from "path";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXTAUTH_URL}${path}`;
}

export function formatPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: opts.currency ?? "USD",
    notation: opts.notation ?? "compact",
    ...opts,
  }).format(Number(price));
}

export function formatNumber(
  number: number | string,
  opts: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("en-US", {
    style: opts.style ?? "decimal",
    notation: opts.notation ?? "standard",
    minimumFractionDigits: opts.minimumFractionDigits ?? 0,
    maximumFractionDigits: opts.maximumFractionDigits ?? 2,
    ...opts,
  }).format(Number(number));
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function generateRandomString(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

/* 
Example usage:
const filename = 'image.jpg';
const { filename: name, extension } = getFileNameAndExtension(filename);
*/

export function getFileNameAndExtension(filename: string) {
  const parts = filename.split(".");
  const extension = parts.pop(); // Remove the last part (extension)
  const filenameWithoutExtension = parts.join(".");

  return {
    filename: filenameWithoutExtension,
    extension: extension,
  };
}

export async function uploadFile(file: any) {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    const path = join(process.cwd(), filename);

    // const fs = require("fs").promises;
    // await fs.writeFile(path, buffer);
  } catch (error) {
    throw error;
  }
}
