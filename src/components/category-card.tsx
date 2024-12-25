import { cn } from "@/lib/utils";
import { Card, CardHeader } from "./ui/card";
import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "./ui/aspect-ratio";
import { PlaceholderImage } from "./placeholder-image";

interface CategoryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: any;
}

export const CategoryCard = ({
  category,
  className,
  ...props
}: CategoryCardProps) => {
  return (
    <>
      <Card
        className={cn("size-full overflow-hidden rounded-lg", className)}
        {...props}
      >
        <Link aria-label={category.title} href="#">
          <CardHeader className="border-b p-0">
            <AspectRatio ratio={4 / 4}>
              {category.images?.length ? (
                <Image
                  key={category.images[0]?.url}
                  src={
                    category.images[0]?.url ??
                    "/images/product-placeholder.webp"
                  }
                  alt={category.images[0]?.url ?? category.title}
                  className="object-cover"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 75px) 50vw, 100vw"
                  fill
                  loading="lazy"
                />
              ) : (
                <PlaceholderImage className="rounded-none" asChild />
              )}
            </AspectRatio>
          </CardHeader>
        </Link>
      </Card>
    </>
  );
};
