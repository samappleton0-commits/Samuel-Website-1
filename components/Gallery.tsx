"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

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
    duration: 30,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Gallery
      </h2>

      <div
        className="overflow-hidden max-w-5xl mx-auto px-4"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="min-w-full px-2">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                width={1200}
                height={700}
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-xl"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}