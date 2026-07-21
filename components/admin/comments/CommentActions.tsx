// =====================================================
// COMMENT ACTIONS
// components/admin/comments/CommentActions.tsx
// =====================================================


'use client'


import {
  useState,
} from 'react'


import {
  Check,
  X,
  Trash2,
} from 'lucide-react'


import {
  useRouter,
} from 'next/navigation'







type Props = {


  commentId:string


  role:

    | 'admin'

    | 'editor'

    | 'user'



  status:

    | 'pending'

    | 'approved'

    | 'rejected'



  isReply?:boolean



}









export default function CommentActions({

  commentId,

  role,

  status,

  isReply=false,

}:Props){





const router = useRouter()






const [

loading,

setLoading

]=useState(false)









async function runAction(

type:

'approve'

|

'reject'

|

'delete'

){





if(type === 'delete'){



const confirmDelete =

window.confirm(

'Delete this comment and all replies?'

)



if(!confirmDelete){

return

}


}









try{


setLoading(true)







const response = await fetch(

`/api/admin/comments/${type}`,

{

method:'POST',

headers:{


'Content-Type':

'application/json'


},


body:JSON.stringify({

commentId

})

}

)







const data =

await response.json()







if(!response.ok){


throw new Error(

data.error ||

'Action failed'

)


}







router.refresh()







}

catch(error){



console.error(

'COMMENT ACTION ERROR',

error

)



}

finally{


setLoading(false)


}



}









// ONLY ADMIN


if(role !== 'admin'){


return null


}









return (



<div

className="

flex

flex-wrap

items-center

gap-3

"

>



{

!isReply && (



<>



<button

type="button"

disabled={

loading ||

status === 'approved'

}

onClick={()=>runAction('approve')}

className="

inline-flex

items-center

gap-2

rounded-full

bg-green-600

px-4

py-2

text-sm

font-semibold

text-white

disabled:opacity-50

"

>


<Check size={15}/>


{

status === 'approved'

?

'Approved'

:

'Approve'

}


</button>









<button

type="button"

disabled={

loading ||

status === 'rejected'

}

onClick={()=>runAction('reject')}

className="

inline-flex

items-center

gap-2

rounded-full

bg-yellow-500

px-4

py-2

text-sm

font-semibold

text-white

disabled:opacity-50

"

>


<X size={15}/>


{

status === 'rejected'

?

'Rejected'

:

'Reject'

}


</button>





</>



)

}









<button

type="button"

disabled={loading}

onClick={()=>runAction('delete')}

className="

inline-flex

items-center

gap-2

rounded-full

bg-red-600

px-4

py-2

text-sm

font-semibold

text-white

disabled:opacity-50

"

>


<Trash2 size={15}/>


Delete


</button>








</div>



)



}