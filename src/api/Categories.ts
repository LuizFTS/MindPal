import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const url = "http://localhost:3001/list/category"

const token = Cookies.get('mindpalID')

const createNewCategory = async ({category}: {category: string}) => {
  try {
    const createCategory = await axios.post(url, {category}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return createCategory
  } catch (error) {
    const err = error as AxiosError

    return err
  }
}

const getLists = async () => {
  try {
    const {data} = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    
    const err = error as AxiosError
    return err
  }
}

export {
  getLists,
  createNewCategory
}