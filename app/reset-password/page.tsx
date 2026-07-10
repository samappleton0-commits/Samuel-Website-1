'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase-browser'


export default function ResetPasswordPage() {


  const router = useRouter()

  const supabase = createClient()



  const [password, setPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')

  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)





  async function handleUpdatePassword(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault()


    setError('')
    setMessage('')



    if (password !== confirmPassword) {

      setError(
        'Passwords do not match.'
      )

      return

    }



    if (password.length < 6) {

      setError(
        'Password must be at least 6 characters.'
      )

      return

    }



    setLoading(true)




    const { error } = await supabase.auth.updateUser({

      password

    })





    if (error) {

      setError(error.message)

      setLoading(false)

      return

    }




    setMessage(
      'Password updated successfully. Redirecting to login...'
    )



    setLoading(false)



    setTimeout(() => {

      router.push('/login')

    }, 2500)



  }





  return (

    <main className="flex min-h-screen items-center justify-center bg-surface px-4">


      <div className="w-full max-w-md">


        <div className="glass rounded-3xl p-8 shadow-xl">





          {/* Brand */}

          <div className="mb-8 text-center">


            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-white shadow-lg">

              SA

            </div>



            <h1 className="text-3xl font-bold">

              Create New Password

            </h1>



            <p className="mt-2 text-sm text-muted-foreground">

              Choose a new password for your admin account

            </p>


          </div>







          <form
            onSubmit={handleUpdatePassword}
          >


            <div className="space-y-5">






              {/* New Password */}

              <div>


                <label

                  htmlFor="password"

                  className="mb-2 block text-sm font-medium"

                >

                  New Password

                </label>



                <input

                  id="password"

                  type="password"

                  placeholder="Enter new password"

                  value={password}

                  onChange={(e)=>setPassword(e.target.value)}

                  className="w-full rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"

                  required

                />


              </div>







              {/* Confirm Password */}

              <div>


                <label

                  htmlFor="confirmPassword"

                  className="mb-2 block text-sm font-medium"

                >

                  Confirm Password

                </label>



                <input

                  id="confirmPassword"

                  type="password"

                  placeholder="Confirm new password"

                  value={confirmPassword}

                  onChange={(e)=>setConfirmPassword(e.target.value)}

                  className="w-full rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-accent"

                  required

                />


              </div>







              {/* Error */}

              {error && (

                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                  {error}

                </div>

              )}








              {/* Success */}

              {message && (

                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">

                  {message}

                </div>

              )}







              {/* Button */}

              <Button

                type="submit"

                disabled={loading}

                className="h-12 w-full rounded-xl text-base font-medium"

              >


                {loading ? (

                  <span className="flex items-center justify-center gap-2">

                    <Loader2 className="h-5 w-5 animate-spin"/>

                    Updating...

                  </span>


                ) : (

                  'Update Password'

                )}


              </Button>



            </div>


          </form>







          {/* Security Footer */}

          <div className="mt-8 border-t border-surface-border pt-6">


            <p className="text-center text-xs text-muted-foreground">


              <ShieldCheck className="mr-1 inline h-4 w-4"/>

              Protected by secure Supabase Authentication


            </p>


          </div>




        </div>


      </div>


    </main>

  )

}