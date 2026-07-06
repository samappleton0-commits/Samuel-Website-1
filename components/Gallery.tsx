"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";

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

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [autoplayActive, setAutoplayActive] = useState(true);

  // Autoplay
  useEffect(() => {
    if (!emblaApi || !autoplayActive) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [emblaApi, autoplayActive]);

  // Track selected index (for dots + lightbox navigation)
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Lightbox navigation
  const openImage = (index) => {
    setSelectedIndex(index);
    setSelectedImage(images[index]);
    setAutoplayActive(false); // pause autoplay
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setAutoplayActive(true); // resume autoplay
  };

  const prevImage = () => {
    const newIndex =
      (selectedIndex - 1 + images.length) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const nextImage = () => {
    const newIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-8">
        Gallery
      </h2>

      {/* CAROUSEL */}
      <div className="overflow-hidden max-w-5xl mx-auto px-4" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="min-w-full px-2">

              <div
                className="relative rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => openImage(index)}
              >

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

                {/* Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent 
                  flex items-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-500">

                  <div className="p-4 text-white">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    <p className="text-sm opacity-80">{image.desc}</p>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOT INDICATORS (LIGHTBOX) */}
      {selectedImage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedIndex(i);
                setSelectedImage(images[i]);
              }}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === selectedIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-40"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >

            {/* IMAGE */}
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1400}
              height={900}
              className="w-full h-auto rounded-xl object-contain"
            />

            {/* CAPTION */}
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">
                {selectedImage.title}
              </h3>
              <p className="text-sm opacity-80">
                {selectedImage.desc}
              </p>
            </div>

            {/* NAV BUTTONS */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl px-3"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl px-3"
            >
              ›
            </button>

          </div>
        </div>
      )}
    </section>
  );
}