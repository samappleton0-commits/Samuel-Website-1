import { createClient } from '@/lib/supabase-server'


export async function getAboutData(){

  const supabase = await createClient()


  const {
    data,
    error
  } =
  await supabase
    .from('about')
    .select('*')
    .single()



  if(error){

    console.error(
      'About loading error:',
      error
    )

    return null

  }


  return data

}