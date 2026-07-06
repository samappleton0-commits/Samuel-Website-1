"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";

const images = [
  "/gallery/image1.png",
  "/gallery/image2.png",
  "/gallery/image3.png",
  "/gallery/image4.png",
];

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
  });

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      autoplay();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay]);

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8">
        Gallery
      </h2>

      {/* Hover pause wrapper */}
      <div
        className="overflow-hidden max-w-5xl mx-auto px-4"
        ref={emblaRef}
        onMouseEnter={() => emblaApi && emblaApi.stopAutoplay?.()}
        onMouseLeave={() => {
          if (!emblaApi) return;
          // restart by triggering scroll loop again
          const interval = setInterval(() => {
            emblaApi.scrollNext();
          }, 3000);

          return () => clearInterval(interval);
        }}
      >
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className="min-w-[85%] sm:min-w-full px-2"
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1200}
                height={700}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}