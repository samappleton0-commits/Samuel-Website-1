'use client'

// =====================================================
// IMPORTS
// =====================================================

import {
  useEffect,
  useState,
} from 'react'

import { useRouter } from 'next/navigation'

import { Save } from 'lucide-react'

import BlogEditorContent from './blog-editor-content'

import { createClient } from '@/lib/supabase-browser'

// =====================================================
// TYPES
// =====================================================

type BlogPost = {

  id?: string

  title: string

  slug: string

  author_name: string | null

  excerpt: string | null

  content: string

  category: string | null

  tags: string[] | null

  featured_image: string | null

  status: 'draft' | 'pending' | 'published'

  featured: boolean

  seo_title: string | null

  seo_description: string | null

}

type Props = {

  initialPost?: BlogPost

  userRole: 'admin' | 'editor'

}
// =====================================================
// COMPONENT
// =====================================================

export default function BlogEditor({

  initialPost,

  userRole,

}: Props) {

  // =====================================================
  // ROUTER
  // =====================================================

  const router = useRouter()

const supabase = createClient()


// =====================================================
// FEATURED IMAGE UPLOAD
// =====================================================

const uploadFeaturedImage = async (
  file: File
) => {

  const fileExt =
    file.name.split('.').pop()

  const fileName =
    `featured-${Date.now()}.${fileExt}`


  const { error } =
    await supabase
      .storage
      .from('blog-images')
      .upload(
        fileName,
        file
      )


  if(error){

    console.error(error)

    return

  }


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

}


const handleFeaturedImageUpload = () => {

  const input =
    document.createElement('input')


  input.type = 'file'

  input.accept = 'image/*'


  input.onchange = async () => {

    const file =
      input.files?.[0]


    if(file){

      await uploadFeaturedImage(file)

    }

  }


  input.click()

}


// =====================================================
// STATES
// =====================================================
  // =====================================================
  // STATES
  // =====================================================

  const [saving, setSaving] = useState(false)

  const [message, setMessage] = useState('')

  const [slugEdited, setSlugEdited] = useState(false)

  const [form, setForm] = useState({

    title: initialPost?.title ?? '',

    slug: initialPost?.slug ?? '',

    author_name:
      initialPost?.author_name ??
      'Samuel Appleton',

    excerpt:
      initialPost?.excerpt ?? '',

    content:
      initialPost?.content ?? '',

    category:
      initialPost?.category ?? '',

    tags:
      initialPost?.tags?.join(', ') ?? '',

    featured_image:
      initialPost?.featured_image ?? '',

    status:
      initialPost?.status ?? 'draft',

    featured:
      initialPost?.featured ?? false,

    seo_title:
      initialPost?.seo_title ?? '',

    seo_description:
      initialPost?.seo_description ?? '',

  })

  // =====================================================
  // UPDATE FIELD
  // =====================================================

  function updateField(

    field: keyof typeof form,

    value: any

  ) {

    setForm((previous) => ({

      ...previous,

      [field]: value,

    }))

  }

  // =====================================================
  // AUTO GENERATE SLUG
  // =====================================================

  useEffect(() => {

    if (slugEdited) return

    updateField(

      'slug',

      form.title

        .toLowerCase()

        .trim()

        .replace(/[^a-z0-9\s-]/g, '')

        .replace(/\s+/g, '-')

    )

  }, [

    form.title,

    slugEdited,

  ])


// =====================================================
// SAVE ARTICLE
// =====================================================

async function savePost() {

  try {

    setSaving(true)

    setMessage('')

    const tagsArray =

      form.tags

        .split(',')

        .map((tag) => tag.trim())

        .filter(Boolean)

    const articleData = {

      title: form.title,

      slug: form.slug,

      author_name: form.author_name,

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

  userRole === 'editor'

  ? (
      form.status === 'draft'
        ? 'draft'
        : 'pending'
    )

  : form.status,

      featured:
        form.featured,

      seo_title:
        form.seo_title || null,

      seo_description:
        form.seo_description || null,

    published_at:

  userRole === 'admin' &&
  form.status === 'published'

    ? new Date().toISOString()

    : null,

    }

    let error

    // ==========================================
    // UPDATE EXISTING ARTICLE
    // ==========================================

    if (initialPost?.id) {

      const result =

        await supabase

          .from('blog_posts')

          .update(articleData)

          .eq(
            'id',
            initialPost.id
          )

      error = result.error

    }

    // ==========================================
    // CREATE NEW ARTICLE
    // ==========================================

    else {

      const result =

        await supabase

          .from('blog_posts')

          .insert(articleData)

      error = result.error

    }

    if (error) {

      throw error

    }

    setMessage(

      initialPost?.id

        ? 'Article updated successfully.'

        : 'Article created successfully.'

    )

    setTimeout(() => {

      router.push('/admin/blog')

    }, 1000)

    // ==========================================
    // RESET FORM
    // ==========================================

    if (!initialPost) {

      setForm({

        title: '',

        slug: '',

        author_name: 'Samuel Appleton',

        excerpt: '',

        content: '',

        category: '',

        tags: '',

        featured_image: '',

        status: 'draft',

        featured: false,

        seo_title: '',

        seo_description: '',

      })

      setSlugEdited(false)

    }

  }

  catch (error) {

    console.error(
      'Save blog error:',
      error
    )

    setMessage(
      'Unable to save article.'
    )

  }

  finally {

    setSaving(false)

  }

}

// =====================================================
// UI
// =====================================================

return (

<div
  className="
    mx-auto
    max-w-5xl
    space-y-8
  "
>

  {/* ==========================================
      PAGE HEADER
  ========================================== */}

  <div
    className="
      flex
      items-center
      justify-between
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
          ? 'Edit Article'
          : 'Create Article'
        }
      </h1>

      <p
        className="
          mt-1
          text-muted-foreground
        "
      >
        Write and publish your blog articles.
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
        transition
        hover:opacity-90
        disabled:opacity-50
      "

    >

      <Save className="h-5 w-5" />

      {
        saving
        ? 'Saving...'
        : 'Save Article'
      }

    </button>

  </div>


  {/* ==========================================
      SUCCESS MESSAGE
  ========================================== */}

  {

    message && (

      <div
        className="
          rounded-xl
          border
          border-green-500/30
          bg-green-500/10
          px-4
          py-3
          text-green-400
        "
      >

        {message}

      </div>

    )

  }


  {/* ==========================================
      ARTICLE DETAILS
  ========================================== */}

  <div
    className="
      rounded-2xl
      border
      p-6
      space-y-6
    "
  >

    {/* ---------- TITLE ---------- */}

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

        placeholder="Article title..."

        className="
          w-full
          rounded-xl
          border
          px-4
          py-3
        "

      />

    </div>


    {/* ---------- SLUG ---------- */}

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


    {/* ---------- AUTHOR ---------- */}

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


    {/* ---------- EXCERPT ---------- */}

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

        placeholder="Short summary of the article..."

        className="
          w-full
          rounded-xl
          border
          px-4
          py-3
        "

      />

    </div>

    {/* ==========================================
        ARTICLE CONTENT
    ========================================== */}

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


    {/* ==========================================
        CATEGORY & TAGS
    ========================================== */}

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

          placeholder="react, nextjs, supabase"

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


    {/* ==========================================
    FEATURED IMAGE
========================================== */}

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


<p
className="
break-all
text-xs
text-muted-foreground
"
>

{form.featured_image}

</p>


</div>

)
}


</div>


    {/* ==========================================
        STATUS & FEATURED
    ========================================== */}

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
      e.target.value as 'draft' | 'pending' | 'published'
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
    Pending Approval
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
          pt-9
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


    {/* ==========================================
        SEO
    ========================================== */}

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

  {/* ==========================================
      FOOTER ACTIONS
  ========================================== */}

  <div
    className="
      flex
      items-center
      justify-between
      border-t
      pt-6
    "
  >

    <p
      className="
        text-sm
        text-muted-foreground
      "
    >

      {message}

    </p>

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
        transition
        hover:opacity-90
        disabled:opacity-50
      "

    >

      <Save className="h-5 w-5" />

      {

        saving

        ? 'Saving...'

       : initialPost

  ? 'Update Article'

  : userRole === 'admin'

    ? 'Publish Article'

    : 'Submit For Approval'

      }

    </button>

  </div>

</div>

)

}
