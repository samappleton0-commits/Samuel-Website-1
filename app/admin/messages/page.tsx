import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

import AdminMessageList from '@/components/admin-message-list'


type Props = {
  searchParams: Promise<{
    status?: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function MessagesPage({
  searchParams,
}: Props) {


  const supabase =
    await createClient()



  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser()



  if (!user) {

    redirect('/login')

  }




  const {
    data: messages,
    error,
  } =
    await supabase

      .from('contacts')

      .select('*')

      .order(
        'created_at',
        {
          ascending: false,
        }
      )





  if (error) {

    console.error(error)

  }




  const params =
    await searchParams



  const selectedStatus =
    params.status ?? 'All'





  return (

    <main className="
      min-h-screen
      px-4
      py-16
      sm:px-6
    ">


      <div className="
        mx-auto
        max-w-6xl
      ">



        {/* Header */}

        <div className="mb-10">


          <h1 className="text-3xl font-bold">

            Contact Messages

          </h1>




          <p className="
            mt-2
            text-muted-foreground
          ">

            Manage messages received from your portfolio website.

          </p>



        </div>






        {/* Messages Container */}

        <div className="
          glass
          rounded-3xl
          p-6
        ">



          <div className="
            mb-6
            flex
            items-center
            justify-between
          ">



            <div>


              <h2 className="text-xl font-semibold">

                All Messages

              </h2>



              <p className="
                mt-1
                text-sm
                text-muted-foreground
              ">

                Total received:
                {' '}
                {messages?.length ?? 0}

              </p>



            </div>



          </div>






          <AdminMessageList

            messages={messages ?? []}

            initialStatus={selectedStatus}

          />



        </div>




      </div>



    </main>

  )

}