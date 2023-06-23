'use client'
import { PreviousPageButton, QuantityCard } from '@/components';
import { cards as cardsData, data } from '@/utils/db';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

interface quantityArray {
  difficult: Array<number> | Array<null>;
}

const CategoryScreen = () => {
  const query = usePathname().split('/')[1].toLocaleLowerCase();
  const router = useRouter();

  const [quantity, setQuantity] = useState<quantityArray>({ difficult: [null] })
  const category = data.category.find(item => item.name === query)
  const cards = cardsData.cards.filter(card => card.categoryId === category?.id)


  useEffect(() => {
    if (!category) {
      router.push('/pagenotfound')
      return;

    }
    setQuantity({
      difficult: [
        cardsData.cards.filter(item => item.categoryId === category.id && item.status === "veryeasy").length,
        cardsData.cards.filter(item => item.categoryId === category.id && item.status === "easy").length,
        cardsData.cards.filter(item => item.categoryId === category.id && item.status === "medium").length,
        cardsData.cards.filter(item => item.categoryId === category.id && item.status === "hard").length
      ]
    }
    )
  }, [category, router])

  if (!category || quantity.difficult[0] === null) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <Loader2 size={48} className='animate-spin' />
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <div className='flex'>
        <div className='relative flex justify-center items-center w-[500px]'>
          <PreviousPageButton path="" />

          <h1 className='capitalize text-4xl font-bold'>{category.name}</h1>
        </div>
      </div>

      <Link href={`/${category.name}/cards`}>
        <QuantityCard title={cards.length} className='border-b-4 border-cyan-600 hover:bg-zinc-600'>Total cards</QuantityCard>
      </Link>
      <h2>Cards Status:</h2>
      <div className='flex'>

        <QuantityCard title={quantity.difficult[0]} status='veryeasy' className='hover:bg-zinc-600 transition-colors'>Very Easy</QuantityCard>
        <QuantityCard title={quantity.difficult[1]} status='easy' className='hover:bg-zinc-600 transition-colors'>Easy</QuantityCard>
        <QuantityCard title={quantity.difficult[2]} status='medium' className='hover:bg-zinc-600 transition-colors'>Medium</QuantityCard>
        <QuantityCard title={quantity.difficult[3]} status='hard' className='hover:bg-zinc-600 transition-colors'>Hard</QuantityCard>
      </div>
      <QuantityCard className={'text-center w-fit transition border-b-4 border-white text-2xl hover:border-cyan-600 hover:bg-zinc-900'}>Start Review</QuantityCard>
    </>
  )
}

export default CategoryScreen