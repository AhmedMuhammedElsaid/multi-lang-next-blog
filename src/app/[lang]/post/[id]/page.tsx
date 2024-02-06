"use client";
import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import PostItem from "@/components/PostItem";
import useTranslation from "next-translate/useTranslation";
import { IPost, IProps, Languages } from "../../types";
import { getPosts } from "@/utils";
import { useParams } from "next/navigation";
const PostDetail: React.FC<IProps> = (props) => {
  const { id } = props?.params;
  const [post, setPost] = useState<IPost | undefined>(undefined);
  const { t } = useTranslation("common");
  const params = useParams();
  const lang: Languages = params.lang as Languages;
  useEffect(() => {
    if (id) {
      const post = getPosts().find((item) => item?.id === +id);
      setPost(post);
    }
  }, [id]);

  if (!post) return <div>{t("loading-post")}</div>;

  return (
    <>
      <h1>
        {t("post-num")} {id}
      </h1>
      <div className={classes.postContainer}>
        <PostItem key={post.id} {...post} lang={lang} />
      </div>
    </>
  );
};

export default PostDetail;
