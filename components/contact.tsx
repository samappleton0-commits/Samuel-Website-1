import { getContactData } from '@/lib/get-contact'

import ContactClient from './contact-client'



export async function Contact() {


  const contact =
    await getContactData()



  return (

    <ContactClient

      contact={contact}

    />

  )

}