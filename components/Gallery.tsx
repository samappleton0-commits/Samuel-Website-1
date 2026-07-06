"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

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

  // Lightbox state
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8">
        Gallery
      </h2>

      {/* Carousel */}
      <div className="overflow-hidden max-w-5xl mx-auto px-4" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="min-w-full px-2">

              {/* IMAGE CARD */}
              <div
                className="relative rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >

                {/* Image with zoom effect */}
                <div className="overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.title}
                    width={1200}
                    height={700}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover 
                    transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Glass Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent 
                  opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                  transition duration-500 flex items-end">

                  <div className="p-4 text-white 
                    backdrop-blur-md bg-white/10 rounded-xl m-4 
                    transform sm:translate-y-4 sm:group-hover:translate-y-0 
                    transition duration-500">

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

      {/* LIGHTBOX (fullscreen viewer) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full px-4">
            
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1400}
              height={900}
              className="w-full h-auto rounded-xl object-contain"
            />

            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">
                {selectedImage.title}
              </h3>
              <p className="text-sm opacity-80">
                {selectedImage.desc}
              </p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}