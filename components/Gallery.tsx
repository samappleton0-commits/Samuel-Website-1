'use client'

// ===== START: Gallery Part 1 =====

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'


// ==============================
// Gallery Data
// ==============================

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
        desc: 'A beautiful environment and travel experience.',
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
        src: '/gallery/image1.png',
        title: 'Travel View',
        desc: 'Discovering new places.',
      },
      {
        src: '/gallery/image2.png',
        title: 'Adventure',
        desc: 'Exploring different environments.',
      },
    ],
  },
]


// ===== END: Gallery Part 1 =====

// ===== START: Gallery Part 2 =====


// ==============================
// Gallery Component Logic
// ==============================

export default function Gallery() {


  const [activeAlbum, setActiveAlbum] = useState(0)

  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)


  const [emblaRef, emblaApi] = useEmblaCarousel({

    loop: true,

    align: 'center',

  })


  const currentAlbum = albums[activeAlbum]



  // ==============================
  // Auto Slideshow
  // ==============================

  useEffect(() => {


    if (!emblaApi || isLightboxOpen) return



    const timer = setInterval(() => {


      emblaApi.scrollNext()


    }, 4000)



    return () => clearInterval(timer)



  }, [emblaApi, isLightboxOpen])





  // ==============================
  // Reset carousel when album changes
  // ==============================

  useEffect(() => {


    emblaApi?.scrollTo(0)


  }, [activeAlbum, emblaApi])






  // ==============================
  // Lightbox Navigation
  // ==============================


  const openLightbox = (index:number) => {


    setSelectedImage(index)

    setIsLightboxOpen(true)


  }





  const closeLightbox = () => {


    setIsLightboxOpen(false)

    setSelectedImage(null)


  }






  const nextImage = () => {


    if (selectedImage === null) return



    const next =
      (selectedImage + 1) %
      currentAlbum.images.length



    setSelectedImage(next)


  }







  const previousImage = () => {


    if (selectedImage === null) return



    const previous =
      (selectedImage -
        1 +
        currentAlbum.images.length) %
      currentAlbum.images.length



    setSelectedImage(previous)


  }






  // ==============================
  // Keyboard Controls
  // ==============================


  useEffect(() => {


    const handleKeyboard = (event: KeyboardEvent) => {


      if (!isLightboxOpen) return



      if (event.key === 'ArrowRight') {


        nextImage()


      }



      if (event.key === 'ArrowLeft') {


        previousImage()


      }



      if (event.key === 'Escape') {


        closeLightbox()


      }


    }





    window.addEventListener(
      'keydown',
      handleKeyboard
    )



    return () => {


      window.removeEventListener(
        'keydown',
        handleKeyboard
      )


    }



  }, [isLightboxOpen, selectedImage])



// ===== END: Gallery Part 2 =====

// ===== START: Gallery Part 3 =====


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



          {/* ==============================
              Album Tabs
          =============================== */}


          <div className="mb-8 flex flex-wrap justify-center gap-3">


            {albums.map((album,index)=>(


              <motion.button

                key={album.name}

                onClick={()=>setActiveAlbum(index)}


                whileTap={{
                  scale:0.95
                }}


                className={`
                rounded-full
                px-5
                py-2
                text-sm
                font-medium
                transition-all
                ${
                activeAlbum === index

                ?

                'bg-primary text-primary-foreground shadow-lg'

                :

                'bg-surface text-muted-foreground hover:text-foreground'
                }
                `}

              >

                {album.name}

              </motion.button>


            ))}


          </div>







          {/* ==============================
              Album Description
          =============================== */}


          <AnimatePresence mode="wait">


            <motion.p

              key={currentAlbum.name}

              initial={{
                opacity:0,
                y:10
              }}

              animate={{
                opacity:1,
                y:0
              }}

              exit={{
                opacity:0,
                y:-10
              }}


              className="
              mb-8
              text-sm
              text-muted-foreground
              "

            >

              {currentAlbum.description}


            </motion.p>


          </AnimatePresence>







          {/* ==============================
              Carousel
          =============================== */}



          <div

            ref={emblaRef}

            className="
            overflow-hidden
            rounded-2xl
            "

          >


            <div className="flex">


              {currentAlbum.images.map((image,index)=>(


                <div

                  key={index}

                  className="
                  min-w-full
                  px-2
                  "

                >



                  <motion.div


                    whileHover={{
                      scale:1.02
                    }}


                    className="
                    group
                    relative
                    cursor-pointer
                    overflow-hidden
                    rounded-2xl
                    "


                    onClick={()=>openLightbox(index)}


                  >



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



                      <div className="
                      p-6
                      text-left
                      text-white
                      ">


                        <h3 className="
                        text-xl
                        font-semibold
                        ">

                          {image.title}

                        </h3>


                        <p className="
                        mt-1
                        text-sm
                        text-white/80
                        ">

                          {image.desc}

                        </p>


                      </div>


                    </div>



                  </motion.div>



                </div>


              ))}



            </div>


          </div>





          {/* ==============================
              Carousel Indicators
          =============================== */}



          <div className="
          mt-6
          flex
          justify-center
          gap-2
          ">


            {currentAlbum.images.map((_,index)=>(


              <button

                key={index}

                onClick={()=>emblaApi?.scrollTo(index)}

                className="
                h-2
                w-2
                rounded-full
                bg-muted-foreground/50
                transition
                hover:scale-125
                "

              />


            ))}


          </div>



          {/* ==============================
              Carousel Previous / Next Buttons
          =============================== */}


          <div className="
          mt-8
          flex
          justify-center
          gap-4
          ">


            <button

              onClick={()=>emblaApi?.scrollPrev()}

              className="
              rounded-full
              bg-surface
              px-5
              py-2
              text-sm
              transition
              hover:scale-105
              "

            >

              ← Previous

            </button>



            <button

              onClick={()=>emblaApi?.scrollNext()}

              className="
              rounded-full
              bg-primary
              px-5
              py-2
              text-sm
              text-primary-foreground
              transition
              hover:scale-105
              "

            >

              Next →

            </button>


          </div>



        </div>


      </Reveal>






      {/* ==============================
          Fullscreen Lightbox
      =============================== */}



      <AnimatePresence>


        {isLightboxOpen && selectedImage !== null && (


          <motion.div


            initial={{
              opacity:0
            }}


            animate={{
              opacity:1
            }}


            exit={{
              opacity:0
            }}


            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/90
            px-4
            "


            onClick={closeLightbox}


          >





            <button

              onClick={closeLightbox}

              className="
              absolute
              right-6
              top-6
              text-3xl
              text-white
              "

            >

              ✕

            </button>







            <button

              onClick={(e)=>{

                e.stopPropagation()

                previousImage()

              }}

              className="
              absolute
              left-4
              rounded-full
              bg-white/20
              px-4
              py-2
              text-2xl
              text-white
              "

            >

              ←

            </button>







            <motion.div


              key={selectedImage}


              initial={{
                scale:0.9,
                opacity:0
              }}


              animate={{
                scale:1,
                opacity:1
              }}


              transition={{
                duration:0.3
              }}


              className="
              relative
              max-h-[85vh]
              max-w-5xl
              "


              onClick={(e)=>e.stopPropagation()}


            >



              <Image


                src={
                  currentAlbum.images[selectedImage].src
                }


                alt={
                  currentAlbum.images[selectedImage].title
                }


                width={1400}

                height={900}


                className="
                max-h-[85vh]
                w-auto
                rounded-2xl
                object-contain
                "

              />





              <div className="
              absolute
              bottom-4
              left-1/2
              -translate-x-1/2
              rounded-full
              bg-black/60
              px-4
              py-2
              text-sm
              text-white
              ">


                {selectedImage + 1}

                /

                {currentAlbum.images.length}


              </div>



            </motion.div>








            <button

              onClick={(e)=>{

                e.stopPropagation()

                nextImage()

              }}


              className="
              absolute
              right-4
              rounded-full
              bg-white/20
              px-4
              py-2
              text-2xl
              text-white
              "


            >

              →

            </button>




          </motion.div>


        )}


      </AnimatePresence>






    </section>


  )


}


// ===== END: Gallery Part 4 =====