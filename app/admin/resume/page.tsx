import {
  redirect,
} from 'next/navigation'


import {
  createClient,
} from '@/lib/supabase-server'






export default async function ResumePage(){



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


      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          Resume Management

        </h1>



        <p className="
          mt-2
          text-muted-foreground
        ">

          Resume editor will be available here.

        </p>


      </div>



    </div>

  )

}