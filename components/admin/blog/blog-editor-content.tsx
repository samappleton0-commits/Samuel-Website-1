// =====================================================
// BLOG EDITOR CONTENT
// PROFESSIONAL TIPTAP BLOG EDITOR
// =====================================================

'use client'


// =====================================================
// IMPORTS
// =====================================================

import { useState } from 'react'

import {
  EditorContent,
  useEditor,
} from '@tiptap/react'


import StarterKit from '@tiptap/starter-kit'


import Underline from '@tiptap/extension-underline'

import Highlight from '@tiptap/extension-highlight'

import Link from '@tiptap/extension-link'

import Placeholder from '@tiptap/extension-placeholder'

import TextAlign from '@tiptap/extension-text-align'

import HorizontalRule from '@tiptap/extension-horizontal-rule'

import Image from '@tiptap/extension-image'

import { Youtube } from '@tiptap/extension-youtube'

import { TextStyle } from '@tiptap/extension-text-style'

import { Color } from '@tiptap/extension-color'


import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
  Smile,
} from 'lucide-react'

import {
  PlayCircle,
} from 'lucide-react'

import EmojiPicker from 'emoji-picker-react'


import { supabase } from '@/lib/supabase'



// =====================================================
// TYPES
// =====================================================

type Props = {

  value:string

  onChange:(value:string)=>void

}



// =====================================================
// COMPONENT
// =====================================================

export default function BlogEditorContent({

value,

onChange,

}:Props){



const [showEmoji,setShowEmoji] = useState(false)





// =====================================================
// IMAGE UPLOAD
// =====================================================


const uploadImage = async(file:File)=>{


try{


const extension =
file.name.split('.').pop()


const fileName =
`${Date.now()}.${extension}`



const {

error

}=await supabase

.storage

.from('blog-images')

.upload(
fileName,
file
)



if(error){

throw error

}



const {

data

}=supabase

.storage

.from('blog-images')

.getPublicUrl(
fileName
)



editor
?.chain()
.focus()
.setImage({

src:data.publicUrl

})
.run()



}

catch(error){

console.log(
"IMAGE UPLOAD ERROR",
error
)

}


}




const handleImageUpload = ()=>{


const input =
document.createElement('input')


input.type='file'

input.accept='image/*'



input.onchange=async()=>{


const file =
input.files?.[0]


if(file){

await uploadImage(file)

}


}



input.click()


}





// =====================================================
// YOUTUBE EMBED
// =====================================================


const addYoutube = ()=>{


const url =
window.prompt(
"Paste YouTube URL"
)


if(!url){

return

}



editor
?.chain()
.focus()
.setYoutubeVideo({

src:url

})
.run()


}






// =====================================================
// EDITOR
// =====================================================


const editor = useEditor({

extensions:[


StarterKit.configure({

heading:{

levels:[1,2,3]

}

}),



Underline,



Highlight,



TextStyle,



Color,



Image.configure({

allowBase64:false

}),




Youtube.configure({

width:640,

height:360,

controls:true,

}),




Link.configure({

openOnClick:false,

}),




Placeholder.configure({

placeholder:

"Start writing your article..."

}),




TextAlign.configure({

types:[

'heading',

'paragraph'

]

}),




HorizontalRule,



],



content:value,



immediatelyRender:false,



onUpdate({editor}){


onChange(

editor.getHTML()

)


}


})




if(!editor){

return null

}

return(

<div
className="
space-y-4
"
>


{/* =====================================================
    TOOLBAR
===================================================== */}


<div

className="
flex
flex-wrap
gap-2
rounded-2xl
border
bg-card
p-3
shadow-sm
"

>



{/* Undo */}

<button

type="button"

onClick={()=>
editor.chain().focus().undo().run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Undo"

>

<Undo2 className="h-4 w-4"/>

</button>



{/* Redo */}

<button

type="button"

onClick={()=>
editor.chain().focus().redo().run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Redo"

>

<Redo2 className="h-4 w-4"/>

</button>





<div className="mx-1 h-6 w-px bg-border"/>





{/* Heading 1 */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleHeading({
level:1
})
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Heading1 className="h-4 w-4"/>

</button>




{/* Heading 2 */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleHeading({
level:2
})
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Heading2 className="h-4 w-4"/>

</button>




{/* Heading 3 */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleHeading({
level:3
})
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Heading3 className="h-4 w-4"/>

</button>




<div className="mx-1 h-6 w-px bg-border"/>





{/* Bold */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleBold()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Bold className="h-4 w-4"/>

</button>





{/* Italic */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleItalic()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Italic className="h-4 w-4"/>

</button>





{/* Underline */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleUnderline()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<UnderlineIcon className="h-4 w-4"/>

</button>





{/* Strike */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleStrike()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Strikethrough className="h-4 w-4"/>

</button>






{/* Highlight */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleHighlight()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Highlighter className="h-4 w-4"/>

</button>





{/* Bullet List */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleBulletList()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<List className="h-4 w-4"/>

</button>






{/* Ordered List */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleOrderedList()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<ListOrdered className="h-4 w-4"/>

</button>







{/* Quote */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.toggleBlockquote()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Quote className="h-4 w-4"/>

</button>







{/* Divider */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.setHorizontalRule()
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Minus className="h-4 w-4"/>

</button>







{/* Align Left */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.setTextAlign('left')
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<AlignLeft className="h-4 w-4"/>

</button>







{/* Align Center */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.setTextAlign('center')
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<AlignCenter className="h-4 w-4"/>

</button>






{/* Align Right */}

<button

type="button"

onClick={()=>
editor.chain()
.focus()
.setTextAlign('right')
.run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<AlignRight className="h-4 w-4"/>

</button>






{/* Link */}

<button

type="button"

onClick={()=>{


const url =
window.prompt(
"Enter URL"
)



if(url){

editor
.chain()
.focus()
.setLink({

href:url

})
.run()

}


}}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<LinkIcon className="h-4 w-4"/>

</button>







{/* Image */}

<button

type="button"

onClick={handleImageUpload}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<ImageIcon className="h-4 w-4"/>

</button>







{/* YouTube */}

<button

type="button"

onClick={addYoutube}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Insert YouTube Video"

>

<PlayCircle className="h-4 w-4"/>

</button>




{/* Emoji */}

<button

type="button"

onClick={()=>
setShowEmoji(!showEmoji)
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

>

<Smile className="h-4 w-4"/>

</button>





</div>


{/* =====================================================
    EMOJI PICKER
===================================================== */}


{
showEmoji && (

<div
className="
rounded-xl
border
bg-card
p-2
shadow-md
w-fit
"
>

<EmojiPicker

onEmojiClick={(emoji)=>{


editor
.chain()
.focus()
.insertContent(
emoji.emoji
)
.run()



}}

/>

</div>

)

}






{/* =====================================================
    EDITOR AREA
===================================================== */}



<div

className="
rounded-2xl
border
bg-zinc-900
shadow-sm
overflow-hidden
"

>


<EditorContent


editor={editor}


className="
min-h-[450px]

p-6

outline-none

prose

prose-invert

max-w-none


prose-headings:text-white

prose-p:text-white

prose-strong:text-white


prose-a:text-blue-400

prose-a:underline


prose-blockquote:border-l-4

prose-blockquote:border-gray-500

prose-blockquote:text-gray-300


prose-img:

rounded-xl


"


/>


</div>




</div>


)

}