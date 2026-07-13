import {

  FileText,

  Clock,

  Globe,

  UserRound,

  Mail,

  GraduationCap,

  Briefcase,

  Star,

} from 'lucide-react'

type Props = {

  posts:any[]

  contacts:any[]

  users:any[]

  education:any[]

  experience:any[]

}

export default function StatsGrid({

  posts,

  contacts,

  users,

  education,

  experience,

}:Props){

  const totalArticles =

    posts.length

  const publishedArticles =

    posts.filter(

      post=>post.status==='published'

    ).length

  const draftArticles =

    posts.filter(

      post=>post.status==='draft'

    ).length

  const pendingArticles =

    posts.filter(

      post=>post.status==='pending'

    ).length

  const featuredArticles =

    posts.filter(

      post=>post.featured

    ).length

  const totalMessages =

    contacts.length

  const unreadMessages =

    contacts.filter(

      contact=>!contact.read

    ).length

  const totalUsers =

    users.length

  const totalEducation =

    education.length

  const totalExperience =

    experience.length

  const cards = [

    {

      title:'Articles',

      value:totalArticles,

      icon:FileText,

      color:'text-blue-500',

    },

    {

      title:'Published',

      value:publishedArticles,

      icon:Globe,

      color:'text-green-500',

    },

    {

      title:'Drafts',

      value:draftArticles,

      icon:Clock,

      color:'text-yellow-500',

    },

    {

      title:'Pending',

      value:pendingArticles,

      icon:Clock,

      color:'text-orange-500',

    },

    {

      title:'Featured',

      value:featuredArticles,

      icon:Star,

      color:'text-amber-500',

    },

    {

      title:'Messages',

      value:totalMessages,

      icon:Mail,

      color:'text-cyan-500',

    },

    {

      title:'Unread',

      value:unreadMessages,

      icon:Mail,

      color:'text-red-500',

    },

    {

      title:'Users',

      value:totalUsers,

      icon:UserRound,

      color:'text-purple-500',

    },

    {

      title:'Experience',

      value:totalExperience,

      icon:Briefcase,

      color:'text-indigo-500',

    },

    {

      title:'Education',

      value:totalEducation,

      icon:GraduationCap,

      color:'text-pink-500',

    },

  ]

  return(

    <div

      className="

        grid

        gap-5

        sm:grid-cols-2

        xl:grid-cols-5

      "

    >

      {

        cards.map(card=>{

          const Icon = card.icon

          return(

            <div

              key={card.title}

              className="

                rounded-2xl

                border

                bg-card

                p-6

                transition

                hover:-translate-y-1

                hover:shadow-lg

              "

            >

              <div

                className="

                  flex

                  items-center

                  justify-between

                "

              >

                <Icon

                  className={card.color}

                  size={28}

                />

                <span

                  className="

                    text-3xl

                    font-bold

                  "

                >

                  {card.value}

                </span>

              </div>

              <h3

                className="

                  mt-6

                  font-semibold

                "

              >

                {card.title}

              </h3>

            </div>

          )

        })

      }

    </div>

  )

}