'use server'

import { IUser } from '@/types/backend'
import { revalidateTag } from 'next/cache'

export const handleCreateUser = async (user: IUser) => {
  const res = await fetch('http://localhost:8000/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  revalidateTag('list-user')
  return await res.json()
}

export const handleUpdateUser = async (user: IUser) => {
  const res = await fetch(`http://localhost:8000/users/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  revalidateTag('list-user')
  return await res.json()
}

export const handleDeleteUser = async (userId: number) => {
  const res = await fetch(`http://localhost:8000/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  revalidateTag('list-user')
  return await res.json()
}
