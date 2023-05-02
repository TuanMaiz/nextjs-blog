import axios from "axios";
import { GetStaticProps } from 'next';
import {Post} from '../../interfaces/post'
import moment from 'moment';
import Link from "next/link";
interface PostList {
    posts: Post[];
  }


const BlogRenderItem = ({title, slug, views_count, likes_count, comments_count, author, updatedAt}: Post) => {
    const formattedDate = moment(updatedAt).format('YYYY-MM-DD')
    return (
        <div className="flex flex-col border-b-2 border-black mt-4">
            <div className="flex flex-row items-baseline">
                <Link href={`/users/${author.id}`} className="">{`${author.firstName} ${author.lastName}`}</Link>
                <p className="ml-4 text-xs">{formattedDate}</p>
            </div>
            <Link href={`/post/${slug}`} legacyBehavior ><a className="text-2xl font-bold">{title}</a></Link>
            <div className="flex flex-row text-xs mt-2">
                <p>Views: {views_count}</p>
                <p className="ml-2">Likes: {likes_count}</p>
                <p className="ml-2">Comments: {comments_count}</p>
            </div>
        </div>
    );
}


const BlogList = ({posts}: PostList) => {
    return (
        <section id="post-page" className="mt-16 w-full">
            <div>
                <ul>
                    {posts.map( post => (
                        <BlogRenderItem {...post} key={post.id} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default BlogList;