'use client'


type User = {

  id:string

  email:string

  role:string

  created_at:string

}



type Props = {

  users:User[]

}



export default function UserManager({

  users,

}:Props){


  return (

    <div className="space-y-5">


      {
        users.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              p-10
              text-center
              text-muted-foreground
            "
          >

            No users found.

          </div>


        ) : (


          users.map(user=>(

            <div

              key={user.id}

              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                bg-card
                p-6
              "

            >

              <div>


                <h3 className="font-semibold">

                  {user.email}

                </h3>


                <p
                  className="
                    mt-1
                    text-sm
                    text-muted-foreground
                  "
                >

                  Added:
                  {' '}
                 {
  new Date(
    user.created_at
  ).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )
}
                </p>


              </div>



              <span
                className="
                  rounded-full
                  bg-accent/10
                  px-4
                  py-2
                  text-sm
                  text-accent
                "
              >

                {user.role}

              </span>


            </div>


          ))

        )
      }


    </div>

  )

}