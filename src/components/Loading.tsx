import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col flex-grow items-center justify-center w-full h-full'>
      <Loader2 className='animate-spin text-white' />
    </div>
  )
}

export default Loading