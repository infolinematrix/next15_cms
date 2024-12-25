import { customAlphabet } from "nanoid";

const prefixes = {
  store: "str",
  product: "prd",
  category: "cat",
  subcategory: "sub",
  cart: "crt",
  subscription: "sub",
  payment: "pay",
  address: "adr",
  order: "ord",
  notification: "not",
};

interface GenerateIdOptions {
  /**
   * The length of the generated ID.
   * @default 16
   * @example 16 => "abc123def456ghi7"
   * */
  length?: number;
  /**
   * The separator to use between the prefix and the generated ID.
   * @default "_"
   * @example "_" => "str_abc123"
   * */
  separator?: string;
}

export function generateId(
  prefix?: keyof typeof prefixes,
  { length = 36, separator = "_" }: GenerateIdOptions = {}
) {
  const id = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();
  return prefix ? `${prefixes[prefix]}${separator}${id}` : id;
}
