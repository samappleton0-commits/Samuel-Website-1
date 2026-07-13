/* =====================================================
   EDITOR DASHBOARD START
===================================================== */

import { createClient } from '@/lib/supabase-server'
import EditorArticleList from './editor-article-list'
import {
  FileText,
  Clock,
  Globe,
} from 'lucide-react'

import Link from 'next/link'


type Props = {

  user:{
    id:string
    name:string
    role:string
  }

}



export default async function EditorDashboard({

  user,

}:Props){



  const supabase = await createClient()



  /*
    ==========================================
    GET EDITOR ARTICLES
  ==========================================
  */


  const {

    data:articles

  } = await supabase

    .from('blog_posts')

    .select(
      `
      id,
      title,
      status,
      created_at,
      featured_image
      `
    )

    .eq(
      'user_id',
      user.id
    )

    .order(
      'created_at',
      {
        ascending:false
      }
    )





  const total = articles?.length ?? 0



  const drafts = articles?.filter(

    item=>item.status==='draft'

  ).length ?? 0



  const published = articles?.filter(

    item=>item.status==='published'

  ).length ?? 0

const recentArticles = articles ?? []


return (

<div className="space-y-8">



{/* =====================================================
    HEADER
===================================================== */}


<div>

<h1 className="text-3xl font-bold">

Welcome back, {user.name}

</h1>


<p className="mt-2 text-muted-foreground">

Manage your articles and track your publishing progress.

</p>


</div>





{/* =====================================================
    STATS
===================================================== */}



<div className="grid gap-6 md:grid-cols-3">



<div className="rounded-2xl border bg-card p-6">

<div className="flex justify-between">

<FileText/>

<span className="text-3xl font-bold">

{total}

</span>


</div>


<p className="mt-4 text-muted-foreground">

My Articles

</p>


</div>





<div className="rounded-2xl border bg-card p-6">


<div className="flex justify-between">

<Clock/>

<span className="text-3xl font-bold">

{drafts}

</span>


</div>


<p className="mt-4 text-muted-foreground">

Drafts

</p>


</div>





<div className="rounded-2xl border bg-card p-6">


<div className="flex justify-between">

<Globe/>

<span className="text-3xl font-bold">

{published}

</span>


</div>


<p className="mt-4 text-muted-foreground">

Published

</p>


</div>



</div>



{/* =====================================================
    ARTICLE SEARCH
===================================================== */}

<EditorArticleList

articles={recentArticles}

/>


{/* =====================================================
    ARTICLE CARDS
===================================================== */}



<div className="space-y-5">


{

recentArticles.length === 0 ? (

<div
className="
rounded-2xl
border
p-10
text-center
text-muted-foreground
"
>

No articles created yet.

</div>


)

:

recentArticles.map(article=>(


<div

key={article.id}

className="
rounded-2xl
border
bg-card
overflow-hidden
"

>


<div
className="
flex
flex-col
md:flex-row
"
>


{/* IMAGE */}


<div
className="
h-48
md:w-64
bg-muted
"
>


{

article.featured_image ? (

<img

src={article.featured_image}

alt={article.title}

className="
h-full
w-full
object-cover
"

/>


)

:

(

<div
className="
flex
h-full
items-center
justify-center
text-muted-foreground
"
>

No Image

</div>

)

}


</div>





{/* CONTENT */}


<div
className="
flex-1
p-6
"
>


<h3
className="
text-xl
font-bold
"
>

{article.title}

</h3>



<p
className="
mt-2
text-sm
text-muted-foreground
"
>

{
new Date(
article.created_at
)
.toLocaleDateString()
}

</p>




<span
className="
inline-block
mt-4
rounded-full
bg-muted
px-3
py-1
text-xs
"
>

{article.status}

</span>




<div className="mt-5">


<Link

href={`/admin/blog/${article.id}`}

className="
rounded-xl
border
px-4
py-2
text-sm
"

>

Edit Article

</Link>


</div>



</div>


</div>


</div>


))

}


</div>

{/* =====================================================
    QUICK ACTIONS
===================================================== */}



<div className="rounded-2xl border bg-card p-6">


<h2 className="text-xl font-bold mb-5">

Quick Actions

</h2>


<div className="flex flex-wrap gap-4">


<Link

href="/admin/blog/new"

className="
rounded-xl
bg-accent
px-5
py-3
text-white
"

>

Create Article

</Link>



<Link

href="/admin/blog"

className="
rounded-xl
border
px-5
py-3
"

>

Manage Articles

</Link>



</div>


</div>





</div>

)


}


/* =====================================================
   EDITOR DASHBOARD END
===================================================== */