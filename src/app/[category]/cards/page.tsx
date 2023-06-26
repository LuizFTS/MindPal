'use client'
import { FlipCard, PreviousPageButton } from "@/components"
import { cards as cardsData, data } from "@/utils/db"
import { usePathname, useRouter } from "next/navigation"

const CardsScreen = () => {
  const router = useRouter()

  const query = usePathname().split('/')
  const qCategory = query[1]

  const category = data.category.find(item => item.name === qCategory)
  const cards = cardsData.cards.filter(card => card.categoryId === category?.id)

  if (!category) {
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
          <PreviousPageButton path={`${category.name}`} />
          <h1 className='capitalize text-4xl font-bold'>{category.name}</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {cards.map(card => (
          <FlipCard
            key={card.cardId}
            front={
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="first-letter:uppercase">{card.question}</p>
                <div className={`absolute w-3 h-3 rounded-full bottom-1 right-1 ${statusColor(card.status)}`} />
              </div>
            }
            back={
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="first-letter:uppercase">{card.answer}</p>
                <div className={`absolute w-3 h-3 rounded-full bottom-1 left-1 ${statusColor(card.status)}`} />
              </div>
            }
            both="bg-zinc-700 p-4 border border-zinc-600 rounded-md cursor-pointer"
          />
        ))}
      </div>
    </>
  )
}

export default CardsScreen