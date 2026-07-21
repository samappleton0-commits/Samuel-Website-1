// =====================================================
// UPDATE / DELETE COMMENT API
// app/api/admin/comments/[id]/route.ts
// =====================================================


import {
  NextResponse,
} from 'next/server'


import {
  createClient,
} from '@/lib/supabase-server'







type Context = {

  params:Promise<{

    id:string

  }>

}









// =====================================================
// GET USER
// =====================================================


async function getCurrentUser(){


  const supabase =

    await createClient()





  const {

    data:{

      user

    }

  } = await supabase.auth.getUser()






  if(!user){


    return {

      supabase,

      user:null,

      role:null


    }


  }








  const {

    data:adminUser

  } = await supabase


    .from('admin_users')


    .select(`

      role

    `)


    .eq(

      'user_id',

      user.id

    )


    .maybeSingle()







  return {

    supabase,

    user,

    role:adminUser?.role ?? null


  }


}











// =====================================================
// PATCH UPDATE COMMENT
// =====================================================


export async function PATCH(

request:Request,

context:Context

){


try{


const {

id

}=await context.params






if(!id){


return NextResponse.json(

{

error:'Missing comment id'

},

{

status:400

}

)


}








const body = await request.json()






const content =

body.content?.trim()







if(!content){


return NextResponse.json(

{

error:'Content required'

},

{

status:400

}

)


}









const {

supabase,

user,

role

}=await getCurrentUser()







if(!user || role !== 'admin'){


return NextResponse.json(

{

error:'Permission denied'

},

{

status:403

}

)


}











// CHECK OWNERSHIP


const {

data:comment,

error:findError

}=await supabase


.from('comments')


.select(`

user_id

`)


.eq(

'id',

id

)


.single()








if(findError || !comment){


return NextResponse.json(

{

error:'Comment not found'

},

{

status:404

}

)


}









// ONLY OWNER CAN EDIT


if(comment.user_id !== user.id){


return NextResponse.json(

{

error:

'You can only edit your own comments.'

},

{

status:403

}

)


}









const {

error

}=await supabase


.from('comments')


.update({

content

})


.eq(

'id',

id

)








if(error){


return NextResponse.json(

{

error:error.message

},

{

status:500

}

)


}








return NextResponse.json({

success:true,

message:'Comment updated'

})







}

catch(error){



console.error(

'PATCH COMMENT ERROR',

error

)



return NextResponse.json(

{

error:'Update failed'

},

{

status:500

}

)



}



}









// =====================================================
// DELETE COMMENT
// =====================================================


export async function DELETE(

request:Request,

context:Context

){


try{


const {

id

}=await context.params






const {

supabase,

user,

role

}=await getCurrentUser()







if(!user || role !== 'admin'){


return NextResponse.json(

{

error:'Permission denied'

},

{

status:403

}

)


}









const {

error

}=await supabase


.from('comments')


.delete()


.eq(

'id',

id

)








if(error){


return NextResponse.json(

{

error:error.message

},

{

status:500

}

)


}








return NextResponse.json({

success:true,

message:'Comment deleted'

})







}

catch(error){



console.error(

'DELETE COMMENT ERROR',

error

)



return NextResponse.json(

{

error:'Delete failed'

},

{

status:500

}

)



}



}