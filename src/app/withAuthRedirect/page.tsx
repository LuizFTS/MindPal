import { useAuth } from "@/contexts";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter()

    const { user } = useAuth()

    if (user) {
      if (typeof window === 'undefined') {
        router.replace('/')
        return null
      }
    }
    return <WrappedComponent {...props} />
  }

  return Wrapper;
}

export default withAuthRedirect