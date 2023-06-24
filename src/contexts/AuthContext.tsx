'use client'
import { recoverSession, signInAPI } from "@/api";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


export interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null,
  setUser: any,
  signIn: any,
  showSignInModal: boolean,
  setShowSignInModal: React.Dispatch<React.SetStateAction<boolean>>,
  showSignUpModal: boolean,
  setShowSignUpModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface SignInData {
  email: string,
  password: string
}

interface SignInResponse {
  token: string,
  _id: string
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null)
  // Transform in one single object state
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const token = Cookies.get('mindpalID')

    if (typeof token === undefined || token === "undefined") {
      Cookies.remove('mindpalID')
      return
    }

    if (!token) {
      return;
    }

    const recover = recoverSession({ token }).then(response => setUser(response.user))


  }, [])

  const signIn = async ({ email, password }: SignInData) => {

    const { _id, token, errors } = await signInAPI({ email, password })
    if (_id !== undefined && token !== undefined) {

      Cookies.set('mindpalID', token, { expires: 30 })
      setUser(_id)

      router.push('/login')
      return { _id, token }
    }

    return { errors }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, setUser, showSignInModal, setShowSignInModal, showSignUpModal, setShowSignUpModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    console.log("Invalid context")
  }
  return context
}