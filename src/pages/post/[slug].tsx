import { Post } from "../../interfaces/post";
import { GetServerSideProps } from 'next';
import axios from "axios";
import moment from 'moment';

interface PostProps{
    post: Post
}


const BlogDetail = ({post}: PostProps) => { 
    const formattedDate = moment(post.updatedAt).format('YYYY-MM-DD');;
    return (
        <section className="mt-32 flex-container flex-col">
            <p className="text-2xl">{`${post.author.firstName} ${post.author.lastName}`}</p>
            <p className="text-xs">{formattedDate}</p>
            <p className="text-4xl font-semibold">{post.title}</p>
            <p className="">{post.content}</p>
        </section>
    );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const {data} = await axios.get<Post>(`http://localhost:3001/posts/${params?.slug}`);
  return {
    props: { post: data },
  };
};
export default BlogDetail;