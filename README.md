Nextjs (Frontend & Backend), PostgreSQL, Shadcn (tailwindcss)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Technology:

Nextjs (Frontend & Backend), PostgreSQL, Shadcn (tailwindcss)

an e-commerce platform where different product categories have unique attributes. For instance, a "mobile phone" might have attributes like "memory" and "screen size," while a "garment" might have attributes like "color" and "size." This variability makes it challenging to create a rigid, one-size-fits-all attribute system.

---

To handle the diverse attributes of different product categories, we're using a flexible approach. We've created different "content types" (like "mobile phone" and "garment") to define the specific attributes for each category. This allows us to dynamically generate forms for sellers to add products, ensuring that only relevant attributes are displayed. The attribute data for each product will be stored in a database using a format that can handle various types of information.

---

Chalanges:

1. Filtering data according to attributes
2. Price varibales according to attributes
