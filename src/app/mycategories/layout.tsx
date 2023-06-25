import Loading from './loading'
import { ReactNode, Suspense } from 'react'

interface paramsProps {
  category: string
}

const MyCategoryLayout = ({ children, params }: { children: ReactNode, params: paramsProps }) => {

  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  )
}

export default MyCategoryLayout