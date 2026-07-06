"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";

const albums = [
  {
    name: "Liberia",
    description: "Beautiful natural landscapes and scenery",
    images: [
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
    ],
  },
  {
    name: "Zambia",
    description: "Urban life and night city views",
    images: [
      {
        src: "/gallery/image3.png",
        title: "City Lights",
        desc: "Night skyline view",
      },
      {
        src: "/gallery/image4.png",
        title: "Ocean Breeze City",
        desc: "City by the sea",
      },
    ],
  },

  {
    name: "Family",
    description: "Urban life and night city views",
    images: [
      {
        src: "/gallery/image3.png",
        title: "City Lights",
        desc: "Night skyline view",
      },
      {
        src: "/gallery/image4.png",
        title: "Ocean Breeze City",
        desc: "City by the sea",
      },
    ],
  },

    {
    name: "Travel",
    description: "Urban life and night city views",
    images: [
      {
        src: "/gallery/image3.png",
        title: "City Lights",
        desc: "Night skyline view",
      },
      {
        src: "/gallery/image4.png",
        title: "Ocean Breeze City",
        desc: "City by the sea",
      },
    ],
  },

];

export default function Gallery() {
  const [activeAlbum, setActiveAlbum] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const currentAlbum = albums[activeAlbum];

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [emblaApi, activeAlbum]);

  // Reset carousel when album changes
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [activeAlbum, emblaApi]);

  const onSelectAlbum = (index) => {
    setActiveAlbum(index);
  };

  return (
    <section className="py-20">

      {/* TITLE */}
      <h2 className="text-4xl font-bold text-center mb-2">
        Gallery
      </h2>

      <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto">
        My gallery captures memories from Liberia and Zambia, highlighting culture, landscapes, and everyday life.
        Each image reflects moments of exploration, connection, and growth across both countries.
      </p>

      {/* TABS */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {albums.map((album, index) => (
          <button
            key={index}
            onClick={() => onSelectAlbum(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeAlbum === index
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            {album.name}
          </button>
        ))}
      </div>

      {/* ALBUM DESCRIPTION */}
      <div className="text-center mb-6">
        <p className="text-gray-500 max-w-xl mx-auto">
          {currentAlbum.description}
        </p>
      </div>

      {/* CAROUSEL */}
      <div className="overflow-hidden max-w-5xl mx-auto px-4" ref={emblaRef}>
        <div className="flex">
          {currentAlbum.images.map((image, index) => (
            <div key={index} className="min-w-full px-2">

              <div className="relative rounded-xl overflow-hidden group">

                {/* IMAGE */}
                <Image
                  src={image.src}
                  alt={image.title}
                  width={1200}
                  height={700}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover
                  transition-transform duration-700 group-hover:scale-110"
                />

                {/* CAPTION OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent
                  flex items-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">

                  <div className="p-4 text-white">
                    <h4 className="text-lg font-semibold">
                      {image.title}
                    </h4>
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