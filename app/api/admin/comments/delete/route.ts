// =====================================================
// DELETE COMMENT API
// app/api/admin/comments/delete/route.ts
// =====================================================


import {
  NextResponse,
} from 'next/server'


import {
  createClient,
} from '@/lib/supabase-server'







export async function POST(

request:Request

){



try{



const supabase =

await createClient()






const {

data:{

user

}

}=await supabase.auth.getUser()








if(!user){


return NextResponse.json(

{

error:'Unauthorized'

},

{

status:401

}

)


}








const {

data:admin

}=await supabase


.from('admin_users')


.select('role')


.eq(

'user_id',

user.id

)


.maybeSingle()







if(admin?.role !== 'admin'){


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

commentId

}=await request.json()








if(!commentId){


return NextResponse.json(

{

error:'Comment id required'

},

{

status:400

}

)


}








// delete children first

await supabase


.from('comments')


.delete()


.eq(

'parent_id',

commentId

)









const {

error

}=await supabase


.from('comments')


.delete()


.eq(

'id',

commentId

)









if(error){


throw error


}







return NextResponse.json({

success:true

})






}

catch(error){



console.error(

'DELETE ERROR',

error

)



return NextResponse.json(

{

error:'Unable to delete comment'

},

{

status:500

}

)



}



}