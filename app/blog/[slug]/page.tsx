// =====================================================
// IMPORTS
// =====================================================
import CommentsSection from '@/components/blog/comments-section'

import {
  getApprovedComments,
} from '@/lib/comments'

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'

import { createClient } from '@/lib/supabase-server'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

import ReadingProgress from '@/components/blog/reading-progress'

import ShareButtons from '@/components/share-buttons'
import RelatedArticles from '@/components/related-articles'




// =====================================================
// METADATA
// =====================================================

export async function generateMetadata({

  params,

}: {

  params: Promise<{
    slug:string
  }>

}): Promise<Metadata> {


  const {
    slug
  } = await params



  const supabase =
    await createClient()



  const {
    data:post
  } = await supabase

    .from('blog_posts')

    .select(
      `
      title,
      seo_title,
      seo_description,
      featured_image,
      excerpt
      `
    )

    .eq(
      'slug',
      slug
    )

    .single()



  if(!post){

    return {

      title:'Article Not Found'

    }

  }



  return {

    title:
      post.seo_title ??
      post.title,


    description:
      post.seo_description ??
      post.excerpt ??
      'Read the latest article from Samuel Appleton.',


    openGraph:{

      title:
        post.seo_title ??
        post.title,


      description:
        post.seo_description ??
        post.excerpt ??
        '',


      images:

        post.featured_image

        ?

        [
          post.featured_image
        ]

        :

        []

    }

  }

}





// =====================================================
// PAGE
// =====================================================


export default async function BlogArticlePage({

  params,

}: {

  params:Promise<{
    slug:string
  }>

}) {


  const {
    slug
  } = await params




  const supabase =
    await createClient()





// =====================================================
// CURRENT ARTICLE
// =====================================================


  const {

    data:post

  } = await supabase


    .from('blog_posts')


    .select('*')


    .eq(

      'slug',

      slug

    )


    .eq(

      'status',

      'published'

    )


    .single()



  if(!post){

    notFound()

  }





// =====================================================
// RELATED ARTICLES
// =====================================================


  const {

    data:relatedArticles

  } = await supabase


    .from('blog_posts')


    .select(

      `
      id,
      title,
      slug,
      featured_image,
      category
      `

    )


    .eq(

      'status',

      'published'

    )


    .neq(

      'id',

      post.id

    )





  const sortedRelated =

    relatedArticles

    ?.sort(

      (a,b)=>{


        if(

          a.category === post.category

          &&

          b.category !== post.category

        ){

          return -1

        }


        if(

          a.category !== post.category

          &&

          b.category === post.category

        ){

          return 1

        }


        return 0


      }

    )


    .slice(
      0,
      3
    )


    ??

    []



// =====================================================
// APPROVED COMMENTS
// =====================================================


const comments =
  await getApprovedComments(

    post.id

  )

// =====================================================
// PREVIOUS ARTICLE
// =====================================================


  const {

    data:previousArticle

  } = await supabase


    .from('blog_posts')


    .select(

      `
      title,
      slug
      `

    )


    .eq(

      'status',

      'published'

    )


    .lt(

      'published_at',

      post.published_at

    )


    .order(

      'published_at',

      {

        ascending:false

      }

    )


    .limit(1)


    .single()





// =====================================================
// NEXT ARTICLE
// =====================================================


  const {

    data:nextArticle

  } = await supabase


    .from('blog_posts')


    .select(

      `
      title,
      slug
      `

    )


    .eq(

      'status',

      'published'

    )


    .gt(

      'published_at',

      post.published_at

    )


    .order(

      'published_at',

      {

        ascending:true

      }

    )


    .limit(1)


    .single()

    // =====================================================
// JSX
// =====================================================


return (

<>

  <ReadingProgress />


  <SiteHeader />



  <main

    className="
      pt-28
      pb-24
    "

  >



    {/* =====================================================
        HERO SECTION
    ===================================================== */}


    <section

      className="
        mx-auto
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
      "

    >



      {/* BACK BUTTON */}

      <a

        href="/blog"

        className="
          inline-flex
          items-center
          rounded-full
          border
          border-surface-border
          px-5
          py-2
          text-sm
          font-medium
          transition
          hover:bg-surface
        "

      >

        ← Back to Blog

      </a>





      <div

        className="
          mt-10
          grid
          gap-12
          lg:grid-cols-[1fr_420px]
          lg:items-center
        "

      >



        {/* TITLE AREA */}


        <div>


          <span

            className="
              inline-flex
              rounded-full
              bg-primary/10
              px-4
              py-1.5
              text-sm
              font-semibold
              text-primary
            "

          >

            {post.category ?? 'Article'}

          </span>





          <h1

            className="
              mt-6
              max-w-4xl
              text-4xl
              font-black
              leading-tight
              tracking-tight
              sm:text-5xl
              lg:text-6xl
            "

          >

            {post.title}

          </h1>





          {
            post.excerpt && (

              <p

                className="
                  mt-6
                  max-w-3xl
                  text-lg
                  leading-8
                  text-muted-foreground
                "

              >

                {post.excerpt}

              </p>

            )
          }






          <div

            className="
              mt-8
              flex
              flex-wrap
              items-center
              gap-6
              text-sm
              text-muted-foreground
            "

          >



            <span>

              📅

              {' '}


              {

                new Date(

                  post.published_at ??
                  post.created_at

                )

                .toLocaleDateString(

                  'en-GB',

                  {

                    day:'numeric',

                    month:'long',

                    year:'numeric'

                  }

                )

              }


            </span>





            <span>

              👤

              {' '}

              {

                post.author_name ??
                'Samuel Appleton'

              }


            </span>



          </div>



        </div>







        {/* FEATURE IMAGE */}


        {
          post.featured_image && (


            <div

              className="
                overflow-hidden
                rounded-3xl
                border
                border-surface-border
                shadow-xl
              "

            >


              <Image


                src={post.featured_image}


                alt={post.title}


                width={900}


                height={650}


                priority


                className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "


              />


            </div>


          )
        }





      </div>



    </section>
        {/* =====================================================
        ARTICLE CONTENT + SIDEBAR
    ===================================================== */}


    <section

      className="
        mx-auto
        mt-16
        grid
        max-w-7xl
        gap-12
        px-4
        sm:px-6
        lg:grid-cols-[minmax(0,1fr)_340px]
        lg:px-8
      "

    >




      {/* =====================================================
          MAIN ARTICLE
      ===================================================== */}


      <div>


       <article

  className="
    prose
    prose-lg
    max-w-none

    text-foreground

    prose-headings:text-foreground
    prose-headings:font-black
    prose-headings:tracking-tight

    prose-h1:text-4xl
    prose-h2:text-3xl
    prose-h3:text-2xl

    prose-p:text-muted-foreground
    prose-p:leading-8

    prose-strong:text-foreground

    prose-a:text-primary
    prose-a:font-semibold

    prose-li:text-muted-foreground

    prose-blockquote:border-primary
    prose-blockquote:bg-surface
    prose-blockquote:text-foreground
    prose-blockquote:px-6
    prose-blockquote:py-4
    prose-blockquote:rounded-xl

    prose-img:rounded-3xl

    prose-code:text-primary

    prose-pre:bg-card
    prose-pre:border
    prose-pre:border-surface-border
    prose-pre:rounded-2xl
  "

  dangerouslySetInnerHTML={{

    __html:post.content

  }}

/>





        {/* =====================================================
            TAGS
        ===================================================== */}


        <section

          className="
            mt-14
          "

        >


          <h3

            className="
              mb-4
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-muted-foreground
            "

          >

            Tags

          </h3>




          <div

            className="
              flex
              flex-wrap
              gap-3
            "

          >


            {
              post.tags?.length > 0

              ?

              post.tags.map(

                (tag:string)=>(


                  <span

                    key={tag}

                    className="
                      rounded-full
                      bg-primary/10
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-primary
                      transition
                      hover:scale-105
                    "

                  >

                    #{tag}

                  </span>


                )

              )


              :

              (

                <span

                  className="
                    text-sm
                    text-muted-foreground
                  "

                >

                  No tags

                </span>

              )

            }


          </div>



        </section>





      </div>







      {/* =====================================================
          SIDEBAR
      ===================================================== */}


      <aside

        className="
          lg:sticky
          lg:top-28
          lg:self-start
        "

      >


        <div

          className="
            rounded-3xl
            border
            border-surface-border
            bg-card
            p-6
            shadow-sm
          "

        >


          <RelatedArticles

            articles={sortedRelated}

          />


        </div>


      </aside>




    </section>

        {/* =====================================================
        SHARE SECTION
    ===================================================== */}

<section

  className="
    mx-auto
    mt-16
    max-w-7xl
    px-4
    sm:px-6
    lg:px-8
  "

>


  <div

    className="
      grid
      gap-8
      lg:grid-cols-[280px_minmax(0,1fr)]
      lg:items-start
    "

  >



    {/* =====================================================
        SHARE COLUMN
    ===================================================== */}


    <aside>


      <h3

        className="
          mb-4
          text-sm
          font-bold
          uppercase
          text-muted-foreground
        "

      >

        Share Article

      </h3>



      <ShareButtons

        url={

          `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`

        }

      />



      <a

        href="/blog"

        className="
          mt-6
          inline-flex
          rounded-full
          border
          border-surface-border
          px-5
          py-2
          text-sm
          transition
          hover:bg-surface
        "

      >

        ← Back to Blog

      </a>


    </aside>







    {/* =====================================================
        COMMENTS COLUMN
    ===================================================== */}


    <div>


      <CommentsSection

        postId={post.id}

        initialComments={comments}

      />


    </div>



  </div>



</section>

    {/* =====================================================
        PREVIOUS / NEXT ARTICLE
    ===================================================== */}



    <section

      className="
        mx-auto
        mt-12
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
      "

    >



      <div

        className="
          grid
          gap-6
          md:grid-cols-2
        "

      >




        {/* PREVIOUS */}


        {
          previousArticle && (


            <a

              href={`/blog/${previousArticle.slug}`}

              className="
                group
                rounded-3xl
                border
                border-surface-border
                bg-card
                p-6
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "

            >


              <p

                className="
                  text-sm
                  text-muted-foreground
                "

              >

                ← Previous Article

              </p>



              <h3

                className="
                  mt-3
                  text-xl
                  font-bold
                  transition
                  group-hover:text-primary
                "

              >

                {previousArticle.title}

              </h3>


            </a>


          )
        }







        {/* NEXT */}



        {
          nextArticle && (


            <a

              href={`/blog/${nextArticle.slug}`}

              className="
                group
                rounded-3xl
                border
                border-surface-border
                bg-card
                p-6
                text-right
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "

            >


              <p

                className="
                  text-sm
                  text-muted-foreground
                "

              >

                Next Article →

              </p>



              <h3

                className="
                  mt-3
                  text-xl
                  font-bold
                  transition
                  group-hover:text-primary
                "

              >

                {nextArticle.title}

              </h3>



            </a>


          )
        }





      </div>



    </section>
        {/* =====================================================
        END OF ARTICLE PAGE
    ===================================================== */}


  </main>


  <SiteFooter />


</>

)

}