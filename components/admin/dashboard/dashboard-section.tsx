import { ReactNode } from 'react'


type Props = {

  title:string

  description?:string

  icon?:ReactNode

  children:ReactNode

}


export default function DashboardSection({

  title,

  description,

  icon,

  children,

}:Props){


  return (

    <section

      className="
        space-y-5
      "

    >

      {/* HEADER */}

      <div

        className="
          flex
          items-center
          justify-between
        "

      >

        <div

          className="
            flex
            items-center
            gap-3
          "

        >

          {

            icon && (

              <div

                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  bg-primary/10
                  text-primary
                "

              >

                {icon}

              </div>

            )

          }


          <div>

            <h2

              className="
                text-2xl
                font-bold
              "

            >

              {title}

            </h2>


            {

              description && (

                <p

                  className="
                    mt-1
                    text-sm
                    text-muted-foreground
                  "

                >

                  {description}

                </p>

              )

            }

          </div>


        </div>


      </div>


      {/* CONTENT */}


      <div>

        {children}

      </div>


    </section>

  )

}