// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type LoginRequestBody = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}
export async function userSignUp(credentials: LoginRequestBody): Promise<any> {
    const response = await axios.post('http://localhost:3001/users/signup', credentials);
  
    if (!response) {
      throw new Error('Request failed');
    }
  
    return response;
  }

