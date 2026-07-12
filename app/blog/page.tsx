import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { createClient } from '@/lib/supabase-server'

import {
  ArrowRight,
  Calendar,
  FileText,
} from 'lucide-react'



export default async function BlogPage() {


  const supabase =
    await createClient()



  const {
    data: posts,
  } =
    await supabase

      .from('blog_posts')

      .select('*')

      .eq(
        'status',
        'published'
      )

      .order(
        'published_at',
        {
          ascending:false,
        }
      )





  const articles =
    posts ?? []



  const featuredArticle =
    articles.find(
      (post)=>post.featured
    )



  const normalArticles =
    articles.filter(
      (post)=>
        post.id !== featuredArticle?.id
    )





  return (



 <>

    <SiteHeader />

    <main
      className="
        mx-auto
        max-w-7xl
        px-4
        pb-20
        pt-28
        sm:px-6
        lg:px-8
      "
    >



      {/* HEADER */}

      <section
        className="
          mb-14
          text-center
        "
      >

        <p
          className="
            mb-3
            text-sm
            font-medium
            uppercase
            tracking-widest
            text-accent
          "
        >

          Blog

        </p>



        <h1
          className="
            text-4xl
            font-bold
            tracking-tight
            sm:text-5xl
          "
        >

          Articles & Insights

        </h1>



        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-muted-foreground
          "
        >

          Explore my latest articles,
          tutorials and updates about
          technology, development and ICT.

        </p>


      </section>








      {/* EMPTY STATE */}

      {
        articles.length === 0 && (

          <div
            className="
              rounded-3xl
              border
              bg-card
              p-16
              text-center
            "
          >

            <FileText
              size={50}
              className="
                mx-auto
                text-muted-foreground
              "
            />


            <h2
              className="
                mt-5
                text-xl
                font-semibold
              "
            >

              No articles yet

            </h2>


            <p
              className="
                mt-2
                text-muted-foreground
              "
            >

              New blog posts will appear here.

            </p>


          </div>

        )
      }









      {/* FEATURED ARTICLE */}

      {
        featuredArticle && (

          <section
            className="
              mb-16
            "
          >

            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                bg-card
                shadow-sm
              "
            >


              <div
                className="
                  grid
                  lg:grid-cols-2
                "
              >


                <div
                  className="
                    relative
                    min-h-[320px]
                  "
                >

                  {
                    featuredArticle.featured_image && (

                      <Image

                        src={
                          featuredArticle.featured_image
                        }

                        alt={
                          featuredArticle.title
                        }

                        fill

                        className="
                          object-cover
                        "

                      />

                    )
                  }


                </div>





                <div
                  className="
                    flex
                    flex-col
                    justify-center
                    p-8
                    lg:p-12
                  "
                >


                  <span
                    className="
                      mb-4
                      w-fit
                      rounded-full
                      bg-accent/10
                      px-4
                      py-1
                      text-sm
                      text-accent
                    "
                  >

                    Featured

                  </span>




                  <h2
                    className="
                      text-3xl
                      font-bold
                    "
                  >

                    {featuredArticle.title}

                  </h2>




                  {
                    featuredArticle.excerpt && (

                      <p
                        className="
                          mt-4
                          text-muted-foreground
                        "
                      >

                        {featuredArticle.excerpt}

                      </p>

                    )
                  }





                  <Link

                    href={
                      `/blog/${featuredArticle.slug}`
                    }

                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-accent
                    "

                  >

                    Read Article

                    <ArrowRight size={16}/>


                  </Link>



                </div>



              </div>


            </div>


          </section>

        )
      }










      {/* ARTICLE GRID */}


      {
        normalArticles.length > 0 && (

          <section>


            <h2
              className="
                mb-8
                text-2xl
                font-bold
              "
            >

              Latest Articles

            </h2>




            <div
              className="
                grid
                gap-8
                md:grid-cols-2
                lg:grid-cols-3
              "
            >


              {
                normalArticles.map((post)=>(


                  <article

                    key={
                      post.id
                    }

                    className="
                      group
                      overflow-hidden
                      rounded-3xl
                      border
                      bg-card
                      transition
                      hover:-translate-y-1
                    "

                  >



                    <div
                      className="
                        relative
                        h-52
                      "
                    >

                      {
                        post.featured_image && (

                          <Image

                            src={
                              post.featured_image
                            }

                            alt={
                              post.title
                            }

                            fill

                            className="
                              object-cover
                              transition
                              duration-500
                              group-hover:scale-105
                            "

                          />

                        )
                      }

                    </div>





                    <div
                      className="
                        p-6
                      "
                    >



                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-muted-foreground
                        "
                      >

                        <Calendar size={14}/>

                        {
                          post.published_at
                          ?
                          new Date(
                            post.published_at
                          )
                          .toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
                          :
                          ''
                        }


                      </div>





                      <h3
                        className="
                          mt-4
                          text-xl
                          font-bold
                        "
                      >

                        {post.title}

                      </h3>





                      {
                        post.excerpt && (

                          <p
                            className="
                              mt-3
                              line-clamp-3
                              text-sm
                              text-muted-foreground
                            "
                          >

                            {post.excerpt}

                          </p>

                        )
                      }




                      <Link

                        href={
                          `/blog/${post.slug}`
                        }

                        className="
                          mt-5
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-medium
                          text-accent
                        "

                      >

                        Read More

                        <ArrowRight size={16}/>


                      </Link>



                    </div>


                  </article>


                ))
              }


            </div>


          </section>

        )
      }



    </main>
<SiteFooter />


</>
  )

}