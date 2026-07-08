'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'


const albums = [
  {
    name: 'Liberia',
    description:
      'Beautiful landscapes, culture, and memorable moments from Liberia.',
    images: [
      {
        src: '/gallery/image1.png',
        title: 'Sunset View',
        desc: 'A peaceful sunset landscape.',
      },
      {
        src: '/gallery/image2.png',
        title: 'Mountain Peak',
        desc: 'A beautiful natural view.',
      },
    ],
  },


  {
    name: 'Zambia',
    description:
      'Exploring urban life, scenery, and experiences from Zambia.',
    images: [
      {
        src: '/gallery/image3.png',
        title: 'City Lights',
        desc: 'Night views and city atmosphere.',
      },
      {
        src: '/gallery/image4.png',
        title: 'Ocean Breeze',
        desc: 'A beautiful city environment.',
      },
    ],
  },


  {
    name: 'Family',
    description:
      'Special memories and moments shared with family.',
    images: [
      {
        src: '/gallery/image3.png',
        title: 'Family Moment',
        desc: 'A memorable experience.',
      },
      {
        src: '/gallery/image4.png',
        title: 'Together',
        desc: 'Moments worth remembering.',
      },
    ],
  },


  {
    name: 'Travel',
    description:
      'Places explored and experiences collected along the journey.',
    images: [
      {
        src: '/gallery/image3.png',
        title: 'Travel View',
        desc: 'Discovering new places.',
      },
      {
        src: '/gallery/image4.png',
        title: 'Adventure',
        desc: 'Exploring different environments.',
      },
    ],
  },
]



export default function Gallery() {

  const [activeAlbum, setActiveAlbum] = useState(0)


  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  })


  const currentAlbum = albums[activeAlbum]



  // Auto slide
  useEffect(() => {

    if (!emblaApi) return


    const timer = setInterval(() => {

      emblaApi.scrollNext()

    }, 4000)


    return () => clearInterval(timer)


  }, [emblaApi])




  // Reset slider when album changes
  useEffect(() => {

    emblaApi?.scrollTo(0)

  }, [activeAlbum, emblaApi])



  return (

    <section
      id="gallery"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >


      <SectionHeading

        eyebrow="Gallery"

        title="Memories & Experiences"

        description="
        A collection of moments from Liberia, Zambia, travel, and family memories.
        Each image represents experiences, culture, and personal growth.
        "

      />



      <Reveal delay={1}>


        <div className="mt-12 glass rounded-3xl p-6 text-center sm:p-8">



          {/* Album Buttons */}

          <div className="mb-8 flex flex-wrap justify-center gap-3">


            {albums.map((album,index)=>(


              <button

                key={album.name}

                onClick={()=>setActiveAlbum(index)}

                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  
                  activeAlbum === index

                  ?

                  'bg-primary text-primary-foreground'

                  :

                  'bg-surface text-muted-foreground hover:text-foreground'

                }`}

              >

                {album.name}

              </button>


            ))}


          </div>





          {/* Album Description */}

          <div className="mb-8 text-center">


            <p className="text-sm text-muted-foreground">

              {currentAlbum.description}

            </p>


          </div>







          {/* Carousel */}

          <div

            ref={emblaRef}

            className="overflow-hidden rounded-2xl"

          >

            <div className="flex">


              {currentAlbum.images.map((image,index)=>(


                <div

                  key={index}

                  className="min-w-full px-2"

                >


                  <div className="group relative overflow-hidden rounded-2xl">


                    <Image

                      src={image.src}

                      alt={image.title}

                      width={1200}

                      height={700}

                      className="
                      h-[300px]
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                      sm:h-[400px]
                      md:h-[500px]
                      "

                    />




                    <div

                      className="
                      absolute
                      inset-0
                      flex
                      items-end
                      bg-gradient-to-t
                      from-black/70
                      via-black/20
                      to-transparent
                      opacity-100
                      transition
                      sm:opacity-0
                      sm:group-hover:opacity-100
                      "

                    >


                      <div className="p-6 text-white">


                        <h3 className="text-xl font-semibold">

                          {image.title}

                        </h3>


                        <p className="mt-1 text-sm text-white/80">

                          {image.desc}

                        </p>


                      </div>


                    </div>


                  </div>


                </div>


              ))}


            </div>


          </div>




        </div>


      </Reveal>


    </section>

  )

}