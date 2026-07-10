import { createClient } from '@/lib/supabase-server'


export async function getHero() {

  const supabase = await createClient()


  const {
    data,
    error,
  } = await supabase
    .from('hero')
    .select('*')
    .single()


  if (error) {

    console.error(
      'Hero fetch error:',
      error
    )

    return null
  }


  return data

}