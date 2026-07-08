import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'


const highlights = [
  'Reliable',
  'Efficient',
  'Innovative',
  'Adaptable',
]


export function About() {

  return (

    <section
      id="about"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >


      <SectionHeading
        eyebrow="About Me"
        title="Providing Financial and ICT Solutions"
        description="Combining accounting expertise with modern technology to deliver practical solutions."
      />





      <div className="mt-14 grid items-center gap-10 lg:grid-cols-5">





        {/* IMAGE */}

        <Reveal className="lg:col-span-2">


          <div className="glass mx-auto max-w-sm rounded-3xl p-3">


            <Image

              src="/images/profileme.png"

              alt="Professional profile"

              width={520}

              height={620}

              className="aspect-[4/5] w-full rounded-2xl object-cover"

            />


          </div>


        </Reveal>








        {/* TEXT CONTENT */}

        <Reveal
          delay={1}
          className="
            lg:col-span-3
            text-center
            lg:text-left
          "
        >


          <p className="text-lg leading-relaxed text-foreground/90">

            I am a dedicated Accounting and ICT professional committed to
            delivering reliable financial and digital solutions.

          </p>





          <p className="mt-4 leading-relaxed text-muted-foreground">

            My expertise combines accounting and financial management with
            technology services, including Web development, Graphic Design,
            QuickBooks, and ICT training.

            I strive to create practical solutions that improve efficiency
            while staying current with emerging technologies and industry
            best practices.

          </p>







          {/* HIGHLIGHTS */}

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">


            {highlights.map((item) => (

              <li

                key={item}

                className="
                  glass
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  lg:justify-start
                "

              >


                <CheckCircle2
                  className="size-5 shrink-0 text-accent"
                />


                <span className="text-sm text-foreground/90">

                  {item}

                </span>


              </li>


            ))}


          </ul>



        </Reveal>




      </div>



    </section>

  )

}