import { ReactNode } from 'react'

const FlipCardX = ({ front, back, both, active }: { front: ReactNode, back: ReactNode, both?: string, active: boolean }) => {

  if (both === undefined) {
    both = ""
  }

  return (
    /* flex justify-center items-center p-4 h-[116px] w-full sm:w-[200px] rounded border border-dashed border-zinc-600 bg-zinc-800 shadow-xl cursor-pointer hover:bg-zinc-900 */
    <div className='flip-card bg-transparent w-full sm:w-[200px] h-[116px] rounded'>
      <div className={`flip-card-inner relative w-full h-full text-center shadow ${active ? 'flip-card-innerX-true' : ''}`}>
        <div className={`flip-card-front ${both}`}>
          {front}
        </div>
        <div className={`flip-cardX-back ${both}`}>
          {back}
        </div>
      </div>
    </div>
  )
}

export default FlipCardX