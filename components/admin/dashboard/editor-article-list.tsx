/* =====================================================
   EDITOR ARTICLE LIST START
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




const filteredArticles = articles.filter(article=>{


return (

article.title

.toLowerCase()

.includes(

search.toLowerCase()

)


)


})





return (

<div className="space-y-6">





{/* =====================================================
    SEARCH
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


placeholder="Search articles..."


className="
w-full
rounded-xl
border
bg-background
px-4
py-3
outline-none
focus:ring-2
focus:ring-accent
"


/>


</div>






{/* =====================================================
    ARTICLES
===================================================== */}



<div className="space-y-5">



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
"

>


<div
className="
flex
flex-col
md:flex-row
"
>




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






<div
className="
p-6
flex-1
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
mt-4
inline-block
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



</div>

)


}


/* =====================================================
   EDITOR ARTICLE LIST END
===================================================== */