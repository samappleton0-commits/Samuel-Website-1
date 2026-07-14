'use client'

import { useEffect, useState } from 'react'


export default function ReadingProgress() {

  const [progress, setProgress] = useState(0)


  useEffect(() => {


    const handleScroll = () => {


      const scrollTop =
        window.scrollY


      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight



      if (documentHeight <= 0) {

        setProgress(0)

        return

      }



      const percentage =
        (scrollTop / documentHeight) * 100



      setProgress(
        Math.min(
          100,
          Math.max(
            0,
            percentage
          )
        )
      )

    }



    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive:true
      }
    )



    handleScroll()



    return () => {

      window.removeEventListener(
        'scroll',
        handleScroll
      )

    }


  }, [])



  return (

    <div

      className="
        fixed
        left-0
        top-0
        z-[9999]
        h-1
        w-full
        bg-transparent
      "

    >

      <div

        className="
          h-full
          bg-primary
          transition-all
          duration-150
          ease-out
        "

        style={{

          width:`${progress}%`

        }}

      />

    </div>

  )

}