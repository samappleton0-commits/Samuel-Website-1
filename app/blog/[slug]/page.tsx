// =====================================================
// IMPORTS
// =====================================================
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase-server'
import ShareButtons from '@/components/share-buttons'
import Image from 'next/image'
import RelatedArticles from '@/components/related-articles'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
// =====================================================
// TYPES
// =====================================================

// =====================================================
// HELPER FUNCTIONS
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
    data: post
  } =
    await supabase

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



  if (!post) {

    return {

      title:
        'Article Not Found'

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



    openGraph: {


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

        [],

    },


  }


}

// =====================================================
// PAGE
// =====================================================

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {

  // ==========================================
  // Get Slug
  // ==========================================

  const { slug } = await params



  // ==========================================
  // Supabase Client
  // ==========================================

  const supabase = await createClient()



  // ==========================================
  // Fetch Blog Article
  // ==========================================

  const {
    data: post,
  } = await supabase

    .from('blog_posts')

    .select('*')

    .eq(
      'slug',
      slug
    )

    .single()

// ==========================================
// FETCH RELATED ARTICLES
// ==========================================

const {
  data: relatedArticles,
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
    'slug',
    slug
  )

  .limit(10)
const randomArticles =
  relatedArticles
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 3)
  // ==========================================
  // Handle Missing Article
  // ==========================================

  if (!post) {

    notFound()

  }


  return (
<>
       <SiteHeader />  

  <main className="pt-24 pb-20">

    {/* =====================================
        ARTICLE HERO
    ===================================== */}

    <section className="relative overflow-hidden border-b border-surface-border">

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6">

        {/* Category */}

        <span className="inline-flex rounded-full bg-accent/15 px-4 py-1 text-sm font-medium text-accent">
          {post.category ?? 'Article'}
        </span>

        {/* Title */}

        <h1
          className="
            mt-6
            font-heading
            text-4xl
            font-extrabold
            leading-tight
            tracking-tight
            sm:text-5xl
            lg:text-6xl
          "
        >
          {post.title}
        </h1>

        {/* Meta */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            items-center
            gap-4
            text-sm
            text-muted-foreground
          "
        >
          <span>
            📅 {new Date(post.created_at).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>

         

         <span>
  By {post.author_name ?? 'Samuel Appleton'}
</span>

        </div>

      </div>

    </section>

   {/* =====================================
    FEATURED IMAGE
===================================== */}

{post.featured_image && (

<section
  className="
    mx-auto
    mt-12
    max-w-3xl
    px-4
    sm:px-6
  "
>

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

  width={1200}

  height={630}

  className="
    h-auto
    w-full
    object-cover
  "

/>

</div>


</section>

)}

<section
  className="
    mx-auto
    mt-16
    max-w-3xl
    px-4
    sm:px-6
  "
>

<article

className="
prose
prose-lg
prose-invert
max-w-none

prose-headings:font-heading
prose-headings:font-bold

prose-h1:text-4xl
prose-h2:text-3xl
prose-h3:text-2xl

prose-blockquote:border-l-4
prose-blockquote:pl-4
prose-blockquote:italic

prose-img:rounded-2xl

prose-a:text-primary

prose-strong:text-white

"

dangerouslySetInnerHTML={{
  __html: post.content
}}

/>

</section>

    {/* =====================================
        TAGS & SHARE
        (NEXT STEP)
    ===================================== */}
    {/* =====================================
    TAGS & SHARE
===================================== */}

<section
  className="
    mx-auto
    mt-12
    flex
    max-w-3xl
    flex-col
    gap-6
    px-4
    sm:px-6
  "
>

  {/* Back Button */}

  <a
    href="/blog"
    className="
      inline-flex
      w-fit
      items-center
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


  {/* Tags */}

  <div>

    <h3
      className="
        mb-3
        text-sm
        font-semibold
        uppercase
        text-muted-foreground
      "
    >
      Tags
    </h3>


    <div className="flex flex-wrap gap-2">

      {
        post.tags?.length > 0
        ?
        post.tags.map((tag:string)=>(
          
          <span
            key={tag}
            className="
              rounded-full
              bg-surface
              px-4
              py-1.5
              text-sm
            "
          >
            #{tag}

          </span>

        ))
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

  </div>


  {/* Share Buttons */}

 

<div>

  <h3
    className="
      mb-3
      text-sm
      font-semibold
      uppercase
      text-muted-foreground
    "
  >
    Share Article
  </h3>


 <ShareButtons
  url={`http://localhost:3000/blog/${slug}`}
/>


</div>


</section>

  <RelatedArticles

  articles={
    randomArticles ?? []
  }

/>

  </main>

  <SiteFooter />


</>
)
}