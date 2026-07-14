'use client'

import { useState } from 'react'

import {
  Copy,
  Check,
} from 'lucide-react'

import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from 'react-icons/fa6'



// =====================================================
// TYPES
// =====================================================

type ShareButtonsProps = {

  url:string

}




// =====================================================
// COMPONENT
// =====================================================

export default function ShareButtons({

  url,

}:ShareButtonsProps) {


  const [copied,setCopied] = useState(false)



  const encodedUrl =
    encodeURIComponent(url)





  const copyLink = async()=>{


    await navigator.clipboard.writeText(url)


    setCopied(true)



    setTimeout(()=>{

      setCopied(false)

    },2000)


  }





  const buttonStyle = `

    inline-flex

    items-center

    gap-2

    rounded-full

    border

    border-surface-border

    px-4

    py-2

    text-sm

    font-medium

    transition

    hover:-translate-y-1

    hover:bg-surface

  `





  return (


    <div

      className="
        flex
        flex-wrap
        gap-3
      "

    >





      {/* FACEBOOK */}


      <a

        href={

          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`

        }

        target="_blank"

        rel="noopener noreferrer"

        aria-label="Share on Facebook"

        className={buttonStyle}

      >

        <FaFacebookF size={16}/>

        Facebook


      </a>








      {/* X / TWITTER */}


      <a

        href={

          `https://twitter.com/intent/tweet?url=${encodedUrl}`

        }

        target="_blank"

        rel="noopener noreferrer"

        aria-label="Share on X"

        className={buttonStyle}

      >

        <FaXTwitter size={16}/>

        X


      </a>







      {/* LINKEDIN */}


      <a

        href={

          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

        }

        target="_blank"

        rel="noopener noreferrer"

        aria-label="Share on LinkedIn"

        className={buttonStyle}

      >

        <FaLinkedinIn size={16}/>

        LinkedIn


      </a>







      {/* COPY LINK */}


      <button


        onClick={copyLink}


        className={buttonStyle}


        aria-label="Copy article link"

      >


        {
          copied

          ?

          <Check size={16}/>

          :

          <Copy size={16}/>

        }


        {

          copied

          ?

          'Copied'

          :

          'Copy Link'

        }


      </button>





    </div>


  )

}