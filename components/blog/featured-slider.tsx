'use client'


import { useEffect, useState } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'



type FeaturedArticle = {

  id: string

  title: string

  slug: string

  excerpt?: string | null

  category?: string | null

  featured_image?: string | null

}



type Props = {

  articles: FeaturedArticle[]

}





export default function FeaturedSlider({

  articles,

}: Props) {



  const [current, setCurrent] = useState(0)





  useEffect(() => {


    if (articles.length <= 1) return



    const timer = setInterval(() => {


      setCurrent((prev) =>

        prev === articles.length - 1

          ? 0

          : prev + 1

      )


    }, 6000)



    return () => clearInterval(timer)


  }, [articles.length])







  if (!articles.length) {

    return null

  }






  const article = articles[current]







  const nextSlide = () => {


    setCurrent((prev)=>

      prev === articles.length - 1

        ? 0

        : prev + 1

    )


  }







  const previousSlide = () => {


    setCurrent((prev)=>

      prev === 0

        ? articles.length - 1

        : prev - 1

    )


  }








  return (

    <section

      className="
        relative
        mb-20
        overflow-hidden
        rounded-3xl
      "

    >





      <div

        className="
          relative

          h-[360px]

          sm:h-[450px]

          lg:h-[560px]
        "

      >






        <Image


          src={

            article.featured_image

              ? article.featured_image

              : '/images/blog-placeholder.jpg'

          }


          alt={article.title}


          fill


          priority={current === 0}


          sizes="100vw"


          className="
            object-cover
          "

        />







        {/* OVERLAY */}


        <div

          className="
            absolute

            inset-0

            bg-gradient-to-r

            from-black/75

            via-black/60

            to-black/50
          "

        />









        {/* CENTER CONTENT */}



        <div

          className="
            absolute

            inset-0

            flex

            items-center

            justify-center

            text-center
          "

        >



          <div

            className="
              mx-auto

              w-full

              max-w-4xl

              px-6

              sm:px-8
            "

          >




            <div

              className="
                mx-auto

                max-w-3xl
              "

            >






              <span

                className="
                  inline-flex

                  rounded-full

                  bg-primary

                  px-4

                  py-1

                  text-xs

                  font-semibold

                  uppercase

                  tracking-wide

                  text-white
                "

              >

                {article.category ?? 'Featured'}


              </span>








              <h2

                className="
                  mt-5

                  text-2xl

                  font-bold

                  leading-tight

                  text-white

                  sm:text-3xl

                  lg:text-4xl
                "

              >

                {article.title}


              </h2>










              <Link


                href={`/blog/${article.slug}`}


                className="
                  mt-7

                  inline-flex

                  items-center

                  gap-2

                  rounded-full

                  bg-primary

                  px-5

                  py-2.5

                  text-sm

                  font-semibold

                  text-white

                  transition

                  hover:scale-105
                "


              >

                Read Article


                <ArrowRight size={17}/>


              </Link>





            </div>



          </div>



        </div>









        {/* LEFT ARROW */}



        {articles.length > 1 && (


          <button


            type="button"


            onClick={previousSlide}


            aria-label="Previous article"


            className="
              absolute

              left-3

              top-1/2

              z-20

              flex

              h-11

              w-11

              -translate-y-1/2

              items-center

              justify-center

              rounded-full

              bg-black/40

              text-white

              backdrop-blur-md

              transition

              hover:bg-primary

              sm:left-6
            "


          >

            <ChevronLeft size={22}/>


          </button>


        )}







        {/* RIGHT ARROW */}



        {articles.length > 1 && (


          <button


            type="button"


            onClick={nextSlide}


            aria-label="Next article"


            className="
              absolute

              right-3

              top-1/2

              z-20

              flex

              h-11

              w-11

              -translate-y-1/2

              items-center

              justify-center

              rounded-full

              bg-black/40

              text-white

              backdrop-blur-md

              transition

              hover:bg-primary

              sm:right-6
            "


          >


            <ChevronRight size={22}/>


          </button>


        )}









        {/* DOTS */}




        {articles.length > 1 && (


          <div


            className="
              absolute

              bottom-7

              left-1/2

              z-20

              flex

              -translate-x-1/2

              gap-3
            "


          >




            {articles.map((_,index)=>(



              <button


                key={index}


                type="button"


                onClick={()=>setCurrent(index)}


                aria-label={`Go to slide ${index + 1}`}


                className={`

                  h-3

                  w-3

                  rounded-full

                  transition-all


                  ${
                    index === current

                    ? 'scale-125 bg-white'

                    : 'bg-white/40 hover:bg-white/70'

                  }

                `}


              />


            ))}




          </div>


        )}







      </div>



    </section>


  )

}