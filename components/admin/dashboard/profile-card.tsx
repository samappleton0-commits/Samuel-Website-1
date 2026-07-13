import Image from 'next/image'

import {

  Shield,

  Calendar,

  Mail,

} from 'lucide-react'

type Props = {

  user:{

    name:string

    email:string

    role:string

    avatar_url?:string | null

  }

}

export default function ProfileCard({

  user,

}:Props){

  const today =

    new Date().toLocaleDateString(

      'en-US',

      {

        weekday:'long',

        year:'numeric',

        month:'long',

        day:'numeric',

      }

    )

  return(

    <div

      className="

        rounded-3xl

        border

        bg-card

        p-8

      "

    >

      <div

        className="

          flex

          flex-col

          gap-6

          md:flex-row

          md:items-center

          md:justify-between

        "

      >

        {/* ======================================
            LEFT
        ====================================== */}

        <div

          className="

            flex

            items-center

            gap-5

          "

        >

          {

            user.avatar_url ? (

              <Image

                src={user.avatar_url}

                alt={user.name}

                width={90}

                height={90}

                className="

                  rounded-full

                  object-cover

                  border

                "

              />

            ) : (

              <div

                className="

                  flex

                  h-24

                  w-24

                  items-center

                  justify-center

                  rounded-full

                  bg-accent

                  text-3xl

                  font-bold

                  text-white

                "

              >

                {

                  user.name.charAt(0)

                }

              </div>

            )

          }

          <div>

            <h1

              className="

                text-3xl

                font-bold

              "

            >

              Welcome,

              {' '}

              {user.name}

              👋

            </h1>

            <p

              className="

                mt-2

                text-muted-foreground

              "

            >

              Manage your portfolio from one place.

            </p>

          </div>

        </div>

        {/* ======================================
            RIGHT
        ====================================== */}

        <div

          className="

            grid

            gap-3

            text-sm

          "

        >

          <div

            className="

              flex

              items-center

              gap-3

            "

          >

            <Mail

              size={18}

            />

            <span>

              {user.email}

            </span>

          </div>

          <div

            className="

              flex

              items-center

              gap-3

            "

          >

            <Shield

              size={18}

            />

            <span

              className="

                capitalize

              "

            >

              {user.role}

            </span>

          </div>

          <div

            className="

              flex

              items-center

              gap-3

            "

          >

            <Calendar

              size={18}

            />

            <span>

              {today}

            </span>

          </div>

        </div>

      </div>

    </div>

  )

}