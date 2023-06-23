'use client'
import { useDBContext, useReviewContext } from '@/contexts'
import { DBContextType, ReviewContextType } from '@/types'
import React from 'react'

const ReviewPage = () => {

  const { category } = useReviewContext() as ReviewContextType

  return (
    <div>
      <h1>{category}</h1>
    </div>
  )
}

export default ReviewPage