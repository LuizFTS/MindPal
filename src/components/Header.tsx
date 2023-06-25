'use client'
import NavLink from 'next/link'
import { lilitaOne } from '@/app/layout'
import { useAuth } from '@/contexts/AuthContext'
import { AuthActionsKind } from '@/types'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'


const Header = () => {
  const router = useRouter()
  const { authState, dispatch } = useAuth()


  const handleLogOut = () => {
    Cookies.remove('mindpalID')
    dispatch({ type: AuthActionsKind.SIGNOUT })
    router.push('/')
  }

  return (
    <header className='w-full bg-zinc-900 px-16'>
      <nav className='flex justify-between items-center'>

        <NavLink href={!authState.user ? '/' : '/mycategories'}>
          <h1 className={`${lilitaOne.className} text-3xl`}>MindPal</h1>
        </NavLink>
        <ul className='flex items-center'>

          {!authState.user ? (
            <>
              <li onClick={() => router.push('/')} className='hidden sm:block header-li'>Home</li>
              <li onClick={() => dispatch({ type: AuthActionsKind.SHOWSIGNINMODAL })} className='header-li'>Sign In</li>
              <li onClick={() => dispatch({ type: AuthActionsKind.SHOWSIGNUPMODAL })} className='header-li'>Sign Up</li>
            </>

          ) : (
            <>
              <li onClick={() => router.push('/mycategories')} className='header-li'>My Categories</li>
              <li onClick={() => handleLogOut()} className='header-li'>Logout</li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header