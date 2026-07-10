import { createClient } from '@/lib/supabase-server'


export async function getFooterData() {


  const supabase =
    await createClient()



  const {
    data,
    error,
  } =
  await supabase

    .from('footer')

    .select('*')

    .single()





  if(error){

    console.error(
      'Footer loading error:',
      error
    )


    return null

  }





  return data

}