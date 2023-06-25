import axios, { AxiosError } from 'axios'

const url = "http://localhost:3001/api/register"

interface UserData {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  confirmpassword: string
}

export const registerUser = async ({firstname, lastname, email, password, confirmpassword}: UserData) => {
  try {
    const {data} = await axios.post(url, {
      firstname,
      lastname,
      email,
      password,
      confirmpassword
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