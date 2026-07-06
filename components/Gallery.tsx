"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const images = [
  "/gallery/image1.png",
  "/gallery/image2.png",
  "/gallery/image3.png",
  "/gallery/image5.png",
];

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8">
        Gallery
      </h2>

      <div
        className="overflow-hidden max-w-5xl mx-auto"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="min-w-full">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1200}
                height={700}
                className="w-full h-[500px] object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}