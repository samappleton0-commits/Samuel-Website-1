'use client'


import Image from 'next/image'



type Props = {

name:string

avatar_url:string | null

size?:number

}




export default function UserAvatar({

name,

avatar_url,

size=65

}:Props){



function getInitials(){


return name

.split(' ')

.filter(Boolean)

.slice(0,2)

.map(word=>

word[0]

)

.join('')

.toUpperCase()


}







return (


<>


{

avatar_url ? (


<Image


src={avatar_url}


alt={name}


width={size}


height={size}


className="
rounded-full
border
object-cover
"


/>


)


:


(


<div

style={{

width:size,

height:size

}}

className="
flex
items-center
justify-center
rounded-full
bg-accent
font-bold
text-white
"

>


{getInitials()}


</div>


)



}


</>


)


}