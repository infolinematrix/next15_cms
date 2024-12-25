import { ContentSection } from "./content-section";

import { CategoryCard } from "./category-card";
import { categories } from "@/data/categories";

export const ShopByCategory = () => {
  return (
    <ContentSection
      title="Shop By Category"
      description="Explore products from around the world"
      href="#"
      linkText="View all products"
      className="pt-14 md:pt-20 lg:pt-24"
    >
      {categories.map((category: any) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </ContentSection>
  );
};
