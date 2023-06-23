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
import { DBContextType, ReviewContextType } from '@/types';

interface quantityArray {
  difficult: Array<number> | Array<null>;
}

const MyCategoryScreen = () => {
  const query = usePathname().split('/')[2].toLocaleLowerCase();
  const [loadingList, setLoadingList] = useState<boolean>(false)
  const [flipCardActive, setFlipCardActive] = useState<boolean>(false)
  const [newCard, setNewCard] = useState<string>('')

  const router = useRouter();

  const { lists, cards } = useDBContext() as DBContextType
  const { setCategory } = useReviewContext() as ReviewContextType

  const list = lists.find(item => item.category === query)
  //const cards = cardsData.cards.filter(card => card.categoryId === category?.id)
  const [filteredCards, setFilteredCards] = useState(
    cards.filter(item => item.category === list?._id)
  )
  const [quantity, setQuantity] = useState([
    filteredCards.filter(card => card.difficulty === 'veryeasy').length,
    filteredCards.filter(card => card.difficulty === 'easy').length,
    filteredCards.filter(card => card.difficulty === 'medium').length,
    filteredCards.filter(card => card.difficulty === 'hard').length,
  ])




  const addCard = (e: React.FormEvent) => {
    e.preventDefault()

    setFlipCardActive(false)
  }

  const handleStartReview = () => {
    if (list !== undefined && 'category' in list) {
      setCategory(list.category)

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
        <QuantityCard title={filteredCards.length} className='border-b-4 border-cyan-600 hover:bg-zinc-600'>Total cards</QuantityCard>
      </Link>
      <h2>Cards Status:</h2>
      <div className='flex'>

        <QuantityCard title={quantity[0]} status='veryeasy' className='hover:bg-zinc-600 transition-colors'>Very Easy</QuantityCard>
        <QuantityCard title={quantity[1]} status='easy' className='hover:bg-zinc-600 transition-colors'>Easy</QuantityCard>
        <QuantityCard title={quantity[2]} status='medium' className='hover:bg-zinc-600 transition-colors'>Medium</QuantityCard>
        <QuantityCard title={quantity[3]} status='hard' className='hover:bg-zinc-600 transition-colors'>Hard</QuantityCard>
      </div>
      <QuantityCard className={'text-center w-fit transition border-b-4 border-white text-2xl hover:border-cyan-600 hover:bg-zinc-900'} onClick={() => handleStartReview()}>Start Review</QuantityCard>
      <div className='flex justify-start gap-4 w-full bg-zinc-900 rounded p-4'>


        <FlipCardX
          front={
            <div className='flex flex-col items-center justify-center w-full h-full rounded hover:bg-zinc-900' onClick={() => setFlipCardActive(true)}>
              <p>Add a card</p>
            </div>
          }
          back={
            <div className='flex w-full h-full rounded'>
              {!loadingList ? (

                <form className='flex flex-col items-center justify-center space-y-2' onSubmit={(e) => addCard(e)}>
                  <p>What&apos;s the name?</p>
                  <input type="text" className='w-2/3 px-1 rounded' autoFocus value={newCard} onChange={(e) => setNewCard(e.target.value)} placeholder='"Learn Klingon..."' />
                  <input type="submit" value="Add" className='rounded bg-zinc-300 px-4 py-1 cursor-pointer hover:bg-zinc-400' />
                </form>
              ) : (
                <Loading />
              )}
            </div>
          }
          both="border border-dashed border-zinc-600 bg-zinc-800 shadow-xl cursor-pointer w-full h-full rounded"
          active={flipCardActive}
        />
      </div>
    </>
  )
}

export default MyCategoryScreen