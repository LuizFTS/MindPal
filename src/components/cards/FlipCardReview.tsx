'use client'
import { ReactNode, useRef, useState } from 'react'

const FlipCardReview = ({ children, front, back, both, turn }: { children?: ReactNode, front: ReactNode, back: ReactNode, both?: string, turn: boolean }) => {
  const [active, setActive] = useState<boolean>(false)

  const handleRotateCard = () => {
    if (turn) {
      setActive(false)
      return;
    }
    setActive(true)
  }

  if (both === undefined) {
    both = ""
  }

  return (
    <div className='flip-card bg-transparent w-[400px] h-36 rounded-md m-4'>
      <div className={`flip-card-inner relative w-full h-full text-center shadow ${turn ? 'flip-card-inner-true' : ''}`}>
        <div className={`flip-card-front ${both}`}>
          {front}
        </div>
        <div className={`flip-card-back ${both}`}>
          {back}
        </div>
      </div>
    </div>
  )
}

export default FlipCardReview