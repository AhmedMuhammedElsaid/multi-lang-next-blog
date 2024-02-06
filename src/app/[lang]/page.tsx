import PostsList from "@/components/PostsList";
import React, { Suspense } from "react";
import classes from "./page.module.css";
import { IParams, IPost } from "./types";
import useTranslation from "next-translate/useTranslation";
import { Metadata } from "next";
import { META_OBJECT } from "../../constants";
import { getPosts, handlePagination } from "@/utils";
import Pagination from "@/components/Pagination";

export const generateMetadata = ({ params: { lang } }: IParams): Metadata => {
  return {
    title: META_OBJECT.title[lang],
    description: META_OBJECT.description[lang],
  };
};

const Page: React.FC<IParams> = async ({ params: { lang }, searchParams }) => {
  const { t } = useTranslation("common");
  const posts: IPost[] = getPosts();
  const query = searchParams?.query || "";
  const filterTags = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  // we are just mocking the searchTerm and Tags filter logic
  const handleGetCurrentPosts = () => {
    // if there is no query and no filterTags, return all posts
    if (!query && !filterTags) return posts;

    let newData: IPost[] = [];

    // if there is a query, filter posts by query
    if (query.length)
      posts.forEach((post) => {
        if (post.title[lang].toLowerCase().includes(query.toLowerCase())) {
          newData.push(post);
        }
      });

    //if there is a filterTags, filter posts by filterTags
    if (filterTags.length) {
      if (filterTags === "tag1") return posts.slice(5, 8);
      else return posts.slice(16, 20);
    }

    return newData;
  };

  // pagination Helper Fn
  const currentPosts = handlePagination({
    currentPage,
    postsPerPage: 6,
    posts: handleGetCurrentPosts(),
  });

  if (!posts?.length) return <div>{t("loading")}</div>;

  if (!handleGetCurrentPosts()?.length)
    return <div className={classes.notFound}>{t("no-posts-found")}</div>;

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>{t("posts")}</h1>
      <Suspense key={query + currentPage} fallback={<h1>{t("loading")}</h1>}>
        <PostsList posts={currentPosts} lang={lang} />
        <Pagination
          postsPerPage={6}
          totalPosts={handleGetCurrentPosts()?.length}
        />
      </Suspense>
    </div>
  );
};

export default Page;
