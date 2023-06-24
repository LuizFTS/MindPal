import axios, { AxiosError } from 'axios'

const url = "http://localhost:3001/api/login"

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
    console.log(err)
    if('response' in err && err.response !== undefined){
      const {response: {data}} = err
      return data
    }
    const response = {errors: ["Please try again later"]}
    return response
  }
}