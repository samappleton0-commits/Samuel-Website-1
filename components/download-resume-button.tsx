'use client'

import dynamic from 'next/dynamic'
import { Download } from 'lucide-react'

import ResumePDF from '@/components/resume-pdf'


const PDFDownloadLink = dynamic(

  () =>
    import('@react-pdf/renderer')
      .then((mod) => mod.PDFDownloadLink),

  {
    ssr: false,
    loading: () => (
      <button
        className="
          flex
          items-center
          gap-2
          rounded-full
          bg-accent
          px-6
          py-3
          text-white
        "
      >
        Preparing...
      </button>
    ),
  }

)



type Props = {

  profile: any

  education: any[]

  experience: any[]

  skills: any[]

  references: any[]

}



export default function DownloadResumeButton({

  profile,

  education,

  experience,

  skills,

  references,

}: Props) {


  return (

    <PDFDownloadLink

      document={

        <ResumePDF

          profile={profile}

          education={education}

          experience={experience}

          skills={skills}

          references={references}

        />

      }

      fileName="Samuel-R-Appleton-Resume.pdf"

    >

      {({ loading }) => (

        <button

          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-accent
            px-6
            py-3
            text-white
            transition
            hover:opacity-90
          "

        >

          <Download size={18}/>


          {
            loading
              ? 'Preparing PDF...'
              : 'Download Resume'
          }


        </button>

      )}

    </PDFDownloadLink>

  )

}