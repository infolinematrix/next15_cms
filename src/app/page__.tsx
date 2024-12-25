import { ContentSection } from "@/components/content-section";
import { HomeCarousel } from "@/components/home_carousel";
import { Shell } from "@/components/layout/shell";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { FeaturedProducts } from "@/components/featured-products";
import { ShopByCategory } from "@/components/shop-by-category";

export default function Home() {
  return (
    <Shell className="max-w-7xl gap-0 px-5 lg:px-0">
      {/* ------ */}
      {/* <HomeCarousel /> */}

      {/* ------Shop by Category */}
      <ShopByCategory />

      {/* ------ */}
      <FeaturedProducts />
      {/* ==== */}
    </Shell>
  );
}
