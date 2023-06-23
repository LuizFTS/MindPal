'use client'
import Link from 'next/link'
import { lilitaOne } from '@/app/layout'
import { useAuth } from '@/contexts/AuthContext'
import Cookies from 'js-cookie'


const Header = () => {
  const { user, setUser } = useAuth()

  const handleLogOut = () => {
    Cookies.remove('mindpalID')
    setUser(null)
  }

  return (
    <header className='w-full bg-zinc-900 px-16'>
      <nav className='flex py-2 justify-between items-center'>

        <Link href={!user ? '/' : '/mycategories'}>
          <h1 className={`${lilitaOne.className} text-2xl`}>MindPal</h1>
        </Link>
        <ul className='flex gap-2 sm:gap-4 navList'>

          {!user ? (
            <>
              <Link href="/" className='hidden sm:block'>
                <li>Home</li>
              </Link>
              <Link href="/login">
                <li>Sign In</li>
              </Link>
              <Link href="/register">
                <li>Sign Up</li>
              </Link>
            </>

          ) : (
            <>
              <Link href="/mycategories" className='hidden sm:block'>
                <li>My Categories</li>
              </Link>
              <Link href="/" onClick={() => handleLogOut()}>
                <li>Logout</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header