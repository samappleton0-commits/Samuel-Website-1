'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/components/logout-button'

const links = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: '📊',
  },
  {
    name: 'Messages',
    href: '/admin',
    icon: '📩',
  },
]


export default function AdminSidebar() {

  const pathname = usePathname()


  return (
    <aside className="glass flex h-fit flex-col rounded-3xl p-6 lg:min-h-screen">


      {/* Profile */}
      <div className="mb-8 text-center">


        <Image
          src="/profileme.png"
          alt="Samuel Appleton"
          width={90}
          height={90}
          className="mx-auto rounded-full border border-surface-border object-cover"
        />


        <h2 className="mt-4 text-xl font-bold">
          Samuel Appleton
        </h2>


        <p className="mt-1 text-sm text-muted-foreground">
          Administrator
        </p>


      </div>





      {/* Navigation */}
      <nav className="space-y-2">


        {links.map((link) => (

          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
              pathname === link.href
                ? 'bg-accent text-white'
                : 'hover:bg-surface'
            }`}
          >

            <span>
              {link.icon}
            </span>


            {link.name}


          </Link>

        ))}


      </nav>





      {/* Account */}
      <div className="mt-8">


        <LogoutButton />


      </div>



    </aside>
  )
}