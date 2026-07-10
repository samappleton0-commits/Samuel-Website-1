import {
  redirect,
} from 'next/navigation'


import {
  createClient,
} from '@/lib/supabase-server'


import {
  getHero,
} from '@/lib/hero'


import HeroManager from '@/components/admin/hero-manager'





export default async function HeroPage(){


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



  const hero =
    await getHero()





  return (

    <div className="max-w-6xl">


      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          Hero Management

        </h1>



        <p
          className="
            mt-2
            text-muted-foreground
          "
        >

          Update your homepage hero section.

        </p>


      </div>





      <HeroManager

        initialHero={
          hero
        }

      />



    </div>

  )


}