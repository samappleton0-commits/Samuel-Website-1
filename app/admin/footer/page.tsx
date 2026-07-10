import {
  redirect,
} from 'next/navigation'


import {
  createClient,
} from '@/lib/supabase-server'


import FooterManager from '@/components/admin/footer-manager'






export default async function FooterPage(){



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








  const {
    data: footer,
    error,
  } =
  await supabase

    .from('footer')

    .select('*')

    .single()








  if(error){

    console.error(
      'Footer loading error:',
      error
    )

  }









  return (

    <div className="max-w-6xl">





      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          Footer Management

        </h1>



        <p className="
          mt-2
          text-muted-foreground
        ">

          Update the information displayed in your website footer.

        </p>


      </div>







      <FooterManager

        initialFooter={
          footer
        }

      />







    </div>

  )


}