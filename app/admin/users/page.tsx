import { createClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/require-role'

import AddUserForm from '@/components/admin/users/add-user-form'
import UserManager from '@/components/admin/users/user-manager'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage(){


await requireAdmin()



const supabase = await createClient()



const {
  data:users,
  error
}=await supabase

.from('admin_users')

.select('*')

.order(
'created_at',
{
ascending:false
}
)





if(error){

console.error(
'FETCH USERS ERROR:',
error
)

}





console.log(
'USERS:',
users
)






return (

<div className="space-y-8">


<div>

<h1 className="text-3xl font-bold">

User Management

</h1>


<p className="mt-2 text-muted-foreground">

Manage administrators, editors and users.

</p>


</div>





<AddUserForm />





<UserManager

users={users ?? []}

/>





</div>

)


}