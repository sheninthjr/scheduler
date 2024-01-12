'use client'
import NavBar from './components/NavBar'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <NavBar/>
      <div className='flex justify-center text-white h-screen items-center'>
        <Link href={`/post`}>Post</Link>
      </div>
    </>
  )
}
