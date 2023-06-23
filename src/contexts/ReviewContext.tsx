'use client'
import { createContext, useContext, ReactNode, useState } from 'react'

export const ReviewContext = createContext({})

export const ReviewContextProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<string | null>(null)

  return (
    <ReviewContext.Provider value={{ category, setCategory }}>
      {children}
    </ReviewContext.Provider>
  )
}

export const useReviewContext = () => {
  const context = useContext(ReviewContext)
  if (!context) {
    console.log("Invalid context")
    return
  }
  return context
}