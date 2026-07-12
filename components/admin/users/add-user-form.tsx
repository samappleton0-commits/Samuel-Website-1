'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, Loader2 } from 'lucide-react'

import { createEditorUser } from '@/app/admin/users/actions'


export default function AddUserForm(){


  const router = useRouter()


  const [name,setName] = useState('')

  const [email,setEmail] = useState('')

  const [password,setPassword] = useState('')


  const [loading,setLoading] = useState(false)

  const [message,setMessage] = useState('')



async function createEditor(
  e: React.FormEvent
) {

  e.preventDefault()

  if (password.length < 6) {

    setMessage(
      'Password must be at least 6 characters.'
    )

    return

  }

  try {

    setLoading(true)

    setMessage('')

    await createEditorUser({

      name,

      email,

      password,

    })

    setMessage(
      'Editor created successfully.'
    )

    setName('')

    setEmail('')

    setPassword('')

    router.refresh()

  }

  catch (error: any) {

    console.error(
      error
    )

    setMessage(
      error.message ||
      'Unable to create editor.'
    )

  }

  finally {

    setLoading(false)

  }

}





  return (

    <form

      onSubmit={createEditor}

      className="
        space-y-5
        rounded-2xl
        border
        bg-card
        p-6
      "

    >


      <h2 className="
        flex
        items-center
        gap-2
        text-xl
        font-bold
      ">

        <UserPlus size={22}/>

        Add Editor

      </h2>




      <input

        placeholder="Full name"

        value={name}

        onChange={
          e=>setName(e.target.value)
        }

        className="
          w-full
          rounded-xl
          border
          px-4
          py-3
        "

        required

      />





      <input

        type="email"

        placeholder="Email address"

        value={email}

        onChange={
          e=>setEmail(e.target.value)
        }

        className="
          w-full
          rounded-xl
          border
          px-4
          py-3
        "

        required

      />






     <input

  type="password"

  minLength={6}

  placeholder="Temporary password (minimum 6 characters)"

        value={password}

        onChange={
          e=>setPassword(e.target.value)
        }

        className="
          w-full
          rounded-xl
          border
          px-4
          py-3
        "

        required

      />





      {
        message && (

          <p className="text-sm">

            {message}

          </p>

        )
      }




      <button

        disabled={loading}

        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-accent
          px-5
          py-3
          text-white
          disabled:opacity-50
        "

      >

        {
          loading
          ?
          <>

          <Loader2
            className="animate-spin"
            size={18}
          />

          Creating...

          </>
          :
          'Create Editor'
        }


      </button>



    </form>

  )

}