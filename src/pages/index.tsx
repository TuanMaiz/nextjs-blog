import {GetStaticProps } from "next";
import Header from './header/Header'
import HomePage from './homePage/HomePage'
import { Post } from "../interfaces/post";
import axios from "axios";


interface PostList{
  posts: Post[]
}
export const getStaticProps: GetStaticProps<PostList> = async () => {
  const {data} = await axios.get<Post[]>(`${process.env.DATABASE_URL}/posts`);
  return {
    props: {
      posts: data
    }
  };
}
export default function Home({posts} : PostList) {

  return (
    <>
      <Header/>
      <HomePage posts={posts}/>
    </>
  )
}
