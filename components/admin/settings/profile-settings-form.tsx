'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'


type Props = {

  profile:{
    id:string
    name:string
    email:string
    avatar_url:string | null
  }

}



export default function ProfileSettingsForm({

profile

}:Props){


const supabase = createClient()

const router = useRouter()



const [name,setName] = useState(profile.name)

const [avatar,setAvatar] = useState(
  profile.avatar_url ?? ''
)

const [file,setFile] = useState<File | null>(null)

const [loading,setLoading] = useState(false)






async function uploadAvatar(){


  if(!file){

    return avatar

  }





  const extension =
    file.name.split('.').pop()



  const fileName =

    `${profile.id}-${Date.now()}.${extension}`





  const {

    error:uploadError

  } = await supabase.storage


    .from('avatars')


    .upload(

      fileName,

      file,

      {

        cacheControl:'3600',

        upsert:true

      }

    )





  if(uploadError){

    throw uploadError

  }





  const {

    data

  } = supabase.storage


    .from('avatars')


    .getPublicUrl(fileName)





  console.log(
    'NEW AVATAR URL:',
    data.publicUrl
  )





  return data.publicUrl



}







async function updateProfile(){


try{


setLoading(true)





const avatarUrl = await uploadAvatar()





console.log(
  'SAVING PROFILE:',
  {
    name,
    avatarUrl
  }
)







const {

error

} = await supabase


.from('admin_users')


.update({

name:name,

avatar_url:avatarUrl

})


.eq(

'id',

profile.id

)







if(error){

throw error

}






setAvatar(avatarUrl)



setFile(null)



router.refresh()



alert(
'Profile updated successfully'
)



}

catch(error){


console.error(
'PROFILE UPDATE ERROR:',
error
)


alert(
'Profile update failed'
)


}

finally{


setLoading(false)


}


}








return (

<div

className="
rounded-2xl
border
bg-card
p-6
space-y-6
"

>


<h2 className="text-xl font-bold">

Profile Settings

</h2>






<div>


<label className="text-sm font-medium">

Profile Image

</label>





<div className="mt-3 flex items-center gap-5">


<Image

src={

avatar ||

'/profileme.png'

}

alt="Profile"

width={80}

height={80}

className="
rounded-full
object-cover
border
"

/>





<input

type="file"

accept="image/*"

onChange={(e)=>

setFile(

e.target.files?.[0] ?? null

)

}

/>



</div>


</div>








<div>


<label className="text-sm font-medium">

Name

</label>


<input

value={name}

onChange={(e)=>

setName(e.target.value)

}

className="
mt-2
w-full
rounded-xl
border
px-4
py-3
"

/>


</div>








<div>


<label className="text-sm font-medium">

Email

</label>


<input

value={profile.email}

disabled

className="
mt-2
w-full
rounded-xl
border
bg-muted
px-4
py-3
"

/>


</div>








<button

onClick={updateProfile}

disabled={loading}

className="
rounded-xl
bg-accent
px-5
py-3
text-white
disabled:opacity-50
"

>


{

loading

?

'Saving...'

:

'Save Changes'

}



</button>





</div>

)


}