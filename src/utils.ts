import data from '../assets/posts.json';
import { IPost, IPropsPaginationHelper } from './app/[lang]/types';

export const getPosts = (): IPost[] => {
    return data;
};



export const handlePagination = ({ postsPerPage, currentPage, posts }: IPropsPaginationHelper) => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);

}