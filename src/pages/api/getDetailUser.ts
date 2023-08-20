import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { ParsedUrlQuery } from 'querystring';
import { User } from '@/interfaces/user';


export async function getDetailUser(params: ParsedUrlQuery | undefined): Promise<any> {
    const response = await axios.get<User>(`http://localhost:3001/users/${params?.id}`);
    console.log(response.data)
  
    if (!response) {
      throw new Error('Request failed');
    }
  
    return response.data;
  }
