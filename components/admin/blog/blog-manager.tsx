
'use client'

import { useMemo, useState } from 'react'
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
  status: 'draft' | 'pending' | 'published'
  featured: boolean
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}


 type Props = {

  initialPosts: BlogPost[]

  userRole: 'admin' | 'editor'

}
export default function BlogManager({

  initialPosts,

  userRole,

}: Props)  {

  const [posts] =

    useState<BlogPost[]>(

      initialPosts

    )



  const [search,setSearch] =

    useState('')



  const filteredPosts =

    useMemo(()=>{

      const value =

        search.toLowerCase()

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

          (post.slug)

            .toLowerCase()

            .includes(value)

        )

      })

    },[posts,search])



  const totalPosts =

    posts.length



  const publishedPosts =

    posts.filter(

      post=>post.status==='published'

    ).length



  const draftPosts =

    posts.filter(

      post=>post.status==='draft'

    ).length

const pendingPosts =

  posts.filter(

    post=>post.status==='pending'

  ).length

  const featuredPosts =

    posts.filter(

      post=>post.featured

    ).length


  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Blog Articles
          </h2>

          <p className="text-muted-foreground mt-2">
            Create, edit and manage your blog articles.
          </p>

        </div>

        <Link
          href="/admin/blog/new"
          className="
            inline-flex
            items-center
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

          <Plus size={18} />

          New Article

        </Link>

      </div>





      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border bg-card p-6">

          <div className="flex items-center justify-between">

            <FileText className="text-accent" />

            <span className="text-3xl font-bold">

              {totalPosts}

            </span>

          </div>

          <p className="mt-4 text-sm text-muted-foreground">

            Total Articles

          </p>

        </div>





        <div className="rounded-2xl border bg-card p-6">

          <div className="flex items-center justify-between">

            <Globe className="text-green-600" />

            <span className="text-3xl font-bold">

              {publishedPosts}

            </span>

          </div>

          <p className="mt-4 text-sm text-muted-foreground">

            Published

          </p>

        </div>





        <div className="rounded-2xl border bg-card p-6">

          <div className="flex items-center justify-between">

            <Clock className="text-yellow-500" />

            <span className="text-3xl font-bold">

              {draftPosts}

            </span>

          </div>

          <p className="mt-4 text-sm text-muted-foreground">

            Drafts

          </p>

        </div>





        <div className="rounded-2xl border bg-card p-6">

          <div className="flex items-center justify-between">

            <Star className="text-amber-500" />

            <span className="text-3xl font-bold">

              {featuredPosts}

            </span>

          </div>

          <p className="mt-4 text-sm text-muted-foreground">

            Featured Articles

          </p>

        </div>

      </div>





      {/* Search */}

      <div className="relative">

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

            setSearch(

              e.target.value

            )

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
            focus:ring-2
            focus:ring-accent
          "

        />

      </div>


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
                Create your first blog article.
              </p>

            </div>

          ) : (

            filteredPosts.map(post => (

              <div

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

                  {/* Thumbnail */}

                  <div
                    className="
                      h-52
                      w-full
                      bg-muted
                      lg:h-auto
                      lg:w-72
                    "
                  >

                    {

                      post.featured_image ? (

                        <img

                          src={post.featured_image}

                          alt={post.title}

                          className="
                            h-full
                            w-full
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

                  {/* Content */}

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
                        items-center
                        gap-2
                      "
                    >

                      <span
                        className="
                          rounded-full
                          bg-muted
                          px-3
                          py-1
                          text-xs
                        "
                      >

                        {post.category || 'General'}

                      </span>

                      

                      {
  post.status === 'published' ? (

    <span
      className="
        rounded-full
        bg-green-500/10
        px-3
        py-1
        text-xs
        text-green-600
      "
    >
      Published
    </span>

  ) : post.status === 'pending' ? (

    <span
      className="
        rounded-full
        bg-blue-500/10
        px-3
        py-1
        text-xs
        text-blue-600
      "
    >
      Pending Approval
    </span>

  ) : (

    <span
      className="
        rounded-full
        bg-yellow-500/10
        px-3
        py-1
        text-xs
        text-yellow-600
      "
    >
      Draft
    </span>

  )
}

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

                          ? new Date(
                              post.published_at
                            ).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

                          : 'Not Published'

                      }

                    </p>

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

    <Pencil size={16} />

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

  {
    post.featured ? (

      <button
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-yellow-300
          px-4
          py-2
          text-yellow-700
        "
      >

        <Star
          size={16}
          fill="currentColor"
        />

        Featured

      </button>

    ) : (

      <button
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          px-4
          py-2
        "
      >

        <Star size={16} />

        Feature

      </button>

    )
  }


  {
    post.status === 'draft' ? (

      <span
        className="
          rounded-xl
          bg-yellow-100
          px-4
          py-2
          text-sm
          text-yellow-700
        "
      >

        Draft

      </span>

    ) : (

      <span
        className="
          rounded-xl
          bg-green-100
          px-4
          py-2
          text-sm
          text-green-700
        "
      >

        Published

      </span>

    )
  }

</div>



                    

                  </div>

                </div>

              </div>

            ))

          )

        }

      </div>


                


            {
        filteredPosts.length > 0 && (

          <div
            className="
              flex
              justify-center
              pt-4
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