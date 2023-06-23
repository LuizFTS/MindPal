import { CardType } from '@/types'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const url = "http://localhost:3001/list/category/card"

const token = Cookies.get('mindpalID')

const createNewCard = async ({category, question, answer}: CardType) => {
  try {
    const createCard = await axios.post(url, {category, question, answer, difficulty: "hard"}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return createCard
  } catch (error) {
    const err = error as AxiosError

    return err
  }
}

const getCards = async () => {
  try {
    const {data} = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(data)
    return data
  } catch (error) {
    
    const err = error as AxiosError
    return err
  }
}

export {
  getCards,
  createNewCard
}