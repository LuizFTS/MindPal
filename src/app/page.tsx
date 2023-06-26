'use client'
import { CardSection, Hero, SignIn, SignUp } from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { authState } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (authState.user) {
      router.push('/mycategories')
    }

  }, [authState, router])

  return (
    <>
      {!authState.user && (
        <>
          <SignIn />
          <SignUp />
          {!authState.user ? (
            <div className="flex flex-grow justify-between mt-4">
              <Hero />
              <CardSection />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <Loader2 size={48} className='animate-spin' />
              <p>Loading...</p>
            </div>
          )}
        </>
      )}
    </>

  )
}
