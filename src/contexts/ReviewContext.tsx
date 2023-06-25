'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { useDBContext } from './DBContext'
import { DBContextType } from '@/types'
import { CardType, ReviewContextCategoryObject } from '@/types/api'

export const ReviewContext = createContext({})

export const ReviewContextProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<ReviewContextCategoryObject | null>(null)
  const [cards, setCards] = useState<CardType[]>([])

  const { cards: dbCards } = useDBContext() as DBContextType

  useEffect(() => {
    if (dbCards && dbCards.length > 0) {

      const filteredCards = dbCards.filter(item => item.category === category?.id)
      setCards(filteredCards)
    }

  }, [dbCards, category])

  useEffect(() => {

    console.log(cards)
  }, [cards])

  return (
    <ReviewContext.Provider value={{ category, setCategory, cards, setCards }}>
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