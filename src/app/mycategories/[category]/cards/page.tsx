'use client'
// NextJS
import { usePathname, useRouter } from "next/navigation"

// Components
import { FlipCard, PreviousPageButton } from "@/components"

// Context
import { useDBContext } from "@/contexts"

// Types
import { DBContextType } from "@/types"

export const getServerSideProps = async () => {
  return {
    props: {
      page: "cards"
    }
  }
}

const CardsScreen = () => {
  const { lists, cards: dbCards, setCards } = useDBContext() as DBContextType
  const router = useRouter()
  const query = usePathname().split('/')

  console.log(query)
  const qCategory = query[2]

  const list = lists.find(item => item.category === qCategory)
  const card = dbCards.filter(card => card.category === list?._id)

  if (!list) {
    router.push('/pagenotfound')
    return;
  }

  const statusColor = (e: string) => {
    if (e === 'veryeasy') {
      return 'bg-veryeasy'
    } else if (e === 'easy') {
      return 'bg-easy'
    } else if (e === 'medium') {
      return 'bg-medium'
    }
    return 'bg-hard'
  }

  return (
    <>
      <div className='flex'>
        <div className='relative flex justify-center items-center w-[500px]'>
          <PreviousPageButton path={`mycategories/${list.category}`} />
          <h1 className='capitalize text-4xl font-bold'>{list.category}</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {card.length > 0 ? card.map(card => (
          <FlipCard
            key={card._id}
            front={
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="first-letter:uppercase">{card.question}</p>
                <div className={`absolute w-3 h-3 rounded-full bottom-1 right-1 ${statusColor(card.difficulty)}`} />
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="first-letter:uppercase">{card.answer}</p>
                <div className={`absolute w-3 h-3 rounded-full bottom-1 left-1 ${statusColor(card.difficulty)}`} />
              </div>
            }
            both="bg-zinc-700 p-4 border border-zinc-600 rounded-md cursor-pointer"
          />
        )) : '0 cards in this list'}
      </div>
    </>
  )
}

export default CardsScreen