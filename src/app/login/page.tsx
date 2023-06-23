'use client'
import { AuthContext } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { signIn, user } = useContext(AuthContext)


  const handleSubmitLogin = async (e: BaseSyntheticEvent) => {
    setIsLoading(true)
    e.preventDefault()

    const { errors } = await signIn({ email, password })
    if (!errors) {
      setIsLoading(false)
      return
    }
    setError(errors)
    setTimeout(() => {
      setError([])
    }, 5000);
    setIsLoading(false)
  }

  useEffect(() => {
    if (user) {
      router.push('/mycategories')
    }

  }, [user, router])

  return (
    <form className='flex flex-col items-center' onSubmit={e => handleSubmitLogin(e)}>
      <label className='mb-4'>
        <p>E-mail:</p>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='px-2 py-1 rounded' placeholder='Enter your email' />
      </label>
      <label>
        <p>Password:</p>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='px-2 py-1 rounded' placeholder='Enter your password' />
      </label>
      {error.length > 0 && (
        <ul className=' flex flex-col gap-1 mt-4'>
          {error.map(item => (
            <li key={item} className='rounded bg-red-800 p-2 text-sm'>{item}</li>
          ))}
        </ul>
      )}
      {!isLoading ? <input type='submit' className='btn w-fit text-white' value="Enter" /> : <Loader2 className='animate-spin text-white' />}
    </form>
  )
}

export default Login