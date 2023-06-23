import React from 'react'
import { martelSans } from '@/app/layout'

const Hero = () => {

  return (
    <section className={`${martelSans.className} flex flex-col w-1/2 space-y-3`}>
      <h1 className='text-7xl'>
        Unlock Your Potential with MindPal: <br />
      </h1>
      <h2 className='text-2xl'>
        The Ultimate Flashcard App for Effortless Learning.
      </h2>
    </section>
  )
}

export default Hero