import { getUserRole } from '@/lib/get-user-role'

import ProfileSettingsForm from '@/components/admin/settings/profile-settings-form'


export const dynamic = 'force-dynamic'
export default async function SettingsPage(){


  const user = await getUserRole()



  if(!user){

    return null

  }





  return (

    <div className="space-y-8">



      {/* HEADER */}

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >

          Settings

        </h1>



        <p
          className="
            mt-2
            text-muted-foreground
          "
        >

          Manage your account settings.

        </p>


      </div>







      {/* ACCOUNT INFORMATION */}


      <div

        className="
          rounded-2xl
          border
          bg-card
          p-6
        "

      >


        <h2
          className="
            text-xl
            font-semibold
          "
        >

          Account Information

        </h2>





        <div className="mt-5 space-y-3">


          <p>

            <span className="font-medium">
              Name:
            </span>

            {' '}

            {user.name}


          </p>





          <p>

            <span className="font-medium">
              Email:
            </span>

            {' '}

            {user.email}


          </p>





          <p>

            <span className="font-medium">
              Role:
            </span>

            {' '}

            {user.role}


          </p>



        </div>



      </div>







      {/* PROFILE UPDATE */}


      <ProfileSettingsForm


        profile={{

          id:user.id,

          name:user.name ?? '',

          email:user.email ?? '',

          avatar_url:user.avatar_url ?? null

        }}


      />





    </div>


  )

}