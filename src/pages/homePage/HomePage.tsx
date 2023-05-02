import BlogList from "../blogList/BlogList";
import { Post } from "../../interfaces/post";
import axios from "axios";
import { GetStaticProps } from "next";

interface PostList{
    posts: Post[]
}
function HomePage({posts}: PostList) {
  
    return (
        <div className="flex-container">
          <div className="flex-container mt-16 w-1/2">
            <BlogList posts={posts}/>
          </div>
        </div>
    );
}

export default HomePage;