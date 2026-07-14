'use client'

import { useState } from 'react'

import {
  MessageCircle,
  Send,
  User,
} from 'lucide-react'



// =====================================================
// TYPES
// =====================================================

type Comment = {

  id:string

  name:string

  content:string

  created_at:string

}



type Props = {

  postId:string

  initialComments:Comment[]

}





// =====================================================
// COMPONENT
// =====================================================

export default function CommentsSection({

  postId,

  initialComments,

}:Props){


  const [comments] =
    useState<Comment[]>(initialComments)



  const [name,setName] =
    useState('')



  const [email,setEmail] =
    useState('')



  const [content,setContent] =
    useState('')



  const [loading,setLoading] =
    useState(false)



  const [message,setMessage] =
    useState('')







  const submitComment = async()=>{


    if(

      !name.trim() ||

      !content.trim()

    ){

      setMessage(
        'Please enter your name and comment.'
      )

      return

    }





    try{


      setLoading(true)

      setMessage('')



      const response =
        await fetch(

          '/api/comment',

          {

            method:'POST',

            headers:{

              'Content-Type':
              'application/json'

            },


            body:JSON.stringify({

              postId,

              name,

              email,

              content

            })

          }

        )





      if(!response.ok){

        throw new Error(
          'Failed'
        )

      }




      setName('')

      setEmail('')

      setContent('')



      setMessage(

        'Your comment has been submitted and is waiting for approval.'

      )


    }


    catch(error){


      setMessage(

        'Something went wrong. Please try again.'

      )


    }


    finally{


      setLoading(false)


    }


  }






  return (

    <section>



      {/* =====================================================
          HEADER
      ===================================================== */}


      <div

        className="
          mb-6
          flex
          items-center
          gap-3
        "

      >


        <MessageCircle

          size={26}

          className="text-primary"

        />


        <h2

          className="
            text-2xl
            font-black
          "

        >

          Comments ({comments.length})

        </h2>


      </div>







      {/* =====================================================
          COMMENT FORM
      ===================================================== */}


      <div

        className="
          rounded-3xl
          border
          border-surface-border
          bg-card
          p-5
        "

      >



        <div

          className="
            grid
            gap-4
            md:grid-cols-2
          "

        >



          <input

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

            placeholder="Your name"

            className="
              rounded-xl
              border
              border-surface-border
              bg-background
              px-4
              py-3
              text-sm
              outline-none
              focus:border-primary
            "

          />




          <input

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
            }

            placeholder="Email (optional)"

            type="email"

            className="
              rounded-xl
              border
              border-surface-border
              bg-background
              px-4
              py-3
              text-sm
              outline-none
              focus:border-primary
            "

          />


        </div>






        <textarea


          value={content}


          onChange={(e)=>
            setContent(e.target.value)
          }


          placeholder="Join the discussion..."


          rows={4}


          className="
            mt-4
            w-full
            resize-none
            rounded-xl
            border
            border-surface-border
            bg-background
            px-4
            py-3
            text-sm
            outline-none
            focus:border-primary
          "


        />






        <button


          onClick={submitComment}


          disabled={loading}


          className="
            mt-4
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-primary
            px-6
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:opacity-90
            disabled:opacity-50
          "


        >


          <Send size={16}/>


          {

            loading

            ?

            'Sending...'

            :

            'Post Comment'

          }


        </button>




        {

          message && (

            <p

              className="
                mt-4
                text-sm
                text-muted-foreground
              "

            >

              {message}

            </p>

          )

        }



      </div>









      {/* =====================================================
          COMMENTS LIST
      ===================================================== */}



      <div

        className="
          mt-8
          space-y-5
        "

      >



      {

        comments.length === 0

        ?

        (

          <div

            className="
              rounded-2xl
              border
              border-surface-border
              p-6
              text-center
            "

          >

            <MessageCircle

              className="
                mx-auto
                mb-3
                text-muted-foreground
              "

            />


            <p

              className="
                text-muted-foreground
              "

            >

              No comments yet.

            </p>


            <p

              className="
                mt-1
                text-sm
                text-muted-foreground
              "

            >

              Be the first to start the conversation.

            </p>


          </div>

        )


        :


        comments.map((comment)=>(


          <article

            key={comment.id}

            className="
              rounded-2xl
              border
              border-surface-border
              bg-card
              p-5
            "

          >



            <div

              className="
                flex
                items-center
                gap-3
              "

            >


              <div

                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                "

              >

                {

                  comment.name

                  ?

                  comment.name
                  .charAt(0)
                  .toUpperCase()

                  :

                  <User size={18}/>

                }


              </div>





              <div>


                <h3

                  className="
                    font-bold
                  "

                >

                  {comment.name}

                </h3>


                <time

                  className="
                    text-xs
                    text-muted-foreground
                  "

                >

                  {

                    new Date(

                      comment.created_at

                    )

                    .toLocaleDateString(

                      'en-GB',

                      {

                        day:'numeric',

                        month:'long',

                        year:'numeric'

                      }

                    )

                  }


                </time>


              </div>


            </div>





            <p

              className="
                mt-4
                leading-7
                text-muted-foreground
              "

            >

              {comment.content}

            </p>



          </article>



        ))

      }



      </div>



    </section>

  )

}