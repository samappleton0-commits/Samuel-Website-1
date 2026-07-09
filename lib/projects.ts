

import { createClient } from '@/lib/supabase-server'



export type Project = {

  id: string

  title: string

  image: string

  description: string

  demo: string

  created_at: string

}





export async function getProjects(){

  const supabase =
    await createClient()



  const {
    data,
    error,
  } =
  await supabase

    .from('projects')

    .select('*')

    .order(
      'created_at',
      {
        ascending:false,
      }
    )





  if(error){

    console.error(
      'Projects fetch error:',
      error
    )

    return []

  }




  return data as Project[]


}


