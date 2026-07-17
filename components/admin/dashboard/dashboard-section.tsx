import { ReactNode } from 'react'



type Props = {

  title:string

  description?:string

  icon?:ReactNode

  children:ReactNode

}







export default function DashboardSection({

  title,

  description,

  icon,

  children,

}:Props){



return (


<section

className="

w-full

space-y-5

"

>





{/* HEADER */}



<div

className="

flex

flex-col

gap-4

sm:flex-row

sm:items-center

sm:justify-between

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





{

icon && (


<div

className="

flex

h-11

w-11

shrink-0

items-center

justify-center

rounded-2xl

bg-primary/10

text-primary

"

>

{icon}

</div>


)

}







<div

className="

min-w-0

"

>


<h2

className="

truncate

text-xl

font-bold

sm:text-2xl

"

>

{title}

</h2>







{

description && (


<p

className="

mt-1

text-sm

text-muted-foreground

"

>

{description}

</p>


)


}



</div>







</div>






</div>









{/* CONTENT */}


<div

className="

w-full

min-w-0

"

>

{children}

</div>






</section>


)


}