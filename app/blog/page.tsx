import { createClient } from '@/lib/supabase-server'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

import FeaturedSlider from '@/components/blog/featured-slider'
import ArticleCard from '@/components/blog/article-card'
import BlogPagination from '@/components/blog/blog-pagination'
import BlogFilters from '@/components/blog/blog-filters'

import {
  FileText,
} from 'lucide-react'





type Props = {

  searchParams: Promise<{

    page?: string

    search?: string

    category?: string

  }>

}






export default async function BlogPage({

  searchParams,

}: Props) {



  const params = await searchParams





  const currentPage = Number(

    params.page ?? '1'

  )



  const search = params.search ?? ''



  const category = params.category ?? ''







  const postsPerPage = 8





  const start =

    (currentPage - 1) *

    postsPerPage





  const end =

    start +

    postsPerPage -

    1







  const supabase = await createClient()






  // =====================================
  // FEATURED ARTICLES
  // ALWAYS AVAILABLE
  // =====================================


  const {

    data: featuredPosts,

  } = await supabase


    .from('blog_posts')


    .select(`

      id,

      title,

      slug,

      excerpt,

      featured_image,

      category,

      featured,

      published_at,

      created_at

    `)


    .eq(

      'status',

      'published'

    )


    .eq(

      'featured',

      true

    )


    .order(

      'published_at',

      {

        ascending:false

      }

    )


    .limit(5)






  // =====================================
  // BUILD NORMAL ARTICLE QUERY
  // =====================================


  let query = supabase


    .from('blog_posts')


    .select(

      `

      id,

      title,

      slug,

      excerpt,

      featured_image,

      category,

      published_at,

      created_at

      `,

      {

        count:'exact'

      }

    )


    .eq(

      'status',

      'published'

    )


    .eq(

      'featured',

      false

    )





  // =====================================
  // SEARCH FILTER
  // =====================================


  if(search){


    query = query.or(

      `title.ilike.%${search}%,excerpt.ilike.%${search}%`

    )


  }






  // =====================================
  // CATEGORY FILTER
  // =====================================


  if(category){


    query = query.eq(

      'category',

      category

    )


  }






  const {

    data: posts,

    error,

    count,

  } = await query


    .order(

      'published_at',

      {

        ascending:false

      }

    )


    .range(

      start,

      end

    )








  if(error){


    console.error(

      'Blog loading error:',

      error

    )


  }







  const articles = posts ?? []




  const featuredArticles = featuredPosts ?? []





  const totalPages = Math.ceil(

    (count ?? 0) /

    postsPerPage

  )








  const categories = [

    'All',

    'Web Development',

    'Programming',

    'ICT',

    'Technology',

    'Tutorials',

  ]







  return (

    <>





      <SiteHeader />







      <main

        className="
          mx-auto

          max-w-7xl

          px-4

          pt-28

          pb-24

          sm:px-6

          lg:px-8
        "

      >






        {/* HEADER */}





        <section

          className="
            mb-10

            text-center
          "

        >




          <p

            className="
              text-sm

              font-semibold

              uppercase

              tracking-[0.25em]

              text-primary
            "

          >

            Blog


          </p>







          <h1

            className="
              mt-4

              text-5xl

              font-black
            "

          >

            Articles & Insights


          </h1>






          <p

            className="
              mx-auto

              mt-5

              max-w-3xl

              text-muted-foreground
            "

          >

            Explore my latest articles,
            tutorials,
            technology insights,
            software engineering,
            ICT,
            and web development.


          </p>




        </section>









        {/* FILTERS */}





        <BlogFilters

          categories={categories}

          currentSearch={search}

          currentCategory={category}

        />








        {/* EMPTY STATE */}





        {articles.length === 0 && (


          <section

            className="
              mt-12

              rounded-3xl

              border

              bg-card

              p-20

              text-center
            "

          >



            <FileText

              size={60}

              className="
                mx-auto

                text-muted-foreground
              "

            />



            <h2

              className="
                mt-6

                text-3xl

                font-bold
              "

            >

              No Articles Found


            </h2>



            <p

              className="
                mt-3

                text-muted-foreground
              "

            >

              Try another search or category.


            </p>



          </section>


        )}






        {/* FEATURED SLIDER */}





        {featuredArticles.length > 0 && (



          <FeaturedSlider

            articles={featuredArticles}

          />



        )}









        {/* ARTICLES GRID */}





        {articles.length > 0 && (




          <section

            className="
              mt-16
            "

          >





            <div

              className="
                mb-10
              "

            >




              <h2

                className="
                  text-3xl

                  font-bold
                "

              >

                Latest Articles


              </h2>





              <p

                className="
                  mt-2

                  text-muted-foreground
                "

              >

                Browse the newest articles from the blog.


              </p>





            </div>









            <div

              className="
                grid

                gap-8

                sm:grid-cols-2

                lg:grid-cols-3

                xl:grid-cols-4
              "

            >






              {articles.map((post)=>(



                <ArticleCard


                  key={post.id}


                  post={post}


                />



              ))}





            </div>









            {/* PAGINATION */}





            <BlogPagination


              currentPage={currentPage}


              totalPages={totalPages}


              search={search}


              category={category}


            />






          </section>





        )}







      </main>







      <SiteFooter />





    </>


  )


}