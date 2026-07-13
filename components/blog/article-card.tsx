import Image from 'next/image'
import Link from 'next/link'

import {
  Calendar,
  FileText,
  ArrowRight,
} from 'lucide-react'


type ArticleCardProps = {

  post: {

    id: string

    title: string

    slug: string

    excerpt?: string | null

    category?: string | null

    featured_image?: string | null

    published_at?: string | null

    created_at?: string | null

  }

}



export default function ArticleCard({

  post,

}: ArticleCardProps) {



  const date = new Date(

    post.published_at ??

    post.created_at ??

    Date.now()

  )





  return (

    <article

      className="

        group

        overflow-hidden

        rounded-2xl

        border

        bg-card

        shadow-sm

        transition-all

        duration-300

        hover:-translate-y-1

        hover:shadow-lg

      "

    >



      {/* IMAGE */}



      <Link

        href={`/blog/${post.slug}`}

        className="

          block

          overflow-hidden

        "

      >


        <div

          className="

            relative

            h-48

            w-full

          "

        >


          {post.featured_image ? (


            <Image

              src={post.featured_image}

              alt={post.title}

              fill

              sizes="

                (max-width:768px)100vw,

                (max-width:1200px)50vw,

                25vw

              "

              className="

                object-cover

                transition-transform

                duration-700

                group-hover:scale-105

              "

            />


          ) : (


            <div

              className="

                flex

                h-full

                items-center

                justify-center

                bg-muted

              "

            >

              <FileText

                size={36}

                className="

                  text-muted-foreground

                "

              />


            </div>


          )}



        </div>



      </Link>







      {/* CONTENT */}




      <div

        className="

          p-5

        "

      >





        {/* CATEGORY */}


        <span

          className="

            inline-flex

            rounded-full

            bg-primary/10

            px-3

            py-1

            text-[11px]

            font-semibold

            uppercase

            tracking-wide

            text-primary

          "

        >

          {post.category ?? 'Article'}


        </span>







        {/* TITLE */}



        <h3

          className="

            mt-3

            line-clamp-2

            text-lg

            font-bold

            leading-snug

          "

        >


          <Link

            href={`/blog/${post.slug}`}

            className="

              transition-colors

              hover:text-primary

            "

          >

            {post.title}


          </Link>


        </h3>







        {/* DATE */}



        <div

          className="

            mt-3

            flex

            items-center

            gap-2

            text-xs

            text-muted-foreground

          "

        >


          <Calendar size={14}/>



          {date.toLocaleDateString(

            'en-US',

            {

              year:'numeric',

              month:'short',

              day:'numeric',

            }

          )}



        </div>







        {/* EXCERPT */}




        {post.excerpt && (


          <p

            className="

              mt-3

              line-clamp-2

              text-sm

              leading-6

              text-muted-foreground

            "

          >

            {post.excerpt}


          </p>


        )}







        {/* READ BUTTON */}




       <Link

  href={`/blog/${post.slug}`}

  className="

    mt-5

    inline-flex

    items-center

    gap-2

    rounded-full

    bg-primary

    px-4

    py-2

    text-sm

    font-semibold

    text-white

    transition-all

    duration-300

    hover:-translate-y-0.5

    hover:shadow-md

  "

>

  Read Article


  <ArrowRight

    size={16}

    className="

      transition-transform

      duration-300

      group-hover:translate-x-1

    "

  />


</Link>




      </div>





    </article>

  )

}