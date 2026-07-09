

'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ZoomIn } from "lucide-react";



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
        src: '/gallery/lib3.webp',
        title: 'UL Graduation',
        desc: 'BBA in Accounting',
      },

      {
        src: '/gallery/lib2.webp',
        title: 'UNIDO Training',
        desc: 'Two weeks Training in Kakata',
      },
      {
        src: '/gallery/lib1.webp',
        title: 'UNIDO Training',
        desc: 'Two weeks Training in Kakata',
      },

      {
        src: '/gallery/lib5.webp',
        title: 'UL Graduation Celebration',
        desc: 'Members of FFF',
      },
      {
        src: '/gallery/lib4.webp',
        title: 'Orange Digital Center',
        desc: 'Trainng in Quickbooks',
      },

      {
        src: '/gallery/image2.webp',
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
        src: '/gallery/zm6.webp',
        title: 'ICT Team',
        desc: 'ICT Team Members from Liberia.',
      },

      {
        src: '/gallery/zm7.webp',
        title: 'Zambia Job Fair',
        desc: 'Representing ZUT at the Job Fair',
      },

      {
        src: '/gallery/zm3.webp',
        title: 'City Light',
        desc: 'Night views and city atmosphere.',
      },

      {
        src: '/gallery/zm2.webp',
        title: 'Ocean Breeze',
        desc: 'A beautiful travel environment.',
      },

      {
        src: '/gallery/zm4.webp',
        title: 'Trip to Victoria Fall',
        desc: 'A night spent in Choma enroute to Victoria Fall',
      },

      {
        src: '/gallery/zm1.webp',
        title: 'Zambia Job Fair',
        desc: 'Representing ZUT at the Job Fair',
      },



    ],
  },



  {
    name: 'Family',

    description:
      'Special memories and moments shared with family.',

    images: [

      {
        src: '/gallery/fam2.webp',
        title: 'Me and My Daughter',
        desc: 'A memorable experience.',
      },

      {
        src: '/gallery/fam1.webp',
        title: 'My Daughter',
        desc: 'Grace 2yrs Birthday Shoot',
      },

    ],
  },



  {
    name: 'Travel',

    description:
      'Places explored and experiences collected along the journey.',

    images: [

      {
        src: '/gallery/Travel1.webp',
        title: 'At the Zoo in Zambia',
        desc: 'Discovering new places.',
      },

      {
        src: '/gallery/Travel2.webp',
        title: 'The Victoria Fall',
        desc: 'Exploring different environments.',
      },

    ],
  },


]

export default function Gallery() {


  const [activeAlbum, setActiveAlbum] = useState(0)


  const [selectedImage, setSelectedImage] = useState<number>(0)


  const [isLightboxOpen, setIsLightboxOpen] = useState(false)


  const [isImageLoading, setIsImageLoading] = useState(true)



  const currentAlbum = albums[activeAlbum]




  const [emblaRef, emblaApi] = useEmblaCarousel({

    loop: true,

    align: 'center',

  })





  // ==============================
  // Main Carousel Auto Play
  // ==============================


  useEffect(() => {


    if (!emblaApi || isLightboxOpen) return



    const timer = setInterval(() => {


      emblaApi.scrollNext()


    }, 4000)



    return () => clearInterval(timer)



  }, [emblaApi, isLightboxOpen])







  // ==============================
  // Reset Carousel On Album Change
  // ==============================


  useEffect(() => {


    emblaApi?.scrollTo(0)


  }, [activeAlbum, emblaApi])








  // ==============================
  // Lightbox Controls
  // ==============================



  const openLightbox = (index:number) => {


    setSelectedImage(index)


    setIsImageLoading(true)


    setIsLightboxOpen(true)


  }






  const closeLightbox = () => {


    setIsLightboxOpen(false)


  }







  const nextImage = useCallback(() => {


    setSelectedImage((current)=>


      (current + 1) %

      currentAlbum.images.length


    )


    setIsImageLoading(true)


  },[currentAlbum])







  const previousImage = useCallback(() => {


    setSelectedImage((current)=>


      (current - 1 + currentAlbum.images.length) %

      currentAlbum.images.length


    )


    setIsImageLoading(true)


  },[currentAlbum])








  // ==============================
  // Keyboard Navigation
  // ==============================


  useEffect(() => {


    const handleKeyboard = (event:KeyboardEvent)=>{


      if(!isLightboxOpen) return




      if(event.key === 'ArrowRight'){


        nextImage()


      }



      if(event.key === 'ArrowLeft'){


        previousImage()


      }




      if(event.key === 'Escape'){


        closeLightbox()


      }


    }




    window.addEventListener(

      'keydown',

      handleKeyboard

    )





    return ()=>{


      window.removeEventListener(

        'keydown',

        handleKeyboard

      )


    }



  },[
    isLightboxOpen,
    nextImage,
    previousImage
  ])









  // ==============================
  // Touch Swipe Support
  // ==============================


  const [touchStart,setTouchStart] = useState<number | null>(null)



  const [touchEnd,setTouchEnd] = useState<number | null>(null)





  const handleTouchStart = (
    e:React.TouchEvent
  )=>{


    setTouchStart(
      e.targetTouches[0].clientX
    )


  }






  const handleTouchMove = (
    e:React.TouchEvent
  )=>{


    setTouchEnd(
      e.targetTouches[0].clientX
    )


  }






  const handleTouchEnd = ()=>{


    if(!touchStart || !touchEnd) return



    const distance =
      touchStart - touchEnd





    if(distance > 50){


      nextImage()


    }



    if(distance < -50){


      previousImage()


    }



    setTouchStart(null)

    setTouchEnd(null)


  }



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


        <div className="
        mt-12
        glass
        rounded-3xl
        p-6
        text-center
        sm:p-8
        ">




          {/* Album Tabs */}


          <div className="
          mb-8
          flex
          flex-wrap
          justify-center
          gap-3
          ">



            {albums.map((album,index)=>(


              <motion.button


                key={album.name}


                onClick={()=>setActiveAlbum(index)}


                whileTap={{
                  scale:.95
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







          {/* Description */}



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








          {/* Carousel */}



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



                    onClick={()=>openLightbox(index)}



                    className="
                    group
                    relative
                    cursor-pointer
                    overflow-hidden
                    rounded-2xl
                    "


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
                          object-center
                          transition-all
                          duration-700
                          group-hover:scale-105
                          group-hover:brightness-75
                          sm:h-[400px]
                          md:h-[500px]
                          "


                    />






<div
  className="
  absolute
  inset-0
  bg-black/55
  flex
  flex-col
  items-center
  justify-center
  opacity-0
  group-hover:opacity-100
  transition-all
  duration-300
"
>

  <div
    className="
    rounded-full
    bg-white/20
    p-4
    backdrop-blur-sm
    mb-4
  "
  >
    <ZoomIn className="h-10 w-10 text-white" />
  </div>

  <h3
    className="
    text-xl
    font-semibold
    text-white
  "
  >
    Click to view full image
  </h3>

  <p
    className="
    mt-2
    text-sm
    text-white/80
  "
  >
    {image.title}
  </p>

</div>





                  </motion.div>




                </div>


              ))}



            </div>


          </div>








          {/* Indicators */}



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







          {/* Navigation Buttons */}



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
  font-medium
  text-foreground
  transition-all
  duration-300
  hover:bg-primary
  hover:text-primary-foreground
  hover:scale-105
  hover:shadow-lg
  "

>
  ← Previous

</button>



<button

  onClick={()=>emblaApi?.scrollNext()}

  className="
  rounded-full
  bg-surface
  px-5
  py-2
  text-sm
  font-medium
  text-foreground
  transition-all
  duration-300
  hover:bg-primary
  hover:text-primary-foreground
  hover:scale-105
  hover:shadow-lg
  "

>
  Next →

</button>




          </div>





        </div>


      </Reveal>

      {/* ==============================
          Premium Fullscreen Lightbox
      =============================== */}



      <AnimatePresence>


        {isLightboxOpen && (



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
            bg-black/95
            p-4
            "



            onClick={closeLightbox}



            onTouchStart={handleTouchStart}

            onTouchMove={handleTouchMove}

            onTouchEnd={handleTouchEnd}



          >







            {/* Close Button */}



            <button


              onClick={closeLightbox}


              className="
              absolute
              right-5
              top-5
              z-20
              rounded-full
              bg-white/20
              px-4
              py-2
              text-2xl
              text-white
              "

            >

              ✕


            </button>








            {/* Previous Button */}



            <button


              onClick={(e)=>{


                e.stopPropagation()

                previousImage()


              }}



              className="
              absolute
              left-4
              z-20
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









            {/* Image Area */}



            <div


              onClick={(e)=>e.stopPropagation()}



              className="
              flex
              max-h-[90vh]
              w-full
              max-w-6xl
              flex-col
              items-center
              "


            >






              <div className="
              relative
              flex
              h-[65vh]
              w-full
              items-center
              justify-center
              ">






                {isImageLoading && (


                  <div className="
                  absolute
                  text-white
                  ">


                    Loading...


                  </div>


                )}






                <motion.div



                  key={selectedImage}



                  initial={{
                    opacity:0,
                    scale:.95
                  }}



                  animate={{
                    opacity:1,
                    scale:1
                  }}



                  transition={{
                    duration:.3
                  }}




                  className="
                  relative
                  h-full
                  w-full
                  "



                >



                  <Image


                    src={
                      currentAlbum.images[selectedImage].src
                    }



                    alt={
                      currentAlbum.images[selectedImage].title
                    }



                    fill



                    onLoad={()=>setIsImageLoading(false)}



                    className="
                    rounded-2xl
                    object-contain
                    "


                  />



                </motion.div>



              </div>









              {/* Caption */}



              <div className="
              mt-4
              text-center
              text-white
              ">



                <h3 className="
                text-xl
                font-semibold
                ">


                  {
                    currentAlbum.images[selectedImage].title
                  }


                </h3>





                <p className="
                mt-1
                text-sm
                text-white/70
                ">


                  {
                    currentAlbum.images[selectedImage].desc
                  }


                </p>





                <p className="
                mt-2
                text-sm
                text-white/50
                ">


                  {selectedImage + 1}

                  /

                  {currentAlbum.images.length}


                </p>



              </div>









              {/* Thumbnail Strip */}



              <div className="
              mt-6
              flex
              max-w-full
              gap-3
              overflow-x-auto
              pb-2
              ">





                {currentAlbum.images.map((image,index)=>(



                  <button


                    key={index}



                    onClick={()=>{


                      setSelectedImage(index)

                      setIsImageLoading(true)


                    }}



                    className={`
                    relative
                    h-16
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border-2
                    transition

                    ${
                      selectedImage === index

                      ?

                      'border-primary scale-110'

                      :

                      'border-transparent opacity-70 hover:opacity-100'

                    }

                    `}



                  >




                    <Image


                      src={image.src}


                      alt={image.title}


                      fill


                      className="
                      object-cover
                      "


                    />



                  </button>



                ))}



              </div>





            </div>









            {/* Next Button */}



            <button


              onClick={(e)=>{


                e.stopPropagation()

                nextImage()


              }}



              className="
              absolute
              right-4
              z-20
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

