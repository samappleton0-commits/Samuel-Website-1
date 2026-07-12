// =====================================================
// BLOG EDITOR CONTENT
// PROFESSIONAL TIPTAP EDITOR
// =====================================================

'use client'

// =====================================================
// IMPORTS
// =====================================================
import { supabase } from '@/lib/supabase'

import TiptapImage from '@tiptap/extension-image'

import { useEditor, EditorContent } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'

import Underline from '@tiptap/extension-underline'

import Highlight from '@tiptap/extension-highlight'

import Link from '@tiptap/extension-link'

import Placeholder from '@tiptap/extension-placeholder'

import TextAlign from '@tiptap/extension-text-align'

import HorizontalRule from '@tiptap/extension-horizontal-rule'

import { Table } from '@tiptap/extension-table'

import { TableRow } from '@tiptap/extension-table-row'

import { TableCell } from '@tiptap/extension-table-cell'

import { TableHeader } from '@tiptap/extension-table-header'

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

Table2,

ImageIcon,

} from 'lucide-react'

// =====================================================
// TYPES
// =====================================================

type Props={

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
const uploadImage = async (
file: File
) => {

try {

const fileExt = file.name.split('.').pop()

const fileName = `${Date.now()}.${fileExt}`


const { error } = await supabase
.storage
.from('blog-images')
.upload(
fileName,
file
)


if(error){

throw error

}


const { data } =
supabase
.storage
.from('blog-images')
.getPublicUrl(
fileName
)

if(editor){

console.log(
  "IMAGE URL:",
  data.publicUrl
)


editor
.chain()
.focus()
.insertContent({

type:'image',

attrs:{

src:data.publicUrl,

},

})
.run()

}


}

catch(error){

console.log(
'Image upload error:',
error
)

}

}

const handleImageUpload = () => {

const input =
document.createElement('input')


input.type='file'

input.accept='image/*'


input.onchange = async () => {

const file =
input.files?.[0]


if(file){

await uploadImage(file)

}

}


input.click()

}
// =====================================================
// EDITOR
// =====================================================

const editor=useEditor({

extensions:[

StarterKit.configure({

heading:{

levels:[1,2,3],

},

}),

Underline,

Highlight,

TiptapImage.configure({

inline:false,

allowBase64:false,

}),

HorizontalRule,

Link.configure({

openOnClick:false,

}),

Placeholder.configure({

placeholder:

'Start writing your article...',

}),

TextAlign.configure({

types:[

'heading',

'paragraph',

],

}),

Table.configure({

resizable:true,

}),

TableRow,

TableHeader,

TableCell,

],

content:value,

immediatelyRender:false,

onUpdate({editor}){

onChange(

editor.getHTML()

)

},

})

if(!editor){

return null

}

// =====================================================
// RETURN
// =====================================================

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
items-center
gap-2
rounded-2xl
border
bg-card
p-3
shadow-sm
"
>

{/* ---------------------------------- */}
{/* Undo / Redo */}
{/* ---------------------------------- */}

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


{/* ---------------------------------- */}
{/* Headings */}
{/* ---------------------------------- */}

<button
type="button"
onClick={()=>{
console.log('H1 clicked')

editor.chain().focus().toggleHeading({level:1}).run()

}}
className={`
rounded-lg
border
px-3
py-2
hover:bg-muted
${
editor.isActive('heading',{level:1})
? 'bg-primary text-white'
: ''
}
`}
>

<Heading1 className="h-4 w-4"/>

</button>


<button
type="button"
onClick={()=>
editor.chain().focus().toggleHeading({level:2}).run()
}
className={`
rounded-lg
border
px-3
py-2
hover:bg-muted
${
editor.isActive('heading',{level:2})
? 'bg-primary text-white'
: ''
}
`}
>

<Heading2 className="h-4 w-4"/>

</button>


<button
type="button"
onClick={()=>
editor.chain().focus().toggleHeading({level:3}).run()
}
className={`
rounded-lg
border
px-3
py-2
hover:bg-muted
${
editor.isActive('heading',{level:3})
? 'bg-primary text-white'
: ''
}
`}
>

<Heading3 className="h-4 w-4"/>

</button>


<div className="mx-1 h-6 w-px bg-border"/>


{/* ---------------------------------- */}
{/* Bold */}
{/* ---------------------------------- */}

<button
type="button"
onClick={()=>
editor.chain().focus().toggleBold().run()
}
className={`
rounded-lg
border
p-2
hover:bg-muted
${
editor.isActive('bold')
? 'bg-primary text-white'
: ''
}
`}
>

<Bold className="h-4 w-4"/>

</button>


{/* ---------------------------------- */}
{/* Italic */}
{/* ---------------------------------- */}

<button
type="button"
onClick={()=>
editor.chain().focus().toggleItalic().run()
}
className={`
rounded-lg
border
p-2
hover:bg-muted
${
editor.isActive('italic')
? 'bg-primary text-white'
: ''
}
`}
>

<Italic className="h-4 w-4"/>

</button>


{/* ---------------------------------- */}
{/* Underline */}
{/* ---------------------------------- */}

<button
type="button"
onClick={()=>
editor.chain().focus().toggleUnderline().run()
}
className={`
rounded-lg
border
p-2
hover:bg-muted
${
editor.isActive('underline')
? 'bg-primary text-white'
: ''
}
`}
>

<UnderlineIcon className="h-4 w-4"/>

</button>


{/* ---------------------------------- */}
{/* Strike */}
{/* ---------------------------------- */}

<button
type="button"
onClick={()=>
editor.chain().focus().toggleStrike().run()
}
className={`
rounded-lg
border
p-2
hover:bg-muted
${
editor.isActive('strike')
? 'bg-primary text-white'
: ''
}
`}
>

<Strikethrough className="h-4 w-4"/>

</button>


{/* ---------------------------------- */}
{/* Highlight */}
{/* ---------------------------------- */}

<button
type="button"
onClick={()=>
editor.chain().focus().toggleHighlight().run()
}
className={`
rounded-lg
border
p-2
hover:bg-muted
${
editor.isActive('highlight')
? 'bg-yellow-400 text-black'
: ''
}
`}
>

<Highlighter className="h-4 w-4"/>

</button>

{/* Bullet List */}

<button
type="button"
onClick={() =>
editor.chain().focus().toggleBulletList().run()
}
className={`
rounded-lg
border
p-2
hover:bg-muted
${
editor.isActive('bulletList')
? 'bg-primary text-white'
: ''
}
`}
>

<List className="h-4 w-4"/>

</button>



{/* Numbered List */}

<button

type="button"

onClick={() =>
  editor?.chain().focus().toggleOrderedList().run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Numbered List"

>

<ListOrdered className="h-4 w-4"/>

</button>



{/* Quote */}

<button

type="button"

onClick={() =>
  editor?.chain().focus().toggleBlockquote().run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Quote"

>

<Quote className="h-4 w-4"/>

</button>



{/* Horizontal Divider */}

<button

type="button"

onClick={() =>
  editor?.chain().focus().setHorizontalRule().run()
}
className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Divider"

>

<Minus className="h-4 w-4"/>

</button>



{/* Left Align */}

<button

type="button"

onClick={() =>
  editor?.chain().focus().setTextAlign('left').run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Align Left"

>

<AlignLeft className="h-4 w-4"/>

</button>



{/* Center Align */}

<button

type="button"

onClick={() =>
  editor?.chain().focus().setTextAlign('center').run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Align Center"

>

<AlignCenter className="h-4 w-4"/>

</button>



{/* Right Align */}

<button

type="button"

onClick={() =>
  editor?.chain().focus().setTextAlign('right').run()
}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Align Right"

>

<AlignRight className="h-4 w-4"/>

</button>

<button

type="button"

onClick={handleImageUpload}

className="
rounded-lg
border
p-2
hover:bg-muted
"

title="Upload Image"

>

<ImageIcon className="h-4 w-4"/>

</button>
</div>
{/* =====================================================
    EDITOR AREA
===================================================== */}

<div
className="
rounded-2xl
border
bg-background
shadow-sm
overflow-hidden
"
>

<EditorContent

editor={editor}

className="
max-w-none
min-h-[400px]
p-5
outline-none

prose-headings:font-bold

prose-h1:text-3xl

prose-h2:text-2xl

prose-h3:text-xl

prose-blockquote:border-l-4

prose-blockquote:pl-4

prose-blockquote:italic

prose-img:rounded-xl

"

/>

</div>
</div>

)

}