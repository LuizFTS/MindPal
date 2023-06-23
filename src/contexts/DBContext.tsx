'use client'
import { getCards, getLists } from "@/api";
import { ListCardType } from "@/types";
import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";


export const DBContext = createContext({})

export const DBContextProvider = ({ children }: { children: ReactNode }) => {

  const [lists, setLists] = useState<ListCardType[] | undefined>([])
  const [cards, setCards] = useState<Array<any>>([])
  const { user } = useAuth()

  useEffect(() => {

    getLists()
      .then(response => setLists(response.list))
      .catch(err => console.log(err))

    getCards()
      .then(response => setCards(response.cards))
      .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    console.log(cards)

  }, [cards])

  return (
    <DBContext.Provider value={{ lists, setLists, cards, setCards }}>
      {children}
    </DBContext.Provider>
  )
}

export const useDBContext = () => {
  const context = useContext(DBContext)
  if (!context) {
    console.log("Context error")
    return
  }
  return context
}