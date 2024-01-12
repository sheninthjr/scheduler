'use client'
import { useSession } from 'next-auth/react'
import React, { use } from 'react'
import { trpc } from '../trpc/client'

const Init = () => {
  const { data:session} = useSession()
  if(session && session.user?.email && session.user.image && session.user.name){
    const userSignin = trpc.user.signIn.useMutation()
    userSignin.mutate({ email: session.user?.email, image: session.user?.image, name: session.user?.name})
  }
  return (
    <>

    </>
  )
}

export default Init