import Loading from '@/app/loading'
import { ReactNode, Suspense } from 'react'

interface paramsProps {
  category: string
}

const MyCategoryLayout = ({ children, params }: { children: ReactNode, params: paramsProps }) => {

  return (
    <Suspense fallback={<Loading />}>
      <div className='flex flex-col 10 items-center space-y-4'>
        {children}
      </div>
    </Suspense>
  )
}

export default MyCategoryLayout