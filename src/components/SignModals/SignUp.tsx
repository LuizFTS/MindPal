'use client'
import { useAuth, useErrorModal } from '@/contexts'
import { AlertCircle, Loader2, LucideLoader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Modal from '../Modal'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorContextType } from '@/contexts/ErrorModalContext'

import { AuthContextType } from '@/contexts/AuthContext'
import { registerUser } from '@/api'
import Cookies from 'js-cookie'


const signInSchema = z.object({
  firstname: z.string()
    .nonempty("First name required.")
    .min(3, 'First name must have at least 3 characters.')
    .toLowerCase(),
  lastname: z.string()
    .nonempty('Last name required.')
    .min(3, 'First name must have at least 3 characters.')
    .toLowerCase(),
  email: z.string()
    .nonempty("E-mail required.")
    .email('Invalid e-mail.')
    .toLowerCase(),
  password: z.string()
    .nonempty('Password required')
    .min(6, 'Password requires at least 6 characters.'),
  confirmpassword: z.string()
    .nonempty("Password confirmation required")
})
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match.",
    path: ["confirmpassword"]
  })

type signUpData = z.infer<typeof signInSchema>

export default function SignUp() {

  const { showSignUpModal, setShowSignUpModal } = useAuth() as AuthContextType
  const { user } = useAuth()
  const router = useRouter()
  const { setErrors, errors: errorsContext, ErrorModal } = useErrorModal() as ErrorContextType
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<signUpData>({
    resolver: zodResolver(signInSchema)
  })


  useEffect(() => {
    if (user) {
      router.push('/mycategories')
    }
  }, [user, router])


  const handleRegisterUser = async ({ firstname, lastname, email, password, confirmpassword }: signUpData) => {
    setIsLoading(true)

    const { errors, token } = await registerUser({ firstname, lastname, email, password, confirmpassword })
    if (errors) {
      setIsLoading(false)
      setErrors(errors)

      return
    }

    Cookies.set('mindpalID', token, { expires: 30 })

    setIsLoading(false)
    setShowSignUpModal(false)
  }


  return (
    <Modal open={showSignUpModal} setOpen={setShowSignUpModal}>
      <div className="absolute h-full w-full bg-black bg-opacity-60 z-10 transition-opacity">
        <div className='flex items-center justify-center h-full w-full'>
          <div className='relative bg-zinc-900 flex flex-col p-11 rounded-lg max-w-2xl min-w-2xl gap-4 border-zinc-700 border'>
            <h1 className='text-center text-4xl'>Sign Up!</h1>
            <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit(handleRegisterUser)}>
              <div className='flex flex-col text-left gap-1'>
                <label htmlFor='firstname' className='text-sm'>First name:</label>
                <input type="text" id='firstname' className='px-2 py-1 rounded' placeholder='Enter your first name' {...register('firstname')} />
                {errors.firstname && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.firstname.message}</span>}

                <label htmlFor='email' className='text-sm'>Last name:</label>
                <input type="text" id='lastname' className='px-2 py-1 rounded' placeholder='Enter your last name' {...register('lastname')} />
                {errors.lastname && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.lastname.message}</span>}

                <label htmlFor='email' className='text-sm'>E-mail:</label>
                <input type="text" id='email' className='px-2 py-1 rounded' placeholder='Enter your email' {...register('email')} />
                {errors.email && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.email.message}</span>}

                <label htmlFor='password' className='text-sm'>Password:</label>
                <input type="password" id='password' className='px-2 py-1 rounded' placeholder='Enter your password' {...register('password')} />
                {errors.password && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.password.message}</span>}

                <label htmlFor='confirmpassword' className='text-sm'>Confirm password:</label>
                <input type="password" id='confirmpassword' className='px-2 py-1 rounded' placeholder='Confirm your password' {...register('confirmpassword')} />
                {errors.confirmpassword && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.confirmpassword.message}</span>}
              </div>

              <span className={`bg-emerald-600 shadow-md rounded-md hover:bg-emerald-700 px-4 ${isLoading && 'py-2 px-4 cursor-default'}`}>
                {!isLoading ?
                  <input type='submit' className='text-white cursor-pointer py-2 px-4' value="Register" /> :
                  <Loader2 className='animate-spin text-white' />
                }
              </span>
            </form>
            {errorsContext.length > 0 && errorsContext.map(error => (
              <ErrorModal key={error} error={error} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}