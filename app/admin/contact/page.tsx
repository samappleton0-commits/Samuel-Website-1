import {
  redirect,
} from 'next/navigation'


import {
  createClient,
} from '@/lib/supabase-server'


import {
  getContactData,
} from '@/lib/get-contact'


import ContactManager from '@/components/admin/contact-manager'




export const dynamic = 'force-dynamic'

export default async function ContactPage(){


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







  const contact =
    await getContactData()







  return (

    <div className="max-w-6xl">





      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          Contact Management

        </h1>



        <p className="
          mt-2
          text-muted-foreground
        ">

          Update your contact information displayed on your website.

        </p>


      </div>








      <ContactManager

        initialContact={
          contact
        }

      />






    </div>

  )


}