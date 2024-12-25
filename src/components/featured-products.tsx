import { ContentSection } from "./content-section";
import { products } from "@/data/products";
import { ProductCard } from "./product-card";

export const FeaturedProducts = () => {
  return (
    <ContentSection
      title="Featured products"
      description="Explore products from around the world"
      href="#"
      linkText="View all products"
      className="pt-14 md:pt-20 lg:pt-24"
    >
      {products.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ContentSection>
  );
};
