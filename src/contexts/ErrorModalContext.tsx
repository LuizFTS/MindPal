'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { DefaultProps } from '../types'
import { createPortal } from "react-dom";

export const ErrorModalContext = createContext({})

const ErrorModal = ({ error }: ErrorModalProps) => {

  return (
    <>
      {createPortal(
        <div className="absolute z-10 bottom-1 left-1 h-20 rounded shadow-lg bg-red-400 text-white p-2 text-center">
          <span>{error}</span>
        </div>
        , document.body
      )}
    </>
  )
}

export const ErrorModalContextProvider = ({ children }: DefaultProps) => {
  const [errors, setErrors] = useState<string[]>([])
  useEffect(() => {

    if (errors.length > 0) {
      setTimeout(() => {
        setErrors([])
      }, 5000);
    }
  }, [errors])

  return (
    <ErrorModalContext.Provider value={{ errors, setErrors, ErrorModal }}>
      {children}
    </ErrorModalContext.Provider>
  )
}

export interface ErrorContextType {
  errors: string[],
  setErrors: React.Dispatch<React.SetStateAction<string[]>>
  ErrorModal: React.FC<ErrorModalProps>
}

interface ErrorModalProps {
  error: string
}

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext)
  if (!context) {
    console.log("Invalid Context")
    return
  }
  return context
}