/* =========================================================
   ADMIN LAYOUT START
========================================================= */


import { redirect } from 'next/navigation'

import AdminSidebar from '@/components/admin-sidebar'

import { createClient } from '@/lib/supabase-server'

import { getUserRole } from '@/lib/get-user-role'





export default async function AdminLayout({

  children,

}: {

  children: React.ReactNode

}) {



// =========================================================
// CHECK LOGIN USER
// =========================================================


const supabase = await createClient()



const {

  data:{
    user
  }

} = await supabase.auth.getUser()





if(!user){

  redirect('/login')

}







// =========================================================
// GET USER ROLE
// =========================================================


const userRole = await getUserRole()





if(!userRole){

  redirect('/login')

}







const role = userRole.role







// =========================================================
// CURRENT PATH PROTECTION
// =========================================================


// NOTE:
// Page-level protection will be added next.
// This keeps the layout clean.






// =========================================================
// ADMIN LAYOUT UI
// =========================================================



return (


<main className="min-h-screen">






{/* =====================================================
    DESKTOP SIDEBAR
===================================================== */}


<aside

className="
hidden
lg:fixed
lg:left-0
lg:top-0
lg:block
lg:h-screen
lg:w-[280px]
lg:p-6
"

>


<AdminSidebar />


</aside>









{/* =====================================================
    MOBILE NAVBAR
===================================================== */}



<div


className="
sticky
top-0
z-50
bg-background
lg:hidden
"


>


<AdminSidebar />


</div>









{/* =====================================================
    PAGE CONTENT
===================================================== */}



<section


className="
px-4
py-16
sm:px-6
lg:ml-[280px]
"


>


{children}


</section>





</main>


)


}


/* =========================================================
   ADMIN LAYOUT END
========================================================= */