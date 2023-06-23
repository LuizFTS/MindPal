'use client'
import { ReactNode, createContext, useState, useContext } from "react";

interface FlipCardContextType {
  isActive: boolean,
  setIsActive: any,
}


export const FlipCardContext = createContext({} as FlipCardContextType)

export const FlipCardContextProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <FlipCardContext.Provider value={{ isActive, setIsActive }}>
      {children}
    </FlipCardContext.Provider>
  )
}

export const useFlipCard = () => {
  const context = useContext(FlipCardContext)
  if (!context) {
    console.log('ContextError')
    return
  }
  return context
}