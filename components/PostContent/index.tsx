"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import PostCard from "../PostCard";
import { deletePostByUser, getValidPost } from "../PostCard/action";
import { Skeleton } from "antd";
import { PostForCard } from "@/service/postService";
import { PermissionPostForResponse } from "@/service/permissionPostService";

type PropsComponent = {
  listValidPost: PostForCard[];
  listPermissionPost: PermissionPostForResponse[];
};

export default function PostContent(props: PropsComponent) {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [listValidPost, setListValidPost] = useState<PostForCard[]>(
    props.listValidPost,
  );

  useEffect(() => {
    setListValidPost(props.listValidPost);
  }, [props]);

  const [page, setPage] = useState<number>(2);
  const scrollTrigger = useRef(null);
  const loadMorePosts = async () => {
    if (hasMoreData) {
      const apiPosts = (await getValidPost(page)) ?? [];
      if (!apiPosts?.length) {
        setHasMoreData(false);
      }
      setListValidPost([...listValidPost, ...apiPosts]);
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 },
    );

    if (scrollTrigger.current) {
      observer.observe(scrollTrigger.current);
    }

    return () => {
      if (scrollTrigger.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(scrollTrigger.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDeletePost = async (idPost: string) => {
    const res = await deletePostByUser(idPost);
    if (res) {
      setListValidPost((prevList) =>
        prevList.filter((post) => post.post_id !== idPost),
      );
    }
  };

  return (
    <Fragment>
      {listValidPost.map((item) => (
        <PostCard
          item={item}
          key={item.post_id}
          handleDeletePost={handleDeletePost}
          listPermissionPost={props.listPermissionPost}
        />
      ))}
      <div className="text-center text-slate-600 mt-5">
        {hasMoreData ? (
          <div ref={scrollTrigger}>
            <Skeleton avatar active paragraph={{ rows: 6 }} />
          </div>
        ) : (
          <span className="text-center w-full block font-medium">
            Bạn đã xem hết tin ngày hôm nay
          </span>
        )}
      </div>
    </Fragment>
  );
}
