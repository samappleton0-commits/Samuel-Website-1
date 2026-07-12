'use client'


import Image from 'next/image'

import {
  motion,
} from 'framer-motion'


import {
  ArrowRight,
  Download,
  Eye,
  Mail,
  Sparkles,
} from 'lucide-react'





type HeroProps = {

  hero:any

}





export default function HeroClient({

  hero,

}:HeroProps){






  const data = {


    name:
      hero?.name ??
      'Samuel Appleton',



    roles:
      hero?.roles ??
      [
        'Full Stack Developer'
      ],



    intro:
      hero?.intro ??
      'I build modern, responsive and scalable web applications.',



    availability:
      hero?.availability ??
      'Available for Part-Time & Full-time work',



    heroImage:
      hero?.hero_image ??
      '/images/hero-workspace.webp',



    backgroundImage:
      hero?.background_image ??
      '/images/hero-bg.jpg',



    resume:
      hero?.resume_pdf ??
      '#',



    experienceNumber:
      hero?.experience_number ??
      '3+',



    experienceLabel:
      hero?.experience_label ??
      'Years Experience',



    projectsNumber:
      hero?.projects_number ??
      '15+',



    projectsLabel:
      hero?.projects_label ??
      'Projects',



    primaryButtonText:
      hero?.primary_button_text ??
      'View My Work',



    primaryButtonLink:
      hero?.primary_button_link ??
      '#work',



    secondaryButtonText:
      hero?.secondary_button_text ??
      'Contact Me',



    secondaryButtonLink:
      hero?.secondary_button_link ??
      '#contact',


  }









  return (

<section
id="home"
className="
relative
flex
min-h-screen
items-center
overflow-hidden
pb-16
"
>





<Image

src={data.backgroundImage}

alt=""

fill

priority

sizes="100vw"

className="
object-cover
object-center
opacity-30
"

/>





<div className="
absolute
inset-0
bg-black/50
"/>







<div
aria-hidden="true"
className="
pointer-events-none
absolute
inset-0
"
>


<div className="
absolute
-top-24
-left-24
size-96
rounded-full
bg-primary/25
blur-3xl
"/>


<div className="
absolute
top-1/3
-right-24
size-96
rounded-full
bg-secondary/20
blur-3xl
"/>


<div className="
absolute
bottom-0
left-1/3
size-72
rounded-full
bg-accent/15
blur-3xl
"/>


</div>









<div className="
relative
z-10
mx-auto
grid
w-full
max-w-6xl
items-center
gap-12
px-4
sm:px-6
lg:grid-cols-2
">







<motion.div

initial={{
opacity:0,
y:30,
}}

animate={{
opacity:1,
y:0,
}}

transition={{
duration:0.7,
ease:[0.22,1,0.36,1],
}}

className="
text-center
lg:text-left
lg:text-justify
"

>






<div className="
flex
justify-center
lg:justify-start
">


<span className="
glass
inline-flex
items-center
gap-2
rounded-full
px-4
py-1.5
text-sm
text-white
">


<Sparkles className="
size-4
text-accent
"/>


{data.availability}


</span>


</div>







<h1 className="
mt-6
font-heading
text-4xl
font-extrabold
leading-tight
tracking-tight
text-white
sm:text-5xl
lg:text-6xl
">


Hi, I&apos;m{' '}


<span className="
bg-gradient-to-r
from-primary
via-accent
to-secondary
bg-clip-text
text-transparent
">

{data.name}

</span>


</h1>








<p className="
mt-4
font-heading
text-lg
font-medium
text-white/90
sm:text-xl
">

{
Array.isArray(data.roles)
?
data.roles.join(' • ')
:
data.roles
}

</p>








<p className="
mx-auto
mt-5
max-w-xl
leading-relaxed
text-gray-200
lg:mx-0
">

{data.intro}

</p>









<div className="
mt-8
flex
flex-wrap
justify-center
gap-3
lg:justify-start
">



<a

href={data.primaryButtonLink}

className="
inline-flex
h-10
items-center
justify-center
gap-2
rounded-full
bg-primary
px-5
text-sm
font-medium
text-primary-foreground
transition
hover:bg-primary/90
"

>

{data.primaryButtonText}


<ArrowRight className="size-4"/>


</a>





<a

href={data.secondaryButtonLink}

className="
inline-flex
h-10
items-center
justify-center
gap-2
rounded-full
border
border-white/30
px-5
text-sm
font-medium
text-white
transition
hover:bg-white/10
"

>


<Mail className="size-4"/>


{data.secondaryButtonText}


</a>


</div>









<div className="
mt-4
flex
flex-wrap
justify-center
gap-3
lg:justify-start
">


<a

href={data.resume}

target="_blank"

rel="noreferrer"

className="
inline-flex
items-center
gap-2
rounded-full
px-4
text-sm
text-white
transition
hover:text-accent
"

>

<Eye className="size-4"/>

View My CV


</a>





<a

href={data.resume}

download

className="
inline-flex
items-center
gap-2
rounded-full
px-4
text-sm
text-white
transition
hover:text-accent
"

>


<Download className="size-4"/>

Download CV


</a>


</div>






</motion.div>









<motion.div

initial={{
opacity:0,
scale:0.94,
}}

animate={{
opacity:1,
scale:1,
}}

transition={{
duration:0.8,
delay:0.15,
}}

className="
relative
mx-auto
w-full
max-w-md
"

>



<div className="
glass
rounded-3xl
p-3
">


<Image

src={data.heroImage}

alt="Modern developer workspace"

width={720}

height={720}

priority

className="
aspect-square
w-full
rounded-2xl
object-cover
"

/>


</div>







<motion.div

animate={{
y:[0,-10,0],
}}

transition={{
duration:4,
repeat:Infinity,
ease:'easeInOut',
}}

className="
glass
absolute
-bottom-5
-left-5
rounded-2xl
px-4
py-3
"

>


<p className="
font-heading
text-2xl
font-bold
text-accent
">

{data.experienceNumber}

</p>


<p className="
text-xs
text-white
">

{data.experienceLabel}

</p>


</motion.div>







<motion.div

animate={{
y:[0,10,0],
}}

transition={{
duration:4,
repeat:Infinity,
ease:'easeInOut',
}}

className="
glass
absolute
-top-5
-right-5
rounded-2xl
px-4
py-3
"

>


<p className="
font-heading
text-2xl
font-bold
text-primary
">

{data.projectsNumber}

</p>


<p className="
text-xs
text-white
">

{data.projectsLabel}

</p>


</motion.div>






</motion.div>







</div>





</section>

  )

}