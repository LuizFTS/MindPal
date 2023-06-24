'use client'
import { FlipCardReview } from '@/components'
import { useReviewContext } from '@/contexts'
import { ReviewContextType } from '@/types'
import { useState } from 'react'

const ReviewPage = () => {
  const [back, setBack] = useState(false)

  const { category } = useReviewContext() as ReviewContextType

  return (
    <div className='flex flex-col flex-grow gap-4 items-center justify-center bg-zinc-900 rounded-md text-white w-full'>
      <h1 className='capitalize'>{category}</h1>
      {/* <div className='bg-zinc-600 w-[900px] h-[250px]'>

      </div> */}
      <div>
        <FlipCardReview
          front={
            <div className='bg-zinc-800 w-full h-full'>
              <h2>Frente</h2>
              <button onClick={() => setBack(true)}>Virar</button>
            </div>
          }
          back={
            <div className='bg-zinc-800 w-full h-full'>
              <h2>Trás</h2>
              <button onClick={() => setBack(false)}>Virar</button>
            </div>
          }
          turn={back}
        />
      </div>
      <div>
        <ul className='flex gap-2 text-center'>
          <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-veryeasy'>Very easy</li>
          <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-easy'>Easy</li>
          <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-medium'>Medium</li>
          <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-hard'>Hard</li>
        </ul>
      </div>

    </div>
  )
}

export default ReviewPage