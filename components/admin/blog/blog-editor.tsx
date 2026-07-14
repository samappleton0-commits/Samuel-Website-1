'use client'


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
// BLOG STATUS
// =====================================================


type BlogStatus =

  | 'draft'

  | 'pending'

  | 'published'





// =====================================================
// CATEGORY TAG OPTIONS
// =====================================================


const CATEGORY_TAGS:Record<string,string[]> = {


  "Technology":[

    "Next.js",

    "React",

    "TypeScript",

    "Supabase",

    "Tailwind CSS",

    "AI",

    "Cloud Computing"

  ],



  "Programming":[

    "JavaScript",

    "Python",

    "Algorithms",

    "Software Development",

    "Coding"

  ],



  "Web Development":[

    "Frontend",

    "Backend",

    "Full Stack",

    "API",

    "UI/UX"

  ],



  "Artificial Intelligence":[

    "Machine Learning",

    "Automation",

    "AI Tools",

    "Data Science"

  ],



  "Cybersecurity":[

    "Security",

    "Privacy",

    "Networking",

    "Ethical Hacking"

  ],



  "Health & Wellness":[

    "Fitness",

    "Nutrition",

    "Healthy Living",

    "Wellness"

  ],



  "Business & Finance":[

    "Entrepreneurship",

    "Startup",

    "Marketing",

    "Finance",

    "Leadership"

  ],



  "Lifestyle & Travel":[

    "Travel",

    "Culture",

    "Adventure",

    "Lifestyle"

  ],



  "Personal Development":[

    "Productivity",

    "Career",

    "Motivation",

    "Growth"

  ],



  "Tutorials":[

    "Guides",

    "How To",

    "Learning",

    "Step By Step"

  ]


}






// =====================================================
// BLOG TYPE
// =====================================================


export type BlogPost = {


  id?:string


  user_id?:string



  title:string



  slug:string



  author_name:string | null



  excerpt:string | null



  content:string



  category:string | null



  tags:string[] | null



  featured_image:string | null



  status:BlogStatus



  featured:boolean



  seo_title:string | null



  seo_description:string | null



}







// =====================================================
// PROPS
// =====================================================


type Props = {


  initialPost?:BlogPost



  userRole:

    | 'admin'

    | 'editor'


}








// =====================================================
// COMPONENT
// =====================================================


export default function BlogEditor({

  initialPost,

  userRole,

}:Props){



  const router = useRouter()



  const supabase = createClient()







  // =====================================================
  // STATES
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

        initialPost?.author_name ??

        'Samuel Appleton',





      excerpt:

        initialPost?.excerpt ?? '',





      content:

        initialPost?.content ?? '',





      category:

        initialPost?.category ?? '',





      tags:

        initialPost?.tags ?? [],





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

  field:keyof typeof form,

  value:any

){


  setForm(previous => ({


    ...previous,


    [field]:value,


  }))


}






// =====================================================
// TOGGLE TAG
// =====================================================


function toggleTag(tag:string){


  setForm(previous => ({


    ...previous,


    tags:


      previous.tags.includes(tag)


      ?


      previous.tags.filter(

        item => item !== tag

      )


      :


      [

        ...previous.tags,

        tag

      ]



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
// IMAGE UPLOAD
// =====================================================


async function uploadFeaturedImage(

  file:File

){



  const extension =

    file.name

      .split('.')

      .pop()



  const fileName =

    `blog-${Date.now()}.${extension}`





  const {

    error

  } = await supabase.storage

    .from('blog-images')

    .upload(

      fileName,

      file

    )





  if(error){


    console.error(

      'IMAGE UPLOAD ERROR',

      error

    )


    setMessage(

      'Image upload failed'

    )


    return


  }





  const {

    data

  } = supabase.storage

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





  input.onchange = async()=>{


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
// SAVE ARTICLE
// =====================================================


async function savePost(){



try{


setSaving(true)


setMessage('')






const {

  data:{

    user

  }

} = await supabase.auth.getUser()





if(!user){


  setMessage(

    'You must login first.'

  )


  return


}






let finalStatus:

BlogStatus =

form.status as BlogStatus






if(

  userRole === 'editor'

  &&

  form.status === 'published'

){


  finalStatus = 'pending'


}







const articleData = {


  user_id:user.id,



  title:

    form.title,



  slug:

    form.slug,



  author_name:

    form.author_name,



  excerpt:

    form.excerpt || null,



  content:

    form.content,



  category:

    form.category || null,



  tags:

    form.tags,



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

    ? new Date().toISOString()

    : null,


}





console.log(

  'ARTICLE DATA',

  articleData

)






if(initialPost?.id){



const {

error

}=await supabase

.from('blog_posts')

.update(articleData)

.eq(

'id',

initialPost.id

)





if(error)

throw error



}




else{



const {

error

}=await supabase

.from('blog_posts')

.insert(articleData)





if(error)

throw error



}






setMessage(

initialPost?.id

?

'Article updated successfully'

:

'Article created successfully'

)






setTimeout(()=>{


router.push(

'/admin/blog'

)


},1000)




}





catch(error){


console.error(

'SAVE ERROR',

error

)


setMessage(

'Unable to save article'

)


}




finally{


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





{/* HEADER */}


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









{/* MESSAGE */}



{

message && (

<div

className="
rounded-xl
border
px-4
py-3
"

>

{message}

</div>

)

}









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


className="
w-full
rounded-xl
border
px-4
py-3
"


placeholder="Enter article title"



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


rows={4}



value={form.excerpt}



onChange={(e)=>

updateField(

'excerpt',

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









{/* CONTENT */}


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






{/* CATEGORY */}


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



<select


value={form.category}



onChange={(e)=>{


updateField(

'category',

e.target.value

)



updateField(

'tags',

[]

)



}}




className="
w-full
rounded-xl
border
bg-background
text-foreground
px-4
py-3
outline-none
focus:ring-2
focus:ring-primary
"
>

<option
value=""
className="bg-background text-foreground"
>

Select category

</option>


{

Object.keys(CATEGORY_TAGS)

.map(category=>(


<option

key={category}

value={category}

className="bg-background text-foreground"

>

{category}

</option>


))


}



</select>



</div>









{/* TAGS */}



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




<div

className="
rounded-xl
border
p-4
space-y-3
"

>



{

form.category && CATEGORY_TAGS[form.category]

?

CATEGORY_TAGS[form.category].map(tag=>(



<label


key={tag}



className="
flex
items-center
gap-3
cursor-pointer
"


>


<input


type="checkbox"



checked={

form.tags.includes(tag)

}




onChange={()=>


toggleTag(tag)

}




/>


<span>

{tag}

</span>



</label>



))


:


<p

className="
text-sm
text-muted-foreground
"

>

Select category first

</p>



}



</div>



</div>




</div>








{/* FEATURED IMAGE */}



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


<img


src={form.featured_image}


alt="Featured preview"


className="
mt-4
h-48
w-full
rounded-xl
object-cover
"


/>


)


}



</div>









{/* STATUS + FEATURED */}



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









{/* SEO TITLE */}



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









{/* SEO DESCRIPTION */}



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



rows={4}



value={form.seo_description}



onChange={(e)=>

updateField(

'seo_description',

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








</div>









{/* FOOTER SAVE BUTTON */}



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