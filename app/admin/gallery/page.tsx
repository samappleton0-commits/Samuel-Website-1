import {
  redirect,
} from 'next/navigation'


import {
  createClient,
} from '@/lib/supabase-server'



export default async function GalleryPage(){


  const supabase =
    await createClient()



  const {
    data:{
      user,
    },
  } =
  await supabase.auth.getUser()



  if(!user){

    redirect('/login')

  }





  return (

    <div className="max-w-6xl">


      <h1 className="text-3xl font-bold">

        Gallery Management

      </h1>


      <p className="mt-2 text-muted-foreground">

        Gallery management coming soon.

      </p>


    </div>

  )

}