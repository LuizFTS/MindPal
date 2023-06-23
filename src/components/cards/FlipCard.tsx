'use client'
import { ReactNode, useRef, useState } from 'react'

const FlipCard = ({ children, front, back, both }: { children?: ReactNode, front: ReactNode, back: ReactNode, both?: string }) => {
  const [active, setActive] = useState(false)

  const handleRotateCard = () => {
    if (active) {
      setActive(false)
      return;
    }
    setActive(true)
  }

  if (both === undefined) {
    both = ""
  }

  return (
    <div className='flip-card bg-transparent w-[400px] h-36 rounded-md m-4' onClick={handleRotateCard}>
      <div className={`flip-card-inner relative w-full h-full text-center shadow ${active ? 'flip-card-inner-true' : ''}`}>
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

export default FlipCard