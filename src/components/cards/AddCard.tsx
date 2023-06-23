import { ReactNode } from 'react'

const AddCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex justify-center items-center p-4 h-[116px] w-full sm:w-[200px] rounded border border-dashed border-zinc-600 bg-zinc-800 shadow-xl cursor-pointer hover:bg-zinc-900'>
      {children}
    </div>
  )
}

export default AddCard