import {
  redirect,
} from 'next/navigation'


import {
  createClient,
} from '@/lib/supabase-server'


import {
  getAboutData,
} from '@/lib/get-about'


import AboutManager from '@/components/admin/about-manager'






export default async function AboutPage(){


  const supabase =
    await createClient()



  const {
    data:{
      user
    },
  } =
  await supabase.auth.getUser()



  if(!user){

    redirect('/login')

  }




  const about =
    await getAboutData()





  return (

    <div className="max-w-6xl">


      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          About Management

        </h1>



        <p className="
          mt-2
          text-muted-foreground
        ">

          Update your About section content.

        </p>


      </div>





      <AboutManager

        initialAbout={
          about
        }

      />


    </div>

  )


}