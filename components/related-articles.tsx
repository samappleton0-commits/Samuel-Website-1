import Link from 'next/link'
import Image from 'next/image'

import {
  ArrowRight,
} from 'lucide-react'



// =====================================================
// TYPES
// =====================================================

type RelatedArticle = {

  id:string

  title:string

  slug:string

  featured_image?:string

  category?:string

}



type Props = {

  articles:RelatedArticle[]

}




// =====================================================
// COMPONENT
// =====================================================

export default function RelatedArticles({

  articles,

}:Props){



  if(!articles.length){

    return null

  }



  return (

    <section>



      {/* TITLE */}

      <div

        className="
          mb-6
        "

      >

        <h2

          className="
            text-xl
            font-black
          "

        >

          Related Articles

        </h2>


        <div

          className="
            mt-2
            h-1
            w-12
            rounded-full
            bg-primary
          "

        />


      </div>






      {/* ARTICLE CARDS */}


      <div

        className="
          flex
          flex-col
          gap-6
        "

      >



        {

          articles.map((article)=>(



            <Link

              key={article.id}

              href={`/blog/${article.slug}`}


              className="
                group
                overflow-hidden
                rounded-2xl
                border
                border-surface-border
                bg-background
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "

            >





              {/* IMAGE */}


              {

                article.featured_image && (


                  <div

                    className="
                      relative
                      h-36
                      w-full
                      overflow-hidden
                    "

                  >


                    <Image


                      src={article.featured_image}


                      alt={article.title}


                      fill


                      className="
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-110
                      "


                    />


                  </div>


                )

              }








              {/* CONTENT */}


              <div

                className="
                  p-4
                "

              >




                <span

                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-primary
                  "

                >

                  {article.category ?? 'Article'}

                </span>





                <h3

                  className="
                    mt-2
                    line-clamp-3
                    text-sm
                    font-bold
                    leading-snug
                    transition
                    group-hover:text-primary
                  "

                >

                  {article.title}


                </h3>






                <div

                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-primary
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "

                >

                  Read Article

                  <ArrowRight size={14}/>


                </div>



              </div>




            </Link>



          ))

        }



      </div>




    </section>

  )

}