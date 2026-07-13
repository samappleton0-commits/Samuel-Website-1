'use client'


import Link from 'next/link'

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'



type Props = {

  currentPage:number

  totalPages:number

  search?:string

  category?:string

}





export default function BlogPagination({

  currentPage,

  totalPages,

  search,

  category,

}:Props){



  if(totalPages <= 1){

    return null

  }







  function createURL(page:number){


    const params = new URLSearchParams()



    params.set(

      'page',

      page.toString()

    )



    if(search){


      params.set(

        'search',

        search

      )


    }



    if(category){


      params.set(

        'category',

        category

      )


    }



    return `/blog?${params.toString()}`


  }








  return (

    <div

      className="
        mt-12

        flex

        items-center

        justify-center

        gap-3

      "

    >






      {/* PREVIOUS */}





      {currentPage > 1 && (



        <Link


          href={createURL(

            currentPage - 1

          )}


          className="
            flex

            h-10

            w-10

            items-center

            justify-center

            rounded-full

            border

            transition

            hover:bg-muted
          "


        >


          <ChevronLeft size={18}/>


        </Link>



      )}









      {/* PAGE NUMBERS */}





      {Array.from(

        {

          length:totalPages

        },

        (_,index)=>index+1


      ).map((page)=>(




        <Link


          key={page}


          href={createURL(page)}


          className={`

            flex

            h-10

            w-10

            items-center

            justify-center

            rounded-full

            text-sm

            font-semibold

            transition



            ${

              page === currentPage


              ?

              'bg-primary text-white'


              :

              'border hover:bg-muted'

            }


          `}


        >

          {page}


        </Link>



      ))}









      {/* NEXT */}





      {currentPage < totalPages && (




        <Link


          href={createURL(

            currentPage + 1

          )}


          className="
            flex

            h-10

            w-10

            items-center

            justify-center

            rounded-full

            border

            transition

            hover:bg-muted
          "


        >


          <ChevronRight size={18}/>


        </Link>



      )}





    </div>

  )

}