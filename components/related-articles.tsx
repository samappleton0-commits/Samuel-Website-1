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
        mx-auto
        mt-20
        max-w-6xl
        px-4
        sm:px-6
      "
    >


      {/* ==========================================
          RELATED ARTICLES TITLE
      ========================================== */}

      <h2
        className="
          mb-8
          text-2xl
          font-bold
        "
      >

        Related Articles

      </h2>




      <div
        className="
          grid
          gap-6
          md:grid-cols-3
        "
      >


        {articles.map((article)=>(


          <Link

            key={article.id}

            href={`/blog/${article.slug}`}

            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-surface-border
              bg-background
              transition
              hover:-translate-y-1
            "

          >


            {article.featured_image && (

              <Image

                src={article.featured_image}

                alt={article.title}

                width={600}

                height={400}

                className="
                  h-48
                  w-full
                  object-cover
                "

              />

            )}



            <div
              className="
                p-5
              "
            >


              <p
                className="
                  text-sm
                  text-accent
                "
              >

                {article.category ?? 'Article'}

              </p>



              <h3
                className="
                  mt-2
                  font-semibold
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