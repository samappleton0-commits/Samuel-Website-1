import { redirect } from 'next/navigation'
import { getUserRole } from './get-user-role'

export async function requireAdmin() {
  const user = await getUserRole()

  if (!user || user.role !== 'admin') {
    redirect('/admin')
  }

  return user
}

export async function requireEditor() {
  const user = await getUserRole()

  if (!user) {
    redirect('/login')
  }

  return user
}