/* =====================================================
   EDITOR ARTICLE LIST
   components/admin/dashboard/editor-article-list.tsx
===================================================== */


'use client'


import {
  useState
} from 'react'


import Link from 'next/link'



type Article = {

  id:string

  title:string

  status:string

  created_at:string

  featured_image:string | null

}



type Props = {

  articles:Article[]

}





export default function EditorArticleList({

  articles,

}:Props){



const [search,setSearch] = useState('')





/* =====================================================
   SEARCH FILTER
===================================================== */


const filteredArticles = articles.filter(article=>{


  const keyword = search.toLowerCase().trim()



  if(!keyword){

    return true

  }



  return (


    article.title

    .toLowerCase()

    .includes(keyword)



    ||



    article.status

    .toLowerCase()

    .includes(keyword)



    ||



    new Date(article.created_at)

    .toLocaleDateString()

    .toLowerCase()

    .includes(keyword)


  )


})







return (


<div

className="
space-y-6
"

>



{/* =====================================================
    SEARCH BOX
===================================================== */}



<div

className="
rounded-2xl
border
bg-card
p-6
"

>


<input


type="search"


value={search}


onChange={(e)=>

setSearch(

e.target.value

)

}


placeholder="Search by title, status or date..."


className="
w-full
rounded-xl
border
bg-background
px-4
py-3
outline-none
transition
focus:ring-2
focus:ring-accent
"


/>




<p

className="
mt-3
text-sm
text-muted-foreground
"

>

Showing {filteredArticles.length} of {articles.length} articles

</p>



</div>







{/* =====================================================
    ARTICLES
===================================================== */}



<div

className="
space-y-5
"

>




{

filteredArticles.length === 0 ? (



<div

className="
rounded-2xl
border
p-10
text-center
text-muted-foreground
"

>

No matching articles found.

</div>



)

:

filteredArticles.map(article=>(



<div


key={article.id}


className="
overflow-hidden
rounded-2xl
border
bg-card
transition
hover:shadow-md
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
shrink-0
bg-muted
md:w-64
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
text-sm
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

.toLocaleDateString(

'en-US',

{

day:'numeric',

month:'long',

year:'numeric'

}

)

}

</p>







<span


className="
mt-4
inline-flex
rounded-full
bg-muted
px-3
py-1
text-xs
font-semibold
capitalize
"

>

{article.status}

</span>








<div

className="
mt-5
"

>


<Link


href={`/admin/blog/${article.id}`}


className="
inline-flex
rounded-xl
border
px-4
py-2
text-sm
font-medium
transition
hover:bg-muted
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







</div>


)


}