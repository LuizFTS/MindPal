'use client'
// NextJS
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'

// ReactJS
import { useState } from 'react';

// Components
import { Loading, PreviousPageButton, QuantityCard, FlipCardX } from '@/components';

// Contexts
import { useDBContext, useReviewContext } from '@/contexts';

// Types
import { CardType, DBContextType, ReviewContextType } from '@/types';

interface quantityArray {
  difficult: Array<number> | Array<null>;
}

const MyCategoryScreen = () => {
  const query = usePathname().split('/')[2].toLocaleLowerCase();

  const router = useRouter();

  const { lists, cards } = useDBContext() as DBContextType
  const { setCategory, setCards } = useReviewContext() as ReviewContextType

  const list = lists.find(item => item.category === query)
  //const cards = cardsData.cards.filter(card => card.categoryId === category?.id)
  const [filteredCards, setFilteredCards] = useState<CardType[] | null>(
    cards.filter(item => item.category === list?._id)
  )
  const [quantity, setQuantity] = useState([
    filteredCards && filteredCards.filter(card => card.difficulty === 'veryeasy').length,
    filteredCards && filteredCards.filter(card => card.difficulty === 'easy').length,
    filteredCards && filteredCards.filter(card => card.difficulty === 'medium').length,
    filteredCards && filteredCards.filter(card => card.difficulty === 'hard').length,
  ])

  const [reviewCards, setReviewCards] = useState(filteredCards && filteredCards.map(item => {
    if (item.reviewAt) {
      const today = new Date().getTime()
      const data = Date.parse(item.reviewAt)
      return { card: item._id, review: data < today || data === today }
    }
  }))

  const handleStartReview = () => {
    if (list !== undefined && 'category' in list) {
      setCategory({ name: list.category, id: list._id })
      setCards(filteredCards)

      router.push('/review')
    }
  }

  return (
    <>
      <div className='flex'>
        <div className='relative flex justify-center items-center w-[500px]'>
          <PreviousPageButton path="mycategories" />

          <h1 className='capitalize text-4xl font-bold'>{list?.category}</h1>
        </div>
      </div>

      <Link href={`${list?.category}/cards`}>
        <QuantityCard title={filteredCards && filteredCards.length} className='border-b-4 border-cyan-600 hover:bg-zinc-600'>Total cards</QuantityCard>
      </Link>
      <h2>Cards Status:</h2>
      <div className='flex'>

        <QuantityCard title={quantity[0]} status='veryeasy' className='hover:bg-zinc-600 transition-colors'>Very Easy</QuantityCard>
        <QuantityCard title={quantity[1]} status='easy' className='hover:bg-zinc-600 transition-colors'>Easy</QuantityCard>
        <QuantityCard title={quantity[2]} status='medium' className='hover:bg-zinc-600 transition-colors'>Medium</QuantityCard>
        <QuantityCard title={quantity[3]} status='hard' className='hover:bg-zinc-600 transition-colors'>Hard</QuantityCard>
      </div>
      <QuantityCard className={'relative text-center w-fit transition border-b-4 border-white text-2xl hover:border-cyan-600 hover:bg-zinc-900'} onClick={() => handleStartReview()}>
        <div className={`absolute -bottom-3 -right-3 rounded-full h-6 w-6 bg-red-700 ${reviewCards && reviewCards.filter(card => card?.review === true).length > 0 ? 'bg-red-700' : 'bg-blue-800'}`}>
          <span className='flex w-full h-full items-center justify-center text-xs font-bold'>
            {reviewCards && reviewCards.filter(card => card?.review === true).length}
          </span>
        </div>
        Start Review
      </QuantityCard>
    </>
  )
}

export default MyCategoryScreen