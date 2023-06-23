'use client'
import { registerUser } from '@/api/register'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Cookies from 'js-cookie'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const Register = () => {
  const { user } = useAuth()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')

  const [errors, setErrors] = useState([])

  const handleRegisterUser = async (e: React.SyntheticEvent) => {
    setIsLoading(true)

    e.preventDefault()

    const { errors, token } = await registerUser({ firstname, lastname, email, password, confirmpassword })
    if (errors) {
      setIsLoading(false)
      setErrors(errors)
      setTimeout(() => {
        setErrors([])
      }, 6000);
      return
    }

    Cookies.set('mindpalID', token, { expires: 30 })
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setConfirmpassword('')

    setIsLoading(false)

  }


  useEffect(() => {
    if (user) {
      router.push('/mycategories')
    }
  }, [user, router])

  return (
    <form className='flex flex-col items-center' onSubmit={(e) => handleRegisterUser(e)}>
      <label className='mb-4'>
        <p>First Name:</p>
        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" className='px-2 py-1 rounded' placeholder='Enter your first name' />
      </label>
      <label className='mb-4'>
        <p>Last Name:</p>
        <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className='px-2 py-1 rounded' placeholder='Enter your last name' />
      </label>
      <label className='mb-4'>
        <p>E-mail:</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='px-2 py-1 rounded' placeholder='Enter your email' />
      </label>
      <label className='mb-4'>
        <p>Password:</p>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className='px-2 py-1 rounded' placeholder='Enter your password' />
      </label>
      <label>
        <p>Confirm password:</p>
        <input value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} type="password" className='px-2 py-1 rounded' placeholder='Confirm your password' />
      </label>
      {errors.length > 0 && (
        <ul className=' flex flex-col gap-1 mt-4'>
          {errors.map(item => (
            <li key={item} className='rounded bg-red-800 p-2 text-sm'>{item}</li>
          ))}
        </ul>
      )}
      <button className='btn w-fit'>
        {!isLoading ? 'Enter' : <Loader2 className='animate-spin text-white' />}
      </button>
    </form>
  )
}

export default Register