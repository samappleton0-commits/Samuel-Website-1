import Link from 'next/link'
import { Megaphone } from 'lucide-react'


export default function AnnouncementCard() {


  return (

    <div className="
      rounded-2xl
      border
      border-border
      bg-card
      p-6
    ">


      <div className="
        flex
        items-center
        gap-3
      ">


        <div className="
          rounded-xl
          bg-accent/20
          p-3
        ">

          <Megaphone size={24}/>

        </div>



        <div>

          <h2 className="font-semibold text-lg">

            Announcements

          </h2>


          <p className="
            text-sm
            text-muted-foreground
          ">

            Manage visitor welcome messages

          </p>


        </div>


      </div>




      <Link

        href="/admin/announcements"

        className="
          mt-6
          inline-flex
          rounded-xl
          bg-primary
          px-5
          py-3
          text-sm
          font-semibold
          text-primary-foreground
          hover:opacity-90
        "

      >

        Manage Announcements

      </Link>



    </div>

  )

}