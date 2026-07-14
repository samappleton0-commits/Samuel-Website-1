import { createClient } from '@/lib/supabase-server'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

import FeaturedSlider from '@/components/blog/featured-slider'
import ArticleCard from '@/components/blog/article-card'
import BlogPagination from '@/components/blog/blog-pagination'
import BlogFilters from '@/components/blog/blog-filters'

import {
  FileText,
  Search,
} from 'lucide-react'

type Props = {
  searchParams: Promise<{
    page?: string
    search?: string
    category?: string
  }>
}

const POSTS_PER_PAGE = 8

export default async function BlogPage({
  searchParams,
}: Props) {

  const params = await searchParams

  const currentPage = Math.max(
    Number(params.page ?? '1'),
    1
  )

  const search = (params.search ?? '').trim()

  const category = (params.category ?? '').trim()

  const start =
    (currentPage - 1) *
    POSTS_PER_PAGE

  const end =
    start +
    POSTS_PER_PAGE -
    1

  const supabase =
    await createClient()

  // =====================================
  // FEATURED POSTS
  // =====================================

  const {

    data: featuredPosts = [],

    error: featuredError,

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
      created_at,
      author_name
    `)

    .eq('status', 'published')

    .eq('featured', true)

    .order('published_at', {
      ascending: false,
    })

    .limit(5)

  if (featuredError) {

    console.error(
      'Featured posts error:',
      featuredError
    )

  }

    // =====================================
  // BLOG QUERY
  // =====================================

  let query = supabase

    .from('blog_posts')

    .select(
      `
      id,
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category,
      tags,
      featured,
      published_at,
      created_at,
      author_name
      `,
      {
        count: 'exact',
      }
    )
.eq('status', 'published')

  // =====================================
  // SEARCH
  // =====================================

  if (search.length > 0) {

   const escapedSearch = search
  .replace(/[,%]/g, ' ')
  .trim()

    query = query.or(
      [
        `title.ilike.%${escapedSearch}%`,
        `excerpt.ilike.%${escapedSearch}%`,
        `content.ilike.%${escapedSearch}%`,
      ].join(',')
    )

  }

  // =====================================
  // CATEGORY
  // =====================================

  if (category) {

    query = query.eq(
      'category',
      category
    )

  }

  // =====================================
  // GET POSTS
  // =====================================

  const {

    data: posts = [],

    error,

    count = 0,

  } = await query

    .order(
      'published_at',
      {
        ascending: false,
      }
    )

    .range(
      start,
      end
    )

  if (error) {

    console.error(
      'Blog loading error:',
      error
    )

  }

 const articles = posts ?? []

const featuredArticles = featuredPosts ?? []

 const totalPages = Math.max(
  1,
  Math.ceil(
    (count ?? 0) / POSTS_PER_PAGE
  )
)

  // =====================================
  // CATEGORIES
  // =====================================

  const categories = [

    'All',

    'Technology',

    'Programming',

    'Web Development',

    'Artificial Intelligence',

    'Cybersecurity',

    'Health & Wellness',

    'Business & Finance',

    'Lifestyle & Travel',

    'Personal Development',

    'Tutorials',

  ]

  const hasFilters =
    !!search ||
    !!category

      return (

    <>

      <SiteHeader />


      <main

        className="
          mx-auto
          max-w-7xl
          px-4
          pb-24
          pt-28
          sm:px-6
          lg:px-8
        "

      >


        {/* ============================
            BLOG HEADER
        ============================= */}


        <section

          className="
            mb-12
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

            Explore articles about technology,
            programming, software development,
            business, personal growth,
            and modern digital trends.

          </p>


        </section>





        {/* ============================
            FILTERS
        ============================= */}


        <BlogFilters

          categories={categories}

          currentSearch={search}

          currentCategory={category}

        />





        {/* ============================
            SEARCH SUMMARY
        ============================= */}


        {hasFilters && (

          <section

            className="
              mb-10
              rounded-3xl
              border
              bg-card
              p-6
              text-center
            "

          >

            <div

              className="
                flex
                items-center
                justify-center
                gap-2
                text-sm
                text-muted-foreground
              "

            >

              <Search size={18}/>


              <span>

                Showing

                {' '}

                <strong className="text-foreground">

                  {count}

                </strong>

                {' '}

                article

                {count === 1 ? '' : 's'}

                {search && (

                  <>

                    {' '}for{' '}

                    <strong className="text-foreground">

                      "{search}"

                    </strong>

                  </>

                )}

                {category && (

                  <>

                    {' '}in{' '}

                    <strong className="text-foreground">

                      {category}

                    </strong>

                  </>

                )}

              </span>


            </div>


          </section>

        )}






        {/* ============================
            EMPTY STATE
        ============================= */}


        {articles.length === 0 && (

          <section

            className="
              rounded-3xl
              border
              bg-card
              p-16
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

              Try searching with another keyword
              or choose another category.

            </p>


          </section>

        )}






        {/* ============================
            FEATURED ARTICLES
            ONLY SHOW WHEN NO FILTER
        ============================= */}


        {!hasFilters && featuredArticles.length > 0 && (

          <FeaturedSlider

            articles={featuredArticles}

          />

        )}

                {/* ============================
            ARTICLE GRID
        ============================= */}


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

                {hasFilters

                  ? 'Search Results'

                  : 'Latest Articles'

                }

              </h2>


              <p

                className="
                  mt-2
                  text-muted-foreground
                "

              >

                {hasFilters

                  ? `Found ${count} article${count === 1 ? '' : 's'} matching your search.`

                  : 'Browse the newest articles from the blog.'

                }

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







            {/* ============================
                PAGINATION
            ============================= */}


            {totalPages > 1 && (

              <div

                className="
                  mt-16
                "

              >

                <BlogPagination

                  currentPage={currentPage}

                  totalPages={totalPages}

                  search={search}

                  category={category}

                />

              </div>

            )}


          </section>

        )}



      </main>



      <SiteFooter />


    </>

  )

}