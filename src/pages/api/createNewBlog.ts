// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type RequestBody = {
    title: string,
    content: string,
    userId: number,
    accessToken: string,
}
export async function createNewBlog(data: RequestBody): Promise<any> {
    const response = await axios.post(`//localhost:3001/posts/create`, data);

  
    if (!response) {
      throw new Error('Request failed');
    }
  
    return response;
  }

