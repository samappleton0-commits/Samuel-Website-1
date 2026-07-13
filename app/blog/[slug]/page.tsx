// =====================================================
// IMPORTS
// =====================================================

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'

import { createClient } from '@/lib/supabase-server'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

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



  const supabase = await createClient()



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

  params: Promise<{

    slug:string

  }>

}) {



  const {
    slug
  } = await params






  // =====================================================
  // SUPABASE CLIENT
  // =====================================================


  const supabase = await createClient()






  // =====================================================
  // FETCH CURRENT ARTICLE
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
  // FETCH RELATED ARTICLES
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

      ?.sort((a,b)=>{


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


      })


      .slice(0,3)

      ??

      []



// =====================================================
// JSX STARTS IN PART 2
// =====================================================


return (

<>

{/* =====================================================
    START: SITE HEADER
===================================================== */}

<SiteHeader />


{/* =====================================================
    START: PAGE
===================================================== */}


<main
className="
pt-28
pb-20
"
>



{/* =====================================================
    START: ARTICLE HEADER
===================================================== */}


<section

className="
mx-auto
max-w-5xl
px-4
sm:px-6
"

>


<span

className="
inline-flex
rounded-full
bg-accent/15
px-4
py-1
text-sm
font-medium
text-accent
"

>

{post.category ?? 'Article'}

</span>




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




<div

className="
mt-6
flex
flex-wrap
gap-5
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

By {post.author_name ?? 'Samuel Appleton'}

</span>



</div>


</section>


{/* =====================================================
    END: ARTICLE HEADER
===================================================== */}





{/* =====================================================
    START: ARTICLE + SIDEBAR GRID
===================================================== */}



<section

className="
mx-auto
mt-14
flex
max-w-7xl
gap-12
px-4
sm:px-6
"

>




{/* =====================================================
    START: MAIN ARTICLE COLUMN
===================================================== */}


<div>





{/* FEATURE IMAGE */}

{

post.featured_image && (

<div
  className="
    flex-1
    min-w-0
  "
>
<Image

src={post.featured_image}

alt={post.title}

width={900}

height={500}

priority

className="
h-auto
w-full
object-cover
"

/>

</div>

)

}







{/* ARTICLE CONTENT */}



<article

className="
prose
prose-lg
prose-invert
mt-12
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

__html:post.content

}}


/>




<section

className="
mt-12
"

>


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




<div

className="
flex
flex-wrap
gap-2
"

>


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


</section>







</div>



<aside
  className="
    mt-12
    lg:mt-0
    lg:w-80
    lg:shrink-0
    lg:self-start
    lg:sticky
    lg:top-28
  "
>
  <div
    className="
      rounded-3xl
      border
      border-surface-border
      bg-card
      p-5
      shadow-sm
    "
  >
    <RelatedArticles articles={sortedRelated} />
  </div>
</aside>




</section>





<section

className="
mx-auto
mt-12
max-w-7xl
px-4
sm:px-6

lg:grid
lg:grid-cols-[minmax(0,1fr)_320px]

"

>


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

url={

`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`

}

/>



<a

href="/blog"

className="
mt-6
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


</div>


</section>



</main>




<SiteFooter />






</>

)


}