'use client'


import Image from 'next/image'

import {
  CheckCircle2,
} from 'lucide-react'


import {
  Reveal,
} from '@/components/reveal'


import {
  SectionHeading,
} from '@/components/section-heading'





type AboutProps = {

  about:any

}






export default function AboutClient({

  about,

}:AboutProps){





  const data = {


    eyebrow:
      about?.eyebrow ??
      'About Me',



    title:
      about?.title ??
      'Providing Financial and ICT Solutions',



    description:
      about?.description ??
      'Combining Accounting expertise with modern Technology to deliver practical solutions.',



    paragraphOne:
      about?.paragraph_one ??
      'I am a dedicated Accounting and ICT professional committed to delivering reliable financial and digital solutions.',



    paragraphTwo:
      about?.paragraph_two ??
      'My expertise combines accounting with Technology services, including Web Development, Graphic Design, QuickBooks, and ICT training.',



    image:
      about?.image_url ??
      '/images/profileme.webp',



    highlights:
      about?.highlights ??
      [
        'Reliable',
        'Efficient',
        'Innovative',
        'Adaptable',
      ],


  }








return (

<section
id="about"
className="
mx-auto
max-w-6xl
px-4
py-24
sm:px-6
"
>




<SectionHeading

eyebrow={data.eyebrow}

title={data.title}

description={data.description}

/>







<div className="
mt-14
grid
items-center
gap-10
lg:grid-cols-5
">







{/* IMAGE */}


<Reveal

className="
lg:col-span-2
"

>


<div className="
glass
mx-auto
max-w-sm
rounded-3xl
p-3
">


<Image

src={data.image}

alt="Professional profile"

width={520}

height={620}

className="
aspect-[4/5]
w-full
rounded-2xl
object-cover
"

/>


</div>


</Reveal>









{/* TEXT */}


<Reveal

delay={1}

className="
lg:col-span-3
text-center
lg:text-left
"

>



<p className="
text-lg
leading-relaxed
text-foreground/90
">


{data.paragraphOne}


</p>








<p className="
mt-4
leading-relaxed
text-muted-foreground
">


{data.paragraphTwo}


</p>









<ul className="
mt-8
grid
gap-3
sm:grid-cols-2
">


{

data.highlights.map(

(item:string)=>(


<li

key={item}

className="
glass
flex
items-center
justify-center
gap-3
rounded-xl
px-4
py-3
lg:justify-start
"

>


<CheckCircle2

className="
size-5
shrink-0
text-accent
"

/>



<span className="
text-sm
text-foreground/90
">

{item}

</span>


</li>


)

)


}



</ul>







</Reveal>






</div>






</section>


)


}