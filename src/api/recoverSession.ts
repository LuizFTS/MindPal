import axios, { AxiosError } from 'axios'

const url = "http://localhost:3001/api/login/token"

interface TokenSignIn {
  token: string,
}

export const recoverSession = async ({token}: TokenSignIn) => {
  try {
    const {data} = await axios.post(url, {
      token,
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