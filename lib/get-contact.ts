import { createClient } from '@/lib/supabase-server'


export async function getContactData() {

  const supabase = await createClient()


  const {
    data,
    error,
  } = await supabase
    .from('contact')
    .select('*')
    .single()



  if (error) {

    console.error(
      'Contact loading error:',
      error
    )

    return null

  }


  return data

}