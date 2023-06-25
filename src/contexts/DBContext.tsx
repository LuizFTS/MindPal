'use client'
// React
import { createContext, ReactNode, useState, useEffect, useContext } from "react";

// Back-end API functions
import { getCards, getLists } from "@/api";

// Types
import { ListCardType } from "@/types";


// Context creation
export const DBContext = createContext({})

// Context Provider
export const DBContextProvider = ({ children }: { children: ReactNode }) => {

  const [lists, setLists] = useState<ListCardType[] | undefined>([])
  const [cards, setCards] = useState<Array<any>>([])


  // When user enter the webpage, the list and cards states will be set according to DB
  useEffect(() => {
    getLists()
      .then(response => setLists(response.list))
      .catch(err => console.log(err))

    getCards()
      .then(response => setCards(response.cards))
      .catch(err => console.log(err))

  }, [])


  // When function is calledm it will update the list and card states according to DB
  const refreshData = () => {
    getLists()
      .then(response => setLists(response.list))
      .catch(err => console.log(err))

    getCards()
      .then(response => setCards(response.cards))
      .catch(err => console.log(err))
  }

  return (
    <DBContext.Provider value={{ lists, setLists, cards, setCards, refreshData }}>
      {children}
    </DBContext.Provider>
  )
}

// Custom hook to use the DB context
export const useDBContext = () => {
  const context = useContext(DBContext)
  if (!context) {
    console.log("Context error")
    return
  }
  return context
}