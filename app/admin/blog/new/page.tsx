
import Link from 'next/link'

import {
  ArrowLeft
} from 'lucide-react'

import BlogEditor from '@/components/admin/blog/blog-editor'



export default function NewBlogPage() {


  return (

    <div className="space-y-8">


      {/* Header */}

      <div
        className="
          space-y-3
        "
      >


        <Link

          href="/admin/blog"

          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            transition
            hover:bg-muted
          "

        >

          <ArrowLeft size={16}/>

          Back to Blog Dashboard


        </Link>





        <div>


          <h1
            className="
              text-3xl
              font-bold
            "
          >

            Create New Article

          </h1>


          <p
            className="
              mt-2
              text-muted-foreground
            "
          >

            Write and publish a new blog article.

          </p>


        </div>


      </div>





      <BlogEditor />


    </div>

  )

}