import { getHeroData } from '@/lib/get-hero'

import HeroClient from './hero-client'


export async function Hero() {


  const hero =
    await getHeroData()



  return (

    <HeroClient

      hero={hero}

    />

  )

}