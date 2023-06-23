import { ReactNode, Suspense } from "react";
import Loading from "./loading";


export default function RegisterLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex flex-grow items-center justify-center'>
      <div className='bg-zinc-700 flex flex-col p-11 rounded'>
        <h1 className='text-center text-4xl mb-4'>Sign Up!</h1>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </div>
    </main>
  )
} 