'use client'


// =====================================================
// TYPES
// =====================================================

type ShareButtonsProps = {

  url: string

}



// =====================================================
// COMPONENT
// =====================================================

export default function ShareButtons({

  url,

}: ShareButtonsProps) {



  const encodedUrl =
    encodeURIComponent(url)



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

        target="_blank"

        rel="noopener noreferrer"

        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}

        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-surface-border
          px-4
          py-2
          text-sm
          transition
          hover:bg-surface
        "

      >

        Share Facebook

      </a>



      {/* X */}

      <a

        target="_blank"

        rel="noopener noreferrer"

        href={`https://twitter.com/intent/tweet?url=${encodedUrl}`}

        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-surface-border
          px-4
          py-2
          text-sm
          transition
          hover:bg-surface
        "

      >

        Share X

      </a>



      {/* LINKEDIN */}

      <a

        target="_blank"

        rel="noopener noreferrer"

        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}

        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-surface-border
          px-4
          py-2
          text-sm
          transition
          hover:bg-surface
        "

      >

        Share LinkedIn

      </a>


    </div>

  )

}