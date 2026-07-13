'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import BlogDeleteButton from './blog-delete-button'
import BlogStatusButton from './blog-status-button'

import {
  Plus,
  Search,
  FileText,
  Globe,
  Pencil,
  Star,
  Clock,
} from 'lucide-react'


type BlogPost = {

  id: string

  title: string

  slug: string

  excerpt: string | null

  content: string

  featured_image: string | null

  category: string | null

  tags: string[] | null

  status:
    | 'draft'
    | 'pending'
    | 'published'

  featured: boolean

  published_at: string | null

  seo_title: string | null

  seo_description: string | null

  created_at: string

  updated_at: string

  author_name: string | null

  user_id: string | null

}



type Props = {

  initialPosts: BlogPost[]

  userRole:
    | 'admin'
    | 'editor'

}


function StatCard({

  icon,

  value,

  label,

}: {

  icon: React.ReactNode

  value: number

  label: string

}) {

  return (

    <div
      className="
        rounded-2xl
        border
        bg-card
        p-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        {icon}


        <span
          className="
            text-3xl
            font-bold
          "
        >

          {value}

        </span>


      </div>


      <p
        className="
          mt-4
          text-sm
          text-muted-foreground
        "
      >

        {label}

      </p>


    </div>

  )

}





function Badge({

  children,

  status,

}: {

  children?: React.ReactNode

  status?: 'draft' | 'pending' | 'published'

}) {


  if(status){


    const styles = {

      published:
      `
      bg-green-500/10
      text-green-600
      `,


      pending:
      `
      bg-blue-500/10
      text-blue-600
      `,


      draft:
      `
      bg-yellow-500/10
      text-yellow-600
      `

    }



    const labels = {

      published:'Published',

      pending:'Pending Approval',

      draft:'Draft'

    }



    return (

      <span
        className={`
          rounded-full
          px-3
          py-1
          text-xs
          ${styles[status]}
        `}
      >

        {labels[status]}


      </span>


    )


  }





  return (

    <span

      className="
        rounded-full
        bg-muted
        px-3
        py-1
        text-xs
      "

    >

      {children}


    </span>


  )

}
export default function BlogManager({

  initialPosts,

  userRole,

}: Props) {


  const [posts,setPosts] =

    useState<BlogPost[]>(

      initialPosts

    )



  const [search,setSearch] =

    useState('')



  const filteredPosts =

    useMemo(()=>{


      const value =

        search
          .toLowerCase()
          .trim()



      if(!value)

        return posts



      return posts.filter(post=>{


        return (

          post.title
            .toLowerCase()
            .includes(value)


          ||

          (post.category ?? '')
            .toLowerCase()
            .includes(value)


          ||

          post.slug
            .toLowerCase()
            .includes(value)

        )


      })


    },[posts,search])



  const totalPosts =

    posts.length



  const publishedPosts =

    posts.filter(

      post =>
        post.status === 'published'

    ).length



  const draftPosts =

    posts.filter(

      post =>
        post.status === 'draft'

    ).length



  const pendingPosts =

    posts.filter(

      post =>
        post.status === 'pending'

    ).length



  const featuredPosts =

    posts.filter(

      post =>
        post.featured

    ).length

      return (

    <div className="space-y-8">


      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
            "
          >
            Blog Articles
          </h2>


          <p
            className="
              mt-2
              text-muted-foreground
            "
          >
            Create, edit and manage your blog articles.
          </p>


        </div>



        <Link

          href="/admin/blog/new"

          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-accent
            px-5
            py-3
            text-white
            transition
            hover:opacity-90
          "

        >

          <Plus size={18}/>

          New Article


        </Link>


      </div>





      {/* STATISTICS */}


      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-5
        "
      >


        <StatCard

          icon={<FileText className="text-accent"/>}

          title="Total Articles"

          value={totalPosts}

        />



        <StatCard

          icon={<Globe className="text-green-600"/>}

          title="Published"

          value={publishedPosts}

        />



        <StatCard

          icon={<Clock className="text-yellow-500"/>}

          title="Drafts"

          value={draftPosts}

        />



        <StatCard

          icon={<Clock className="text-blue-500"/>}

          title="Pending"

          value={pendingPosts}

        />



        <StatCard

          icon={<Star className="text-amber-500"/>}

          title="Featured"

          value={featuredPosts}

        />


      </div>






      {/* SEARCH */}


      <div
        className="
          relative
        "
      >


        <Search

          size={18}

          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-muted-foreground
          "

        />



        <input

          type="text"

          placeholder="Search articles..."

          value={search}

          onChange={(e)=>

            setSearch(e.target.value)

          }


          className="
            w-full
            rounded-2xl
            border
            bg-background
            py-3
            pl-12
            pr-4
            outline-none
            transition
            focus:ring-2
            focus:ring-accent
          "

        />


      </div>
            {/* POSTS LIST */}

      <div className="space-y-5">


        {
          filteredPosts.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                bg-card
                py-20
                text-center
              "
            >

              <FileText

                size={50}

                className="
                  mx-auto
                  text-muted-foreground
                "

              />


              <h3
                className="
                  mt-5
                  text-xl
                  font-semibold
                "
              >
                No Articles Found
              </h3>


              <p
                className="
                  mt-2
                  text-muted-foreground
                "
              >
                Try another search or create a new article.
              </p>


            </div>


          ) : (


            filteredPosts.map(post => (


              <article

                key={post.id}

                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  bg-card
                "

              >


                <div
                  className="
                    flex
                    flex-col
                    lg:flex-row
                  "
                >


                  {/* IMAGE */}


                  <div
                    className="
                      relative
                      h-52
                      w-full
                      bg-muted
                      lg:h-auto
                      lg:w-72
                    "
                  >


                    {
                      post.featured_image ? (


                        <Image

                          src={post.featured_image}

                          alt={post.title}

                          fill

                          sizes="
                            (max-width:1024px) 100vw,
                            288px
                          "

                          className="
                            object-cover
                          "

                        />


                      ) : (


                        <div

                          className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-muted-foreground
                          "

                        >

                          No Image


                        </div>


                      )
                    }


                  </div>





                  {/* CONTENT */}


                  <div
                    className="
                      flex-1
                      p-6
                    "
                  >



                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                      "
                    >



                      <Badge>

                        {post.category ?? 'General'}

                      </Badge>




                      <Badge

                        status={post.status}

                      />




                      {
                        post.featured && (

                          <span
                            className="
                              rounded-full
                              bg-amber-500/10
                              px-3
                              py-1
                              text-xs
                              text-amber-600
                            "
                          >

                            Featured

                          </span>

                        )
                      }



                    </div>





                    <h3

                      className="
                        mt-5
                        text-2xl
                        font-bold
                      "

                    >

                      {post.title}

                    </h3>





                    {
                      post.excerpt && (

                        <p

                          className="
                            mt-3
                            line-clamp-3
                            text-muted-foreground
                          "

                        >

                          {post.excerpt}

                        </p>


                      )
                    }






                    <p

                      className="
                        mt-5
                        text-sm
                        text-muted-foreground
                      "

                    >

                      {
                        post.published_at

                        ?

                        new Date(

                          post.published_at

                        ).toLocaleDateString(

                          'en-US',

                          {

                            year:'numeric',

                            month:'long',

                            day:'numeric'

                          }

                        )

                        :

                        'Not Published'
                      }


                    </p>






                    {/* ACTIONS */}


                    <div

                      className="
                        mt-6
                        flex
                        flex-wrap
                        gap-3
                      "

                    >



                      <Link

                        href={`/admin/blog/${post.id}`}

                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          px-4
                          py-2
                          transition
                          hover:bg-muted
                        "

                      >

                        <Pencil size={16}/>

                        Edit


                      </Link>





                      <BlogDeleteButton

                        id={post.id}

                        status={post.status}

                        userRole={userRole}

                      />





                      <BlogStatusButton

                        id={post.id}

                        status={post.status}

                        userRole={userRole}

                      />





                    </div>



                  </div>


                </div>


              </article>


            ))


          )
        }


      </div>





      {
        filteredPosts.length > 0 && (

          <div
            className="
              text-center
              text-sm
              text-muted-foreground
            "
          >

            Showing {filteredPosts.length} article(s)

          </div>

        )
      }


    </div>

  )


}