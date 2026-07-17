'use client'


import Link from 'next/link'


import {
  Calendar,
  ArrowRight,
  FileText,
} from 'lucide-react'






type Post = {

  id:string

  title:string

  status:string

  author_name:string | null

  created_at:string

}






type Props = {

  posts?:Post[] | null

}









export default function RecentPosts({

  posts,

}:Props){






const recentPosts = Array.isArray(posts)

?

posts

.slice()

.sort(

(a,b)=>

new Date(b.created_at).getTime()

-

new Date(a.created_at).getTime()

)

.slice(0,4)

:

[]










return (


<section


className="

w-full

min-w-0

rounded-3xl

border

bg-card

p-4

sm:p-5

"

>







{/* HEADER */}



<div


className="

mb-5

flex

flex-col

gap-3

sm:flex-row

sm:items-center

sm:justify-between

"

>



<div className="min-w-0">


<h2

className="

truncate

text-xl

font-bold

"

>

Recent Articles

</h2>



<p

className="

text-sm

text-muted-foreground

"

>

Latest blog posts

</p>



</div>







<Link

href="/admin/blog"

className="

w-fit

text-sm

font-medium

text-primary

hover:underline

"

>

View All

</Link>





</div>









{

recentPosts.length === 0 ? (


<div

className="

rounded-xl

border

py-8

text-center

text-sm

text-muted-foreground

"

>

No articles found.

</div>


)

:

(


<div

className="

space-y-3

"

>


{

recentPosts.map(post=>(


<Link


key={post.id}


href={`/admin/blog/edit/${post.id}`}


className="

group

block

rounded-2xl

border

p-4

transition

hover:bg-muted/50

hover:shadow-sm

"

>



<div

className="

flex

items-start

justify-between

gap-3

"

>




<div

className="

flex

min-w-0

items-center

gap-3

"

>



<div

className="

flex

h-10

w-10

shrink-0

items-center

justify-center

rounded-full

bg-primary/10

text-primary

"

>

<FileText size={18}/>

</div>







<div className="min-w-0">


<h3

className="

truncate

font-semibold

"

>

{post.title}

</h3>




<p

className="

mt-1

truncate

text-xs

text-muted-foreground

"

>

{post.author_name ?? 'Unknown Author'}

</p>



</div>




</div>









<span


className={`

shrink-0

rounded-full

px-2

py-1

text-xs

font-medium

capitalize

${

post.status === 'published'

?

'bg-green-500 text-white'

:

post.status === 'pending'

?

'bg-yellow-500 text-white'

:

'bg-muted text-muted-foreground'

}

`}


>


{post.status}


</span>






</div>











<div

className="

mt-3

flex

items-center

justify-between

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


<Calendar size={13}/>


{

new Date(post.created_at)

.toLocaleDateString(

'en-US',

{

month:'short',

day:'numeric'

}

)

}


</div>







<ArrowRight

size={16}

className="

opacity-0

transition

group-hover:translate-x-1

group-hover:opacity-100

"

/>





</div>






</Link>


))


}



</div>


)


}




</section>


)


}