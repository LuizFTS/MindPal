import { Loader2 } from "lucide-react";

export default function Loading() {

  return (
    <div className='flex flex-col flex-grow items-center justify-center'>
      <Loader2 className='animate-spin text-white' />
      <p>Loading sign in form...</p>
    </div>
  )
}