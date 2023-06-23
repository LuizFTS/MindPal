import { ReactNode, Suspense } from "react";
import Link from "next/link";
import Loading from "./loading";


export default function LoginLayout({ children }: { children: ReactNode }) {

  return (
    <div className='flex flex-grow items-center justify-center'>
      <div className='bg-zinc-700 flex flex-col p-11 rounded'>
        <h1 className='text-center text-4xl mb-4'>Sign In</h1>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <div className='flex'>
          <p className='text-sm'>Don&apos;t have an account? &nbsp;</p>
          <Link href="/register" className='text-sm underline'>Register</Link>
        </div>
      </div>
    </div>
  )
}