import { CardType } from '@/types'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const url = "http://localhost:3001/list/category/card"

const token = Cookies.get('mindpalID')

const createNewCard = async ({category, question, answer, difficulty}: CardType) => {
  const reviewAt = new Date().toISOString()
  try {
    const {data} = await axios.post(url, {category, question, answer, difficulty, reviewAt}, {
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