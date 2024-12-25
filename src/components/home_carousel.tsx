import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HomeCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="flex 1aspect-square items-center justify-center p-0">
                <Image
                  src="/banners/banner_1.png" // Path to your image (public folder or remote)
                  alt="Description of image"
                  width={1400} // Desired width
                  height={400} // Desired height
                  priority // Optional: Preload the image
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        {/* -- */}
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="flex 1aspect-square items-center justify-center p-0">
                <Image
                  src="/banners/banner_2.png" // Path to your image (public folder or remote)
                  alt="Description of image"
                  width={1400} // Desired width
                  height={400} // Desired height
                  priority // Optional: Preload the image
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
