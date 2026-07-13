import Link from 'next/link'
import Image from 'next/image'


type RelatedArticle = {

  id: string

  title: string

  slug: string

  featured_image?: string

  category?: string

}



type Props = {

  articles: RelatedArticle[]

}



export default function RelatedArticles({

  articles,

}: Props) {


  if (!articles.length) {

    return null

  }



  return (

    <section
      className="
        w-full
      "
    >


      {/* TITLE */}

      <h2
        className="
          mb-6
          text-xl
          font-bold
        "
      >

        Related Articles

      </h2>




      {/* ARTICLES LIST */}

      <div
        className="
          flex
          flex-col
          gap-6
        "
      >


        {articles.map((article)=>(


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
              transition
              hover:-translate-y-1
            "

          >



            {/* IMAGE */}

            {article.featured_image && (

              <div
                className="
                  relative
                  h-40
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
                    duration-300
                    group-hover:scale-105
                  "

                />

              </div>

            )}




            {/* CONTENT */}

            <div
              className="
                p-4
              "
            >



              <p
                className="
                  text-xs
                  font-medium
                  uppercase
                  text-accent
                "
              >

                {article.category ?? 'Article'}

              </p>




              <h3

                className="
                  mt-2
                  line-clamp-3
                  text-sm
                  font-semibold
                  leading-snug
                  transition
                  group-hover:text-accent
                "

              >

                {article.title}

              </h3>



            </div>



          </Link>


        ))}



      </div>



    </section>

  )

}