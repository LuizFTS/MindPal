'use client'
import { useState } from 'react'
import Card from './cards/Card';
import { cards, data } from '@/utils/db'
import FlipCardX from './cards/FlipCardX';


const CardSection = () => {
  const [flipCardActive, setFlipCardActive] = useState(false)
  const categories = data.category
  const cardsItems = cards.cards
  const checkCard = cardsItems.filter(card => {
    if (card.status === "hard") {
      return card
    }
    return
  }).map(item => {
    return { category: item.categoryId, status: item.status }
  })


  return (
    <section className="flex flex-wrap content-start justify-end gap-4">
      <FlipCardX
        front={
          <div className='flex flex-col items-center justify-center w-full h-full rounded hover:bg-zinc-900' onClick={() => setFlipCardActive(true)}>
            <p>Add a card</p>
          </div>
        }
        back={
          <div className='flex w-full h-full rounded '>
            <form className='flex flex-col items-center justify-center space-y-2' onSubmit={() => setFlipCardActive(false)}>
              <p>What&apos;s the name?</p>
              <input type="text" className='w-2/3 px-1 rounded' autoFocus />
              <input type="submit" value="Add" className='rounded bg-zinc-300 px-4 py-1 cursor-pointer hover:bg-zinc-400' />
            </form>
          </div>
        }
        both="border border-dashed border-zinc-600 bg-zinc-800 shadow-xl cursor-pointer w-full h-full rounded"
        active={flipCardActive}
      />

      {categories.map(category => (
        <Card
          title={category.name}
          cards={cardsItems.filter(card => card.categoryId === category.id).length}
          status={checkCard.map(card => {
            if (card.category === category.id) {
              return false;
            }
            return true;
          })[0]}
          key={category.id}
          path={category.name}
        />
      ))}
    </section>
  )
}

export default CardSection