import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Post } from '@/interfaces/post';
import { ParsedUrlQuery } from 'querystring';


export async function getDetailBlog(params: ParsedUrlQuery | undefined): Promise<any> {
    const response = await axios.get<Post>(`http://localhost:3001/posts/${params?.slug}`);
  
    if (!response) {
      throw new Error('Request failed');
    }
  
    return response.data;
  }
