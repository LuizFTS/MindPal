'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ButtonProps {
  path: string,
  path2?: string,
  path3?: string,
  path4?: string,
  path5?: string,
  path6?: string,
}

const PreviousPageButton = ({ path, path2, path3, path4, path5, path6 }: ButtonProps) => {
  const router = useRouter()

  const handlePreviousPage = (path: string, path2?: string, path3?: string, path4?: string, path5?: string, path6?: string) => {
    if (!path2) {
      router.push(`/${path}`)
      return;
    }
    router.push(`/${path}/${path2}`)
  }

  return (
    <div className='absolute left-12 p-1 rounded-full bg-zinc-600 cursor-pointer hover:bg-slate-500'>
      <ArrowLeft size={28} className='hover:text-cyan-500 transition' onClick={() => handlePreviousPage(path, path2, path3, path4, path5, path6)} />
    </div>
  )
}

export default PreviousPageButton