import {
  getFooterData,
} from '@/lib/get-footer'


import SiteFooterClient from '@/components/site-footer-client'





export async function SiteFooter(){



  const footer =
    await getFooterData()






  return (


    <SiteFooterClient

      footer={footer}

    />


  )


}