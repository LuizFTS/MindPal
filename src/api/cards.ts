import { CardType } from '@/types'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const url = process.env.NEXT_PUBLIC_API_URL + "/list/category/card"

const token = Cookies.get('mindpalID')

const createNewCard = async ({category, question, answer, difficulty}: CardType) => {
  // When the card is created, the first review date is set to the current date
  const reviewAt = new Date().toISOString()
  try {
    // back-end request
    const {data} = await axios.post(url, {category, question, answer, difficulty, reviewAt}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    const err = error as AxiosError

    // if error doesn't return the response property, it can be a network error or the server is not working, so it returns a default error to try again later
    if('response' in err && err.response !== undefined){
      const {response: {data}} = err
      return data
    }
    const response = {errors: ["Please try again later"]}
    return response
  }
}

const getCards = async () => {
  try {
    const {data} = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    const err = error as AxiosError
    if('response' in err && err.response !== undefined){
      const {response: {data}} = err
      return data
    }
    const response = {errors: ["Please try again later"]}
    return response
  }
}

const updateReviewDate = async (card: CardType) => {
  const {_id, reviewAt, difficulty} = card
  try {
    const {data} = await axios.put(url, {_id, reviewAt, difficulty}, { headers: { Authorization: `Bearer ${token}`}})

    return data
  } catch (error) {
    const err = error as AxiosError
    if('response' in err && err.response !== undefined){
      const {response: {data}} = err
      return data
    }
    const response = {errors: ["Please try again later"]}
    return response
  }

}


export {
  getCards,
  createNewCard,
  updateReviewDate
}