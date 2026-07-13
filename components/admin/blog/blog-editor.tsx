'use client'

// =====================================================
// BLOG EDITOR START
// =====================================================


// =====================================================
// IMPORTS
// =====================================================

import {
  useEffect,
  useState,
} from 'react'

import {
  useRouter,
} from 'next/navigation'


import {
  Save,
} from 'lucide-react'


import BlogEditorContent from './blog-editor-content'


import {
  createClient,
} from '@/lib/supabase-browser'



// =====================================================
// TYPES START
// =====================================================


type BlogStatus =
  | 'draft'
  | 'pending'
  | 'published'



export type BlogPost = {

  id?: string

  user_id?: string


  title: string

  slug: string


  author_name: string | null


  excerpt: string | null


  content: string


  category: string | null


  tags: string[] | null


  featured_image: string | null


  status: BlogStatus


  featured: boolean


  seo_title: string | null


  seo_description: string | null


}



// =====================================================
// PROPS
// =====================================================


type Props = {

  initialPost?: BlogPost


  userRole: 'admin' | 'editor'

}



// =====================================================
// COMPONENT START
// =====================================================


export default function BlogEditor({

  initialPost,

  userRole,

}: Props) {



  // =====================================================
  // SETUP
  // =====================================================


  const router = useRouter()


  const supabase = createClient()



  // =====================================================
  // STATES START
  // =====================================================


  const [saving,setSaving] =

    useState(false)



  const [message,setMessage] =

    useState('')



  const [slugEdited,setSlugEdited] =

    useState(false)



  const [form,setForm] =

    useState({



      title:

        initialPost?.title ?? '',



      slug:

        initialPost?.slug ?? '',



      author_name:

        initialPost?.author_name

        ??

        'Samuel Appleton',



      excerpt:

        initialPost?.excerpt

        ??

        '',



      content:

        initialPost?.content

        ??

        '',



      category:

        initialPost?.category

        ??

        '',



      tags:

        initialPost?.tags?.join(', ')

        ??

        '',



      featured_image:

        initialPost?.featured_image

        ??

        '',



      status:

        initialPost?.status

        ??

        'draft',



      featured:

        initialPost?.featured

        ??

        false,



      seo_title:

        initialPost?.seo_title

        ??

        '',



      seo_description:

        initialPost?.seo_description

        ??

        '',



    })



  // =====================================================
  // STATES END
  // =====================================================





  // =====================================================
  // UPDATE FIELD
  // =====================================================


  function updateField(

    field:keyof typeof form,

    value:any

  ){


    setForm(previous => ({


      ...previous,


      [field]:value,


    }))


  }



  // =====================================================
  // AUTO SLUG GENERATOR
  // =====================================================


  useEffect(()=>{


    if(slugEdited) return



    updateField(

      'slug',

      form.title

        .toLowerCase()

        .trim()

        .replace(

          /[^a-z0-9\s-]/g,

          ''

        )

        .replace(

          /\s+/g,

          '-'

        )

    )



  },[

    form.title,

    slugEdited

  ])




// =====================================================
// PART 1 END
// =====================================================
  // =====================================================
  // IMAGE UPLOAD START
  // =====================================================


  async function uploadFeaturedImage(

    file:File

  ){


    const extension =

      file.name.split('.').pop()



    const fileName =

      `blog-${Date.now()}.${extension}`



    const {

      error

    } = await supabase

      .storage

      .from('blog-images')

      .upload(

        fileName,

        file

      )




    if(error){


      console.error(

        'Image upload error:',

        error

      )


      setMessage(

        'Image upload failed.'

      )


      return


    }




    const {

      data

    } = supabase

      .storage

      .from('blog-images')

      .getPublicUrl(

        fileName

      )




    updateField(

      'featured_image',

      data.publicUrl

    )


  }





  function handleFeaturedImageUpload(){


    const input =

      document.createElement(

        'input'

      )



    input.type = 'file'


    input.accept = 'image/*'



    input.onchange = async ()=>{


      const file =

        input.files?.[0]



      if(file){


        await uploadFeaturedImage(

          file

        )


      }


    }



    input.click()


  }



  // =====================================================
  // IMAGE UPLOAD END
  // =====================================================






  // =====================================================
  // SAVE ARTICLE START
  // =====================================================


  async function savePost(){


    try{


      setSaving(true)


      setMessage('')



const {
  data: { user },
} = await supabase.auth.getUser()

if (!user) {

  setMessage('You must be logged in.')

  setSaving(false)

  return

}
      // ================================================
      // GET CURRENT USER
      // ================================================


      const {

        data:{
          user

        },

        error:userError


      } = await supabase.auth.getUser()




      if(

        userError ||

        !user

      ){


        throw new Error(

          'User session not found.'

        )


      }





      // ================================================
      // PREPARE TAGS
      // ================================================


      const tagsArray =

        form.tags

          .split(',')

          .map(tag =>

            tag.trim()

          )

          .filter(Boolean)





      // ================================================
      // PREPARE STATUS
      // ================================================


      let finalStatus:



      BlogStatus =



        form.status



      if(

        userRole === 'editor'

      ){


        if(

          form.status === 'published'

        ){


          finalStatus = 'pending'


        }


      }




      // ================================================
      // ARTICLE DATA
      // ================================================


      const articleData = {


        user_id:user.id,


        title:

          form.title,



        slug:

          form.slug,



        author_name:

          form.author_name,


user_id: user.id,
        excerpt:

          form.excerpt || null,



        content:

          form.content,



        category:

          form.category || null,



        tags:

          tagsArray,



        featured_image:

          form.featured_image || null,



        status:

          finalStatus,



        featured:

          form.featured,



        seo_title:

          form.seo_title || null,



        seo_description:

          form.seo_description || null,



        published_at:


          finalStatus === 'published'

          ?

          new Date().toISOString()

          :

          null,



      }





      console.log(

        'BLOG DATA:',

        articleData

      )





      // =================================================
      // UPDATE ARTICLE
      // =================================================


      if(initialPost?.id){



        const {

          error

        } = await supabase

          .from('blog_posts')

          .update(

            articleData

          )

          .eq(

            'id',

            initialPost.id

          )




        if(error){

          throw error

        }



      }



      // =================================================
      // CREATE ARTICLE
      // =================================================


      else{


        const {

          error

        } = await supabase

          .from('blog_posts')

          .insert(

            articleData

          )




        if(error){

          throw error

        }


      }




      setMessage(

        initialPost?.id

        ?

        'Article updated successfully.'

        :

        'Article created successfully.'

      )




      setTimeout(()=>{


        router.push(

          '/admin/blog'

        )


      },1000)




    }


    catch(error:any){


      console.error(

        'SAVE BLOG ERROR:',

        error

      )



      setMessage(

        error.message ||

        'Unable to save article.'

      )



    }



    finally{


      setSaving(false)


    }



  }



  // =====================================================
  // SAVE ARTICLE END
  // =====================================================

  // =====================================================
  // UI START
  // =====================================================


  return (


    <div
      className="
        mx-auto
        max-w-5xl
        space-y-8
      "
    >



      {/* =====================================================
          HEADER
      ===================================================== */}


      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >


        <div>


          <h1
            className="
              text-3xl
              font-bold
            "
          >

            {
              initialPost

              ?

              'Edit Article'

              :

              'Create Article'
            }


          </h1>


          <p
            className="
              mt-2
              text-muted-foreground
            "
          >

            Write and manage your blog content.


          </p>


        </div>



        <button

          type="button"

          onClick={savePost}

          disabled={saving}

          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-6
            py-3
            text-white
            disabled:opacity-50
          "

        >


          <Save size={18}/>


          {

            saving

            ?

            'Saving...'

            :

            'Save Article'

          }


        </button>



      </div>





      {/* =====================================================
          MESSAGE
      ===================================================== */}


      {
        message && (

          <div
            className="
              rounded-xl
              border
              px-4
              py-3
              text-sm
            "
          >

            {message}


          </div>

        )
      }







      {/* =====================================================
          ARTICLE INFORMATION
      ===================================================== */}



      <div
        className="
          space-y-6
          rounded-2xl
          border
          p-6
        "
      >




        {/* TITLE */}


        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            Article Title

          </label>



          <input

            value={form.title}

            onChange={(e)=>

              updateField(

                'title',

                e.target.value

              )

            }


            placeholder="Enter article title"


            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
            "

          />


        </div>





        {/* SLUG */}


        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            Slug

          </label>



          <input


            value={form.slug}


            onChange={(e)=>{


              setSlugEdited(true)


              updateField(

                'slug',

                e.target.value

              )


            }}


            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
            "

          />


        </div>






        {/* AUTHOR */}


        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            Author Name

          </label>



          <input


            value={form.author_name}


            onChange={(e)=>

              updateField(

                'author_name',

                e.target.value

              )

            }


            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
            "


          />


        </div>







        {/* EXCERPT */}


        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            Short Description

          </label>



          <textarea


            value={form.excerpt}


            onChange={(e)=>

              updateField(

                'excerpt',

                e.target.value

              )

            }


            rows={4}


            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
            "


          />


        </div>





        {/* CONTENT EDITOR */}



        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            Article Content

          </label>



          <BlogEditorContent


            value={form.content}


            onChange={(value)=>

              updateField(

                'content',

                value

              )

            }


          />


        </div>





        {/* CATEGORY + TAGS */}


        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >


          <div>


            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >

              Category

            </label>



            <input


              value={form.category}


              onChange={(e)=>

                updateField(

                  'category',

                  e.target.value

                )

              }


              placeholder="Technology"


              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

            />


          </div>





          <div>


            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >

              Tags

            </label>



            <input


              value={form.tags}


              onChange={(e)=>

                updateField(

                  'tags',

                  e.target.value

                )

              }


              placeholder="nextjs, react"


              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "

            />


          </div>


        </div>





        {/* =====================================================
            FEATURED IMAGE
        ===================================================== */}


        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            Featured Image

          </label>



          <button

            type="button"

            onClick={handleFeaturedImageUpload}

            className="
              rounded-xl
              border
              px-5
              py-3
              hover:bg-muted
            "

          >

            Upload Featured Image


          </button>




          {
            form.featured_image && (


              <div
                className="
                  mt-4
                  space-y-3
                "
              >


                <img

                  src={form.featured_image}

                  alt="Featured preview"

                  className="
                    h-48
                    w-full
                    rounded-xl
                    object-cover
                  "

                />


              </div>


            )
          }


        </div>







        {/* =====================================================
            STATUS + FEATURED
        ===================================================== */}



        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >


          <div>


            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >

              Status

            </label>



            <select


              value={form.status}


              onChange={(e)=>

                updateField(

                  'status',

                  e.target.value as BlogStatus

                )

              }


              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
              "


            >


              <option value="draft">

                Draft

              </option>



              <option value="pending">

                Pending Review

              </option>




              {
                userRole === 'admin' && (

                  <option value="published">

                    Published

                  </option>

                )
              }


            </select>


          </div>






          <div
            className="
              flex
              items-center
              gap-3
              pt-8
            "
          >


            <input

              type="checkbox"

              checked={form.featured}


              onChange={(e)=>

                updateField(

                  'featured',

                  e.target.checked

                )

              }

            />


            <span>

              Featured Article

            </span>


          </div>



        </div>








        {/* =====================================================
            SEO
        ===================================================== */}



        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            SEO Title

          </label>



          <input


            value={form.seo_title}


            onChange={(e)=>

              updateField(

                'seo_title',

                e.target.value

              )

            }


            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
            "


          />


        </div>





        <div>


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >

            SEO Description

          </label>



          <textarea


            value={form.seo_description}


            onChange={(e)=>

              updateField(

                'seo_description',

                e.target.value

              )

            }


            rows={4}


            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
            "


          />


        </div>



      </div>







      {/* =====================================================
          FOOTER SAVE BUTTON
      ===================================================== */}



      <div
        className="
          flex
          justify-end
          border-t
          pt-6
        "
      >


        <button


          type="button"


          onClick={savePost}


          disabled={saving}



          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-primary
            px-6
            py-3
            text-white
            disabled:opacity-50
          "


        >


          <Save size={18}/>



          {


            saving

            ?

            'Saving...'


            :


            initialPost

            ?

            'Update Article'


            :


            userRole === 'admin'

            ?

            'Publish Article'


            :

            'Submit For Approval'


          }



        </button>



      </div>





    </div>


  )


}



// =====================================================
// BLOG EDITOR END
// =====================================================
