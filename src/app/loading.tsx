import { Loader2 } from "lucide-react";


export default function Loading() {

  return (
    <main className='flex flex-col flex-grow items-center justify-center'>
      <Loader2 className='animate-spin text-white' />
      <p>Loading home...</p>
    </main>
  )
}