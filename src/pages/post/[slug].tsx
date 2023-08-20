import { Post } from "../../interfaces/post";
import { GetServerSideProps } from 'next';
import moment from 'moment';
import { getDetailBlog } from "../api/getDetailBlog";
interface PostProps{
    post: Post
}


const BlogDetail = ({post}: PostProps) => { 
    const formattedDate = moment(post.updatedAt).format('YYYY-MM-DD');;
    return (
        <section className="mt-32 flex-container flex-col w-3/5 mx-auto">
            <p className="text-2xl">{`${post.author.firstName} ${post.author.lastName}`}</p>
            <p className="text-xs">{formattedDate}</p>
            <p className="text-4xl font-semibold">{post.title}</p>
            <p className="">{post.content}</p>
        </section>
    );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await getDetailBlog(params)
  console.log(response)
  return {
    props: { post: response },
  };
};
export default BlogDetail;