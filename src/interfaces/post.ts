import { User } from "./user";

export interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
    slug: string;
    views_count: number;
    likes_count: number;
    comments_count: number;
    author: User;
    updatedAt: string
}