'use client'
import { useRouter } from "next/navigation"
import { BaseSyntheticEvent, useState } from "react"

interface CardProps {
  title: string,
  cards: number,
  status: boolean,
  path?: string
}

const Card = ({ title, cards, status, path }: CardProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = (e: BaseSyntheticEvent) => {
    setLoading(true)
    e.preventDefault()


    router.push(`/${path}`)
    setLoading(false)
  }

  return (
    <div className='cardContainer relative rounded bg-zinc-700 shadow-xl w-full flex h-fit sm:w-[200px] transition cursor-pointer hover:bg-zinc-600' onClick={e => handleClick(e)}>
      {loading ? (<p>Carregando</p>) : null}
      <div className="p-4">
        <h1 className='text-3xl capitalize'>{title}</h1>
        <span className='flex items-center mt-4'>
          <p>Cards: &nbsp;</p>
          <p className='text-2xl'>{cards}</p>

        </span>
      </div>
      <div className={`absolute -right-1 h-4 w-4 -top-1 rounded-full transition statusIcon ${status ? "bg-emerald-400" : "bg-red-700"}`} />
    </div>
  )
}

export default Card