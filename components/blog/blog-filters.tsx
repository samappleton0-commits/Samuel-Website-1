'use client'


import {
  useRouter,
  useSearchParams,
} from 'next/navigation'

import {
  Search,
  X,
} from 'lucide-react'

import {
  useState,
} from 'react'



type Props = {

  categories:string[]

  currentSearch:string

  currentCategory:string

}





export default function BlogFilters({

  categories,

  currentSearch,

  currentCategory,

}:Props){



  const router = useRouter()

  const searchParams = useSearchParams()



  const [search,setSearch] = useState(

    currentSearch

  )





  function updateURL(

    key:string,

    value:string

  ){


    const params = new URLSearchParams(

      searchParams.toString()

    )



    if(value){

      params.set(

        key,

        value

      )

    }else{

      params.delete(

        key

      )

    }



    params.delete('page')



    router.push(

      `/blog?${params.toString()}`

    )


  }








  function handleSearch(

    e:React.FormEvent

  ){


    e.preventDefault()


    updateURL(

      'search',

      search

    )


  }








  function clearFilters(){



    setSearch('')



    router.push(

      '/blog'

    )


  }







  return (

    <section

      className="
        mb-12

        space-y-6
      "

    >







      {/* SEARCH */}




      <form

        onSubmit={handleSearch}

        className="
          mx-auto

          flex

          max-w-2xl

          items-center

          gap-3

          rounded-full

          border

          bg-card

          px-5

          py-3

        "

      >



        <Search

          size={20}

          className="
            text-muted-foreground
          "

        />





        <input

          value={search}

          onChange={(e)=>

            setSearch(

              e.target.value

            )

          }

          placeholder="
            Search articles...
          "

          className="
            w-full

            bg-transparent

            outline-none

            text-sm
          "

        />







        {search && (


          <button

            type="button"

            onClick={()=>{

              setSearch('')

              updateURL(

                'search',

                ''

              )

            }}

            className="
              text-muted-foreground

              transition

              hover:text-primary
            "

          >

            <X size={18}/>


          </button>


        )}






      </form>









      {/* CATEGORY FILTER */}





      <div

        className="
          flex

          flex-wrap

          justify-center

          gap-3
        "

      >




        {categories.map((item)=>(



          <button


            key={item}


            onClick={()=>


              updateURL(

                'category',

                item === 'All'

                  ? ''

                  : item

              )


            }


            className={`

              rounded-full

              px-5

              py-2

              text-sm

              font-semibold

              transition


              ${

                (

                  item === 'All'

                  && !currentCategory

                )

                ||

                item === currentCategory


                ? 

                'bg-primary text-white'


                :

                'border hover:bg-muted'

              }

            `}


          >

            {item}


          </button>



        ))}





      </div>









      {/* CLEAR */}





      {(currentSearch || currentCategory) && (


        <div

          className="
            text-center
          "

        >



          <button

            onClick={clearFilters}

            className="
              text-sm

              font-semibold

              text-primary

              hover:underline
            "

          >

            Clear Filters


          </button>



        </div>


      )}







    </section>

  )

}