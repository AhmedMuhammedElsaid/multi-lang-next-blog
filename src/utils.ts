import data from '../assets/posts.json';
import { IPost } from './app/[lang]/types';

export const getPosts = (): IPost[] => {
    return data;
};



export const handlePagination = (postsPerPage: number, currentPage: number, posts: IPost[]) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);

}