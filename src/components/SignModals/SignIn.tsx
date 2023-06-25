'use client'
import { useAuth, useErrorModal } from '@/contexts'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Modal from '../Modal'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorContextType } from '@/contexts/ErrorModalContext'

import { AuthActionsKind, AuthContextType } from '@/types'


const signInSchema = z.object({
  email: z.string()
    .nonempty("E-mail required.")
    .email('Invalid e-mail.')
    .toLowerCase(),
  password: z.string()
    .min(6, 'Password requires at least 6 characters.')
})

type signInData = z.infer<typeof signInSchema>


export default function SignIn() {
  const { signIn, authState, dispatch } = useAuth() as AuthContextType
  const router = useRouter()
  const { setErrors, errors: errorsContext, ErrorModal } = useErrorModal() as ErrorContextType
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<signInData>({
    resolver: zodResolver(signInSchema)
  })


  const handleSubmitLogin = async ({ email, password }: signInData) => {
    setIsLoading(true)

    const { errors } = await signIn({ email, password })
    if (!errors) {
      router.push('/mycategories')
      setIsLoading(false)
      dispatch({ type: AuthActionsKind.HIDESIGNINMODAL })
      return
    }
    setErrors(errors)
    setIsLoading(false)
  }

  return (
    <Modal open={authState.signInModal} close={() => dispatch({ type: AuthActionsKind.HIDESIGNINMODAL })}>
      <div className="absolute h-full w-full bg-black bg-opacity-60 z-10 transition-opacity">
        <div className='flex items-center justify-center h-full w-full'>
          <div className='relative bg-zinc-900 flex flex-col p-11 rounded-lg max-w-2xl min-w-2xl gap-4 border-zinc-700 border'>
            <h1 className='text-center text-4xl'>Sign In</h1>
            <form className='flex flex-col items-center gap-3' onSubmit={handleSubmit(handleSubmitLogin)}>
              <div className='flex flex-col text-left gap-1'>
                <label htmlFor='email' className='text-sm'>E-mail:</label>
                <input type="text" id='email' className='px-2 py-1 rounded' placeholder='Enter your email' {...register('email')} />
                {errors.email && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.email.message}</span>}

                <label htmlFor='password' className='text-sm'>Password:</label>
                <input type="password" id='password' className='px-2 py-1 rounded' placeholder='Enter your password' {...register('password')} />
                {errors.password && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.password.message}</span>}
              </div>

              <span className={`bg-emerald-600 shadow-md rounded-md hover:bg-emerald-700 px-4 ${isLoading && 'py-2 px-4 cursor-default'}`}>
                {!isLoading ?
                  <input type='submit' className='text-white cursor-pointer py-2 px-4' value="Enter" /> :
                  <Loader2 className='animate-spin text-white' />
                }
              </span>
            </form>
            {errorsContext.length > 0 && errorsContext.map(error => (
              <ErrorModal key={error} error={error} />
            ))}
            <div className='flex'>
              <p className='text-sm'>Don&apos;t have an account? &nbsp;</p>
              <span className='text-sm underline cursor-pointer hover:text-zinc-400' onClick={() => dispatch({ type: AuthActionsKind.CHANGEMODAL })}>Register</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

