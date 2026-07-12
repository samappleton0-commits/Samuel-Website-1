

'use client'


import {
  useState
} from 'react'


import {
  Save
} from 'lucide-react'

import { useRouter } from 'next/navigation'

import {
  createClient
} from '@/lib/supabase-browser'

// ======================================================
// BLOG POST TYPE
// Used for Edit Article
// ======================================================

type BlogPost = {

  id?: string

  title: string

  slug: string

  excerpt: string | null

  content: string

  featured_image: string | null

  category: string | null

  tags: string[] | null

  status: string

  featured: boolean

  seo_title: string | null

  seo_description: string | null

}





// ======================================================
// BLOG EDITOR PROPS
// ======================================================

type Props = {

  initialPost?: BlogPost

}

export default function BlogEditor({

  initialPost,

}: Props){

const router = useRouter()

  const supabase = createClient()



  const [saving,setSaving] =

    useState(false)

const [slugEdited, setSlugEdited] = useState(false)

  const [message,setMessage] =

    useState('')




  const [form,setForm] = useState({

  title: initialPost?.title ?? '',

  slug: initialPost?.slug ?? '',

  excerpt: initialPost?.excerpt ?? '',

  content: initialPost?.content ?? '',

  category: initialPost?.category ?? '',

  tags: initialPost?.tags?.join(', ') ?? '',

  featured_image: initialPost?.featured_image ?? '',

  status: initialPost?.status ?? 'draft',

  featured: initialPost?.featured ?? false,

  seo_title: initialPost?.seo_title ?? '',

  seo_description: initialPost?.seo_description ?? '',

})





  function updateField(

    field:string,

    value:string | boolean

  ){


    setForm({

      ...form,

      [field]: value,

    })


  }





  function generateSlug(

    value:string

  ){


    return value

      .toLowerCase()

      .trim()

      .replace(

        /[^a-z0-9]+/g,

        '-'

      )

      .replace(

        /(^-|-$)/g,

        ''

      )


  }

 async function savePost(){


    try {


      setSaving(true)



      setMessage('')





      const tagsArray =

        form.tags

          .split(',')

          .map(tag => tag.trim())

          .filter(Boolean)







      const articleData = {

  title: form.title,

  slug: form.slug,

  excerpt: form.excerpt || null,

  content: form.content,

  category: form.category || null,

  tags: tagsArray,

  featured_image:
    form.featured_image || null,

  status: form.status,

  featured: form.featured,

  seo_title:
    form.seo_title || null,

  seo_description:
    form.seo_description || null,

  published_at:

    form.status === 'published'

    ? new Date().toISOString()

    : null,

}



let error



if(initialPost?.id){


  const result =

    await supabase

      .from('blog_posts')

      .update(articleData)

      .eq(

        'id',

        initialPost.id

      )


  error = result.error



}else{


  const result =

    await supabase

      .from('blog_posts')

      .insert(articleData)



  error = result.error



}




      if(error)

        throw error






      setMessage(

  initialPost?.id

  ?

  'Article updated successfully.'

  :

  'Article created successfully.'

)
setTimeout(()=>{

  router.push('/admin/blog')

},1000)


      setForm({

        title:'',

        slug:'',

        excerpt:'',

        content:'',

        category:'',

        tags:'',

        featured_image:'',

        status:'draft',

        featured:false,

        seo_title:'',

        seo_description:'',

      })




    }


   catch(error:any){


  console.error(
    'Save blog error:',
    error?.message,
    error?.details,
    error?.hint,
    error
  )


  setMessage(

    error?.message ??
    'Unable to save article.'

  )


}


    finally {


      setSaving(false)


    }


  }





  return (

    <div className="space-y-6">


      {
        message && (

          <div
            className="
              rounded-xl
              border
              border-green-500/20
              bg-green-500/10
              px-4
              py-3
              text-sm
              text-green-700
            "
          >

            {message}

          </div>

        )
      }




      <div
        className="
          rounded-2xl
          border
          bg-card
          p-6
          space-y-5
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

            Article Title

          </label>


          <input

value={form.title}

onChange={(e)=>{

  const title = e.target.value


  setForm(prev => ({

    ...prev,

    title,

    slug: slugEdited
      ? prev.slug
      : generateSlug(title),

  }))

}}

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

            placeholder="article-url-name"

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

            placeholder="Short article summary"

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


          <textarea

            value={form.content}

            onChange={(e)=>

              updateField(

                'content',

                e.target.value

              )

            }

            placeholder="Write your article here..."

            rows={12}

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




      <div
        className="
          rounded-2xl
          border
          bg-card
          p-6
          space-y-5
        "
      >


        <div
          className="
            grid
            gap-5
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

              placeholder="Technology, Design, News..."

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

              placeholder="nextjs, react, web"

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






        <div
          className="
            grid
            gap-5
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

                  e.target.value

                )

              }

              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                bg-background
              "

            >

              <option value="draft">

                Draft

              </option>


              <option value="published">

                Published

              </option>


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

              className="
                h-5
                w-5
              "

            />


            <span>

              Featured Article

            </span>


          </div>


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

            placeholder="SEO title"

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

            placeholder="Search engine description"

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



      <div
        className="
          rounded-2xl
          border
          bg-card
          p-6
          space-y-5
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

            Featured Image

          </label>




          <input

            type="file"

            accept="image/*"

            onChange={async (e)=>{


              const file =

                e.target.files?.[0]



              if(!file)

                return




              try {


                setSaving(true)



                const fileName =

                  `${Date.now()}-${file.name}`





                const { error } =

                  await supabase

                    .storage

                    .from('blog-images')

                    .upload(

                      fileName,

                      file

                    )





                if(error)

                  throw error





                const { data } =

                  supabase

                    .storage

                    .from('blog-images')

                    .getPublicUrl(

                      fileName

                    )





                updateField(

                  'featured_image',

                  data.publicUrl

                )





                setMessage(

                  'Image uploaded successfully.'

                )



              }

              catch(error){


                console.error(

                  'Image upload error:',

                  error

                )



                setMessage(

                  'Image upload failed.'

                )



              }

              finally {


                setSaving(false)


              }



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







        {

          form.featured_image && (

            <div
              className="
                overflow-hidden
                rounded-xl
                border
              "
            >

              <img

                src={form.featured_image}

                alt="Preview"

                className="
                  h-64
                  w-full
                  object-cover
                "

              />


            </div>

          )

        }



      </div>



 




      <div
        className="
          flex
          justify-end
        "
      >


        <button

          onClick={savePost}

          disabled={saving}

          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-accent
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



    </div>

  )


}
