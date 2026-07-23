'use client'


import {
  useState,
  type FormEvent,
} from 'react'


import {
  Mail,
  Phone,
  MapPin,
  Send,
  CalendarClock,
  CheckCircle2,
} from 'lucide-react'


import {
  Reveal,
} from '@/components/reveal'


import {
  SectionHeading,
} from '@/components/section-heading'


import {
  Button,
} from '@/components/ui/button'


import {
  FacebookIcon,
  WhatsappIcon,
} from '@/components/brand-icons'





type Errors = {

  name?: string

  email?: string

  message?: string

}





type ContactProps = {

  contact:any

}





export default function ContactClient({

  contact,

}:ContactProps){





const data = {


  eyebrow:
    contact?.eyebrow ??
    'Contact',


  title:
    contact?.title ??
    "Let's Work Together",


  description:
    contact?.description ??
    'Looking for Accounting or ICT services? Get in touch to discuss your needs.',


  email:
    contact?.email ??
    '',


  phone:
    contact?.phone ??
    '',


  location:
    contact?.location ??
    '',


  facebook:
    contact?.facebook ??
    '',


  whatsapp:
    contact?.whatsapp ??
    '',


}









const contactItems = [

{

icon:Mail,

label:'Email',

value:data.email,

href:`mailto:${data.email}`,

},


{

icon:Phone,

label:'Phone',

value:data.phone,

href:`tel:${data.phone}`,

},


{

icon:MapPin,

label:'Location',

value:data.location,

},


{

icon:FacebookIcon,

label:'Facebook',

value:data.facebook,

href:data.facebook,

},


{

icon:WhatsappIcon,

label:'WhatsApp',

value:data.whatsapp,

href:data.whatsapp,

},


]









const [errors,setErrors] =
useState<Errors>({})


const [sent,setSent] =
useState(false)


const [submitError,setSubmitError] =
useState('')


const [sending,setSending] =
useState(false)









async function handleSubmit(

e:FormEvent<HTMLFormElement>

){


e.preventDefault()



const form =
e.currentTarget



const formData =
new FormData(form)



const name =
String(
formData.get('name') ?? ''
)
.trim()



const email =
String(
formData.get('email') ?? ''
)
.trim()



const subject =
String(
formData.get('subject') ?? ''
)
.trim()



const message =
String(
formData.get('message') ?? ''
)
.trim()





const next:Errors = {}




if(!name){

next.name =
'Please enter your name.'

}



if(!email){

next.email =
'Please enter your email.'

}

else if(
!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
){

next.email =
'Please enter a valid email address.'

}




if(!message){

next.message =
'Please enter a message.'

}




setErrors(next)




if(Object.keys(next).length > 0){

return

}






try{


setSending(true)

setSubmitError('')

setSent(false)




const response =
await fetch(
'/api/contact',
{

method:'POST',

headers:{
'Content-Type':'application/json',
},


body:JSON.stringify({

name,

email,

subject,

message,

}),


}

)




const result =
await response.json()



if(!result.success){

setSubmitError(

result.error ??

'Unable to send message.'

)


return

}




setSent(true)


form.reset()



}

catch(error){


console.error(error)


setSubmitError(

'Something went wrong. Please try again.'

)


}

finally{

setSending(false)

}


}









const fieldClass =

'w-full rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent'









return (

<section

id="contact"

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
gap-8
lg:grid-cols-5
">






<Reveal

className="
lg:col-span-2
"

>


<div className="
glass
h-full
rounded-3xl
p-8
">


<h3 className="
font-heading
text-xl
font-semibold
">

Contact details

</h3>




<ul className="
mt-6
space-y-4
">


{

contactItems.map((item)=>{


const Icon =
item.icon



const content = (

<span className="
flex
items-center
gap-4
">


<span className="
glass
flex
size-11
items-center
justify-center
rounded-xl
text-accent
">

<Icon className="size-5"/>

</span>



<span>

<span className="
block
text-xs
text-muted-foreground
">

{item.label}

</span>


<span className="
text-sm
text-foreground/90
">

{item.value}

</span>


</span>


</span>

)




return (

<li key={item.label}>


{
item.href ?

<a

href={item.href}

target={
item.href.startsWith('http')
?
'_blank'
:
undefined
}

rel="noreferrer"

className="
transition-opacity
hover:opacity-80
"

>

{content}

</a>


:

content

}


</li>

)


})

}


</ul>



</div>


</Reveal>










<Reveal

delay={1}

className="
lg:col-span-3
"

>



<form

onSubmit={handleSubmit}

noValidate

className="
glass
rounded-3xl
p-8
"

>

<div className="grid gap-5 sm:grid-cols-2">

  <div>

    <label
      htmlFor="name"
      className="mb-2 block text-sm font-medium"
    >
      Full Name
    </label>


    <input

      id="name"

      name="name"

      type="text"

      placeholder="Your Name"

      className={fieldClass}

    />


    {errors.name && (

      <p className="mt-1 text-xs text-destructive">

        {errors.name}

      </p>

    )}


  </div>





  <div>


    <label
      htmlFor="email"
      className="mb-2 block text-sm font-medium"
    >

      Email

    </label>


    <input

      id="email"

      name="email"

      type="email"

      placeholder="your.email@example.com"

      className={fieldClass}

    />



    {errors.email && (

      <p className="mt-1 text-xs text-destructive">

        {errors.email}

      </p>

    )}



  </div>


</div>








<div className="mt-5">


<label

htmlFor="subject"

className="mb-2 block text-sm font-medium"

>

Subject

</label>



<input

id="subject"

name="subject"

type="text"

placeholder="Enter subject"

className={fieldClass}

/>


</div>








<div className="mt-5">


<label

htmlFor="message"

className="mb-2 block text-sm font-medium"

>

Message

</label>



<textarea

id="message"

name="message"

rows={5}

placeholder="Enter details of your request"

className={`${fieldClass} resize-none`}

/>



{errors.message && (

<p className="mt-1 text-xs text-destructive">

{errors.message}

</p>

)}


</div>








{submitError && (

<p className="
mt-4
rounded-xl
border
border-red-500/20
bg-red-500/10
px-4
py-3
text-sm
text-red-500
">

{submitError}

</p>

)}








{sent && (

<p className="
mt-4
flex
items-center
gap-2
text-sm
text-accent
">


<CheckCircle2 className="size-4"/>


Thanks! Your message has been sent.


</p>

)}








<div className="mt-6 flex flex-wrap gap-3">


<Button

type="submit"

size="lg"

disabled={sending}

className="
rounded-full
bg-primary
text-primary-foreground
hover:bg-primary/90
"

>


<Send

className={`size-4 ${
sending ? 'animate-spin' : ''
}`}

/>


{sending ? 'Sending...' : 'Send Message'}


</Button>







<Button
  asChild
  size="lg"
  variant="outline"
  disabled={sending}
  className="
    glass
    rounded-full
    border-surface-border
  "
>
  <a href={`mailto:${data.email}?subject=Schedule a meeting`}>
    <CalendarClock className="size-4" />
    Schedule a Meeting
  </a>
</Button>



</div>

</form>



</Reveal>





</div>




</section>

)

}