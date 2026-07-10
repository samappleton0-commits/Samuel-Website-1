import Link from 'next/link'

import { Resume } from '@/components/resume'

export default async function ResumePreviewPage() {


  return (

    <div className="
      mx-auto
      max-w-6xl
      px-6
      py-10
    ">


      <div className="
        mb-8
        flex
        items-center
        justify-between
      ">


        <div>

          <h1 className="text-3xl font-bold">

            Resume Preview

          </h1>


          <p className="
            mt-2
            text-muted-foreground
          ">

            Preview how your public resume appears.

          </p>

        </div>





        <Link

          href="/admin/resume"

          className="
            rounded-xl
            border
            px-5
            py-3
          "

        >

          Back

        </Link>


      </div>





      <Resume />


    </div>

  )

}