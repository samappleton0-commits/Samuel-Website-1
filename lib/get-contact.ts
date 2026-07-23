import { createClient } from '@/lib/supabase-server'


export async function getContactData() {


  const supabase = await createClient()


  const {
    data,
    error,
  } = await supabase

    .from('contact')

    .select('*')

    .limit(1)



  if(error){

    console.error(
      'Contact loading error:',
      error
    )

    return null

  }



  return data?.[0] ?? null


}