'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CardProps {
  title: string,
  cards: number,
  status: boolean | number,
  path?: string
}

const Card = ({ title, cards, status, path }: CardProps) => {
  const [loading, setLoading] = useState(false)


  const statusColor = () => {

    if (status === 0) {
      return "transparent"
    } else if (status) {
      return "bg-emerald-400"
    } else {
      return "bg-red-700"
    }

  }


  return (
    <Link href={`/${path}`}>
      <div className='cardContainer relative rounded bg-zinc-700 shadow-xl w-full flex h-fit sm:w-[200px] transition cursor-pointer hover:bg-zinc-600' >
        {loading ? (<p>Carregando</p>) : null}
        <div className="p-4">
          <h1 className='text-3xl capitalize'>{title}</h1>
          <span className='flex items-center mt-4'>
            <p>Cards: &nbsp;</p>
            <p className='text-2xl'>{cards}</p>

          </span>
        </div>
        <div className={`absolute -right-1 h-4 w-4 -top-1 rounded-full transition statusIcon ${statusColor()}`} />
      </div>
    </Link>
  )
}

export default Card