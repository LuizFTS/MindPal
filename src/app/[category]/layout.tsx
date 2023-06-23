import { data } from '@/utils/db'
import { ReactNode } from 'react'

interface paramsProps {
  category: string
}

const CategoryLayout = ({ children, params }: { children: ReactNode, params: paramsProps }) => {

  const category = data.category.find(item => item.name === params.category)
  if (!category) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <div className='flex flex-col 10 items-center space-y-4'>
      {children}
    </div>
  )
}

export default CategoryLayout