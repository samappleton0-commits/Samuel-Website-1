import {
  getAboutData,
} from '@/lib/get-about'


import AboutClient from './about-client'





export async function About(){


  const about =
    await getAboutData()



  return (

    <AboutClient

      about={about}

    />

  )


}