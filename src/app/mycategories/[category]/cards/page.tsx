'use client'
// NextJS
import { usePathname, useRouter } from "next/navigation"

// ReactForms and Zod
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Components
import { FlipCard, FlipCardX, Loading, Modal, PreviousPageButton } from "@/components"

// Context
import { useDBContext } from "@/contexts"

// Types
import { DBContextType } from "@/types"
import { useEffect, useState } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { createNewCard } from "@/api"


// Zod Schema to add a new card in DB
const cardFormSchema = z.object({
  question: z.string().nonempty("Invalid word or phrase.").toLowerCase(),
  answer: z.string().nonempty("Invalid answer.").toLowerCase()
})

type NewCardForm = z.infer<typeof cardFormSchema>


const CardsScreen = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [openModalAddCard, setOpenModalAddCard] = useState<boolean>(false)

  const { lists, cards: dbCards, setCards } = useDBContext() as DBContextType
  const router = useRouter()
  const query = usePathname().split('/')

  const qCategory = query[2]

  const { register, reset, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<NewCardForm>({
    resolver: zodResolver(cardFormSchema)
  })

  const list = lists.find(item => item.category === qCategory)
  const card = dbCards.filter(card => card.category === list?._id)



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

  const handleAddCard = async ({ question, answer }: NewCardForm) => {
    setLoading(true)

    const { newCard, errors } = await createNewCard({ question, answer, category: qCategory, difficulty: 'hard' })
    if (!errors) {
      setLoading(false)
      setCards(prevState => {
        return [...prevState, newCard]
      })
      setOpenModalAddCard(false)
      return
    }
    // Display error
  }
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ question: "", answer: "" })
    }
  }, [isSubmitSuccessful, reset])


  useEffect(() => {

    if (!lists) {
      router.push('/pagenotfound')
      return;
    }
  }, [router, lists])

  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <div className='relative flex justify-center items-center w-[500px]'>
          <PreviousPageButton path={`mycategories/${list && list.category}`} />
          <h1 className='capitalize text-4xl font-bold'>{list && list.category}</h1>
        </div>
        <button className="px-4 py-2 rounded bg-emerald-600 border border-zinc-400 shadow hover:bg-emerald-700 w-fit" onClick={() => setOpenModalAddCard(true)}>Add a card</button>
      </div>
      <div className="flex flex-wrap justify-center">
        {card && card.length > 0 ? card.map(card => (
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
      <Modal open={openModalAddCard} close={() => setOpenModalAddCard(false)}>
        <div className="rounded-md bg-zinc-900 border border-zinc-700 p-8">
          <form className="flex flex-col gap-2 items-start" onSubmit={handleSubmit(handleAddCard)}>
            <label htmlFor="question" className="first-letter:capitalize">{list && list.category} word or phrase:</label>
            <input id="question" type="text" className="px-2 rounded w-full" {...register("question")} />
            {errors.question && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.question.message}</span>}

            <label htmlFor="answer">Respective meaning in your native language:</label>
            <input id="answer" type="text" className="px-2 rounded w-full" {...register("answer")} />
            {errors.answer && <span className='flex items-center gap-1 text-xs text-red-300'><AlertCircle width={20} height={20} />{errors.answer.message}</span>}

            <div className="flex w-full justify-center">
              <span className="flex items-center justify-center px-4 py-2 rounded bg-emerald-600 border border-zinc-400 shadow hover:bg-emerald-700 w-[100px] cursor-pointer focus:text-white focus:bg-emerald-700">
                {!loading ? (
                  <input type="submit" className="text-zinc-300" value="Add Card" />
                ) : (
                  <Loader2 className="animate-spin text-white" />
                )}
              </span>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default CardsScreen