"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const images = [
  {
    src: "/gallery/image1.png",
    title: "Sunset View",
    desc: "A calm sunset over the hills",
  },
  {
    src: "/gallery/image2.png",
    title: "Mountain Peak",
    desc: "Snow-covered mountain at dawn",
  },
  {
    src: "/gallery/image3.png",
    title: "City Lights",
    desc: "Night skyline view",
  },
  {
    src: "/gallery/image4.png",
    title: "Ocean Breeze",
    desc: "Waves hitting the shore",
  },
];

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000); // balanced speed

    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8">
        Gallery
      </h2>

      <div className="overflow-hidden max-w-5xl mx-auto px-4" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="min-w-full px-2">
              
              <div className="relative rounded-xl overflow-hidden group">

                <Image
                  src={image.src}
                  alt={image.title}
                  width={1200}
                  height={700}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />

                {/* Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                  opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                  transition duration-500 flex items-end">

                  <div className="p-4 text-white transform sm:translate-y-4 sm:group-hover:translate-y-0 transition duration-500">
                    
                    <h3 className="text-lg font-semibold">
                      {image.title}
                    </h3>

                    <p className="text-sm opacity-80">
                      {image.desc}
                    </p>

                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}