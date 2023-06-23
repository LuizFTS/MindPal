import axios from 'axios'

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
    const errors: any = error;
    return errors
  }
}