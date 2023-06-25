'use client'
import { updateReviewDate } from '@/api'
import { FlipCardReview } from '@/components'
import { useDBContext, useReviewContext } from '@/contexts'
import { DBContextType, ReviewContextType } from '@/types'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface cardIndexType {
  init: number,
  current: number,
  last: number | null
}

const ReviewPage = () => {
  const router = useRouter()
  const [back, setBack] = useState(false)
  const [finished, setFinished] = useState(false)
  const [cardIndex, setCardIndex] = useState<cardIndexType>({ init: 0, current: 0, last: null })
  const { category, cards } = useReviewContext() as ReviewContextType
  const { refreshData } = useDBContext() as DBContextType

  useEffect(() => {
    setFinished(false)
    setCardIndex({ init: 0, current: 0, last: cards.length - 1 })
  }, [cards])
  useEffect(() => {
    console.log(cardIndex)

  }, [cardIndex])



  const handleAnswer = (difficulty: number) => {

    const veryeasydate = new Date()
    veryeasydate.setDate(veryeasydate.getDate() + 5)
    const veryeasyReviewTime = veryeasydate.toISOString()

    const easydate = new Date()
    easydate.setTime(easydate.getTime() + (5 * 60 * 1000))
    const easyReviewTime = easydate.toISOString()

    const mediumdate = new Date()
    mediumdate.setTime(mediumdate.getTime() + (10 * 60 * 1000))
    const mediumReviewTime = mediumdate.toISOString()

    const harddate = new Date()
    harddate.setTime(harddate.getTime() + (20 * 60 * 1000))
    const hardReviewTime = harddate.toISOString()

    switch (difficulty) {
      case 1:
        cards[cardIndex.current].reviewAt = veryeasyReviewTime
        cards[cardIndex.current].difficulty = 'veryeasy'
        updateReviewDate(cards[cardIndex.current])
        break;
      case 2:
        cards[cardIndex.current].reviewAt = easyReviewTime
        cards[cardIndex.current].difficulty = 'easy'
        updateReviewDate(cards[cardIndex.current])
        break;
      case 3:
        cards[cardIndex.current].reviewAt = mediumReviewTime
        cards[cardIndex.current].difficulty = 'medium'
        updateReviewDate(cards[cardIndex.current])
        break;
      case 4:
        cards[cardIndex.current].reviewAt = hardReviewTime
        cards[cardIndex.current].difficulty = 'hard'
        console.log(cards[cardIndex.current])
        updateReviewDate(cards[cardIndex.current])
        break;

      default:
        break;
    }
    setBack(false)

    if (cardIndex.current === cardIndex.last) {
      refreshData()
      setFinished(true)
      return
    }
    setTimeout(() => {

      setCardIndex(prevState => {
        return { ...prevState, current: prevState.current + 1 }
      })
    }, 1000);
  }

  useEffect(() => {
    if (!cards || cards.length === 0) {
      router.push('/mycategories')
    }

  }, [router, cards])

  return (
    <div className='flex flex-col flex-grow gap-4 items-center justify-center bg-zinc-900 rounded-md text-white w-full'>
      {!finished ? (
        <>

          <h1 className='capitalize text-sm'>{category?.name}</h1>

          <div>
            <FlipCardReview
              front={
                <div className='bg-zinc-800 w-full h-full p-4 flex flex-col items-center'>
                  <div className='flex flex-1 items-center justify-center'>
                    <p className='first-letter:capitalize text-2xl'>
                      {cards && cards.length > 0 && cards[cardIndex.current].question}
                    </p>
                  </div>
                  <button onClick={() => setBack(true)} className='w-fit px-4 py-1 bg-emerald-600 rounded shadow border border-zinc-500 hover:bg-emerald-700 flex gap-1 items-center justify-center'>
                    Rotate
                    <ArrowRight />
                  </button>
                </div>
              }
              back={
                <div className='bg-zinc-800 w-full h-full p-4 flex flex-col items-center'>
                  <div className='flex flex-1 items-center justify-center'>
                    <p className='first-letter:capitalize text-2xl'>
                      {cards && cards.length > 0 && cards[cardIndex.current].answer}
                    </p>
                  </div>
                  <button onClick={() => setBack(false)} className='w-fit px-4 py-1 bg-emerald-600 rounded shadow border border-zinc-500 hover:bg-emerald-700 flex gap-1 items-center justify-center'>
                    Rotate
                    <ArrowLeft />
                  </button>
                </div>
              }
              turn={back}
            />
          </div>
          <div>
            <ul className='flex gap-2 text-center'>
              <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-veryeasy' onClick={() => handleAnswer(1)}>Very easy</li>
              <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-easy' onClick={() => handleAnswer(2)}>Easy</li>
              <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-medium' onClick={() => handleAnswer(3)}>Medium</li>
              <li className='p-2 border-b-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-sm w-40 border-hard' onClick={() => handleAnswer(4)}>Hard</li>
            </ul>
          </div>
        </>
      ) : (
        <h1>Acaboooou!!!</h1>
      )}

    </div>
  )
}

export default ReviewPage