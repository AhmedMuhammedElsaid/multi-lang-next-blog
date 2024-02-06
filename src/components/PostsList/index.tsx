import React from "react";
import classes from "./index.module.css";
import PostItem from "../PostItem";
import { IPost, IPropsList } from "@/app/[lang]/types";

const PostsList: React.FC<IPropsList> = ({ posts, lang }) => {
  return (
    <ul className={classes.listWrapper}>
      {posts?.map((post: IPost) => (
        <PostItem key={post.id} {...post} lang={lang} showView />
      ))}
    </ul>
  );
};

export default PostsList;
