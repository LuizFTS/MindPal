import axios, { AxiosError } from 'axios'

const url = process.env.NEXT_PUBLIC_API_URL + "/api/login"

interface SignIn {
  email: string,
  password: string,
}

export const signInAPI = async ({email, password}: SignIn) => {
  try {
    const {data} = await axios.post(url, {
      email,
      password,
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