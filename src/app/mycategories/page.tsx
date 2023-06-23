'use client'
// NextJS
import { useRouter } from 'next/navigation'

// ReactJS
import { useEffect, useState } from 'react'

// Components
import { Card, Loading, FlipCardX } from '@/components'

// Context
import { useAuth, useDBContext, useReviewContext } from '@/contexts'

// BackEnd API
import { createNewCategory } from '@/api'

// Types
import { DBContextType, ListCardType, ReviewContextType } from '@/types'


const MyCategoryPage = () => {

  // useStates
  const [flipCardActive, setFlipCardActive] = useState<boolean>(false)
  const [newCategory, setNewCategory] = useState<string>('')
  const [loadingList, setLoadingList] = useState<boolean>(false)

  // useContext
  const { lists, setLists, cards } = useDBContext() as DBContextType
  const { user } = useAuth()

  // RouterContex
  const router = useRouter()

  // Functions
  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newCategory || newCategory === '') {
      return;
    }
    setLoadingList(true)

    const createListResponse = await createNewCategory({ category: newCategory.toLowerCase() })
    if ('data' in createListResponse) {
      setLists(prevState => {
        return [...prevState, createListResponse.data.newList]
      })
      setNewCategory('')
      setFlipCardActive(false)
      setLoadingList(false)
    }
  }


  // useEffect
  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }
  }, [user, router])


  return (
    <div className='flex flex-wrap content-start justify-start gap-4'>
      {lists && lists.length > 0 ? lists.map((item: ListCardType) => (
        <Card title={item.category} key={item._id} cards={cards.filter(card => card.category === item._id).length} status={true} path={`mycategories/${item.category}`} />
      )) : ''}


      <FlipCardX
        front={
          <div className='flex flex-col items-center justify-center w-full h-full rounded hover:bg-zinc-900' onClick={() => setFlipCardActive(true)}>
            <p>Add a card</p>
          </div>
        }
        back={
          <div className='flex w-full h-full rounded'>
            {!loadingList ? (

              <form className='flex flex-col items-center justify-center space-y-2' onSubmit={(e) => addCategory(e)}>
                <p>What&apos;s the name?</p>
                <input type="text" className='w-2/3 px-1 rounded' autoFocus value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder='"Learn Klingon..."' />
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
  )
}

export default MyCategoryPage