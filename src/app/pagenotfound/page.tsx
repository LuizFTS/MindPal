import { DefaultBtn } from '@/components';
import Link from 'next/link';
import React from 'react'


const NotFound = () => {
  return (
    <>
      <div className='flex flex-col h-max items-center justify-center text-center text-4xl'>
        <h1>I&apos;m sorry, the page was not found! <br /> Let&apos;s go back to the start!</h1>
        <Link href='/'>
          <DefaultBtn className='mt-5'>Go back!</DefaultBtn>
        </Link>
      </div>
    </>
  )
}

export default NotFound;