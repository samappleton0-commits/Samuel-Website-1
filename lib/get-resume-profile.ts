import { createClient } from '@/lib/supabase-server'

export async function getResumeProfile() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('resume_profile')
    .select('*')
    .single()

  return (
    data ?? {
      full_name: '',
      professional_title: '',
      address: '',
      email: '',
      phone_one: '',
      phone_two: '',
      objective: '',
    }
  )
}