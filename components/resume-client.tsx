'use client'

import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

import DownloadResumeButton from '@/components/download-resume-button'


type ResumeProfile = {
  full_name: string
  professional_title: string
  address: string
  email: string
  phone_one: string
  phone_two: string
  objective: string
}


type Education = {
  id: string
  institution: string
  qualification: string
  location: string
  start_date: string
  end_date: string
  description: string | null
}


type Experience = {
  id: string
  position: string
  company: string
  location: string
  start_date: string
  end_date: string
  description: string | null
}


type Skill = {
  id: string
  name: string
}


type Reference = {
  id: string
  name: string
  position: string
  organization: string
  location: string
  phone: string
}


type Props = {
  profile: ResumeProfile
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  references: Reference[]
}



export default function ResumeClient({

  profile,

  education,

  experience,

  skills,

  references,

}: Props) {


  return (

    <section className="
      mx-auto
      max-w-5xl
      px-4
      py-20
      sm:px-6
    ">


      <div className="
        glass
        rounded-3xl
        p-10
      ">



        {/* HEADER */}

        <div className="
          border-b
          border-surface-border
          pb-8
        ">


          <h1 className="
            font-heading
            text-4xl
            font-bold
          ">

            {profile.full_name}

          </h1>




          <p className="
            mt-2
            text-lg
            text-accent
          ">

            {profile.professional_title}

          </p>




          <div className="mt-6">


            <DownloadResumeButton

              profile={profile}

              education={education}

              experience={experience}

              skills={skills}

              references={references}

            />


          </div>






          <div className="
            mt-6
            flex
            flex-wrap
            gap-6
            text-sm
            text-muted-foreground
          ">


            <span className="flex items-center gap-2">

              <MapPin size={18}/>

              {profile.address}

            </span>



            <span className="flex items-center gap-2">

              <Mail size={18}/>

              {profile.email}

            </span>



            <span className="flex items-center gap-2">

              <Phone size={18}/>

              {profile.phone_one}

            </span>



            <span className="flex items-center gap-2">

              <Phone size={18}/>

              {profile.phone_two}

            </span>


          </div>


        </div>








        {/* OBJECTIVE */}

        <ResumeSection title="Career Objective">

          <p className="leading-8 text-muted-foreground">

            {profile.objective}

          </p>

        </ResumeSection>









        {/* EDUCATION */}

        <ResumeSection title="Education">


          <div className="space-y-6">

            {education.map(item => (

              <div
                key={item.id}
                className="
                  rounded-2xl
                  border
                  border-surface-border
                  p-6
                "
              >

                <h3 className="text-lg font-semibold">

                  {item.qualification}

                </h3>


                <p className="text-accent">

                  {item.institution}

                </p>


                <p className="text-sm text-muted-foreground">

                  {item.location}

                </p>


                <p className="mt-2 text-sm">

                  {item.start_date} - {item.end_date}

                </p>


                {item.description && (

                  <p className="
                    mt-3
                    text-sm
                    text-muted-foreground
                  ">

                    {item.description}

                  </p>

                )}

              </div>

            ))}

          </div>


        </ResumeSection>









        {/* EXPERIENCE */}

        <ResumeSection title="Work Experience">


          <div className="space-y-6">


            {experience.map(item => (

              <div

                key={item.id}

                className="
                  rounded-2xl
                  border
                  border-surface-border
                  p-6
                "

              >


                <h3 className="text-lg font-semibold">

                  {item.position}

                </h3>


                <p className="text-accent">

                  {item.company}

                </p>


                <p className="text-sm text-muted-foreground">

                  {item.location}

                </p>


                <p className="mt-2 text-sm">

                  {item.start_date} - {item.end_date}

                </p>


                {item.description && (

                  <p className="
                    mt-4
                    whitespace-pre-line
                    text-sm
                    text-muted-foreground
                  ">

                    {item.description}

                  </p>

                )}


              </div>

            ))}


          </div>


        </ResumeSection>









        {/* SKILLS */}

        <ResumeSection title="Skills">


          <div className="
            flex
            flex-wrap
            gap-3
          ">


            {skills.map(skill => (

              <span

                key={skill.id}

                className="
                  rounded-full
                  border
                  border-surface-border
                  px-5
                  py-2
                  text-sm
                "

              >

                {skill.name}

              </span>

            ))}


          </div>


        </ResumeSection>









        {/* REFERENCES */}

        <ResumeSection title="References">


          <div className="space-y-6">


            {references.map(item => (

              <div

                key={item.id}

                className="
                  rounded-2xl
                  border
                  border-surface-border
                  p-6
                "

              >


                <h3 className="text-lg font-semibold">

                  {item.name}

                </h3>


                <p className="text-accent">

                  {item.position}

                </p>


                <p className="text-sm text-muted-foreground">

                  {item.organization}

                </p>


                <p className="text-sm text-muted-foreground">

                  {item.location}

                </p>


                <p className="text-sm">

                  Tel: {item.phone}

                </p>


              </div>


            ))}


          </div>


        </ResumeSection>




      </div>


    </section>

  )

}





function ResumeSection({

  title,

  children,

}:{

  title:string

  children:React.ReactNode

}) {


  return (

    <div className="mt-12">


      <h2 className="
        mb-6
        font-heading
        text-2xl
        font-bold
      ">

        {title}

      </h2>


      {children}


    </div>

  )

}