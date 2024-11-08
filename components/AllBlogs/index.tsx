"use client";

import {
  CateBlogForCard,
  getListPostBlog,
  PostBlogForCard,
} from "@/service/blogService";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PaginationForResponse } from "../../type";
import DOMPurify from "isomorphic-dompurify";
import { Pagination } from "antd";
import { LIMIT_DEFAULT, PAGE_NO_DEFAULT } from "@/lib/constants";
import { convertStringToSlug, objectToQueryParams } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CategoriesBlog from "../CategoriesBlog";
import Link from "next/link";

type PropsComponent = {
  conditionProps: {
    pageNo?: string;
    cateBlogId?: string;
    limit?: string;
    keyword?: string;
    sortBy?: string;
    orderBy?: string;
  };
  listCateBlog: Array<CateBlogForCard>;
};

type Condition = {
  pageNo?: string;
  cateBlogId?: string;
  limit?: string;
  keyword?: string;
  sortBy?: string;
  orderBy?: string;
};

const getBlogsByCondition = async (condition: Condition) => {
  try {
    return await getListPostBlog({
      limit: Number(condition.limit) ?? LIMIT_DEFAULT,
      cateBlogId: condition.cateBlogId,
      pageNo: Number(condition.pageNo) ?? PAGE_NO_DEFAULT,
      contentTextKey: condition.keyword,
    });
  } catch (error) {
    console.error;
  }
};

const AllBlogs = ({ conditionProps, listCateBlog }: PropsComponent) => {
  const [listBlog, setListBlog] = useState<PostBlogForCard[]>();
  const [conditions, setConditions] = useState<Condition>({
    limit: conditionProps.limit,
    cateBlogId: conditionProps.cateBlogId,
    keyword: conditionProps.keyword,
    orderBy: conditionProps.orderBy,
    pageNo: conditionProps.pageNo,
    sortBy: conditionProps.sortBy,
  });

  const [paginationBlog, setPaginationBlog] = useState<PaginationForResponse>();
  const router = useRouter();

  const getBlogs = (cond: Condition) => {
    getBlogsByCondition(cond).then((rs) => {
      if (rs) {
        const { data, pagination } = rs;
        setListBlog(data);
        setPaginationBlog({
          ...paginationBlog,
          pageNo: pagination.pageNo ?? String(PAGE_NO_DEFAULT),
          limit: pagination.limit ?? String(LIMIT_DEFAULT),
          totalRecord: pagination.totalRecord,
        });
      }
    });
  }

  useEffect(() => {
    const cond: Condition = {
      limit: conditionProps.limit ?? String(LIMIT_DEFAULT),
      cateBlogId: conditionProps.cateBlogId,
      keyword: conditionProps.keyword,
      orderBy: conditionProps.orderBy,
      pageNo: conditionProps.pageNo ?? String(PAGE_NO_DEFAULT),
      sortBy: conditionProps.sortBy,
    };
    setConditions(cond);
    getBlogs(cond);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionProps]);

  const onPageChange = (pageNo: string, limit: string) => {
    updatePath({
      ...conditions,
      pageNo: pageNo,
      limit: limit,
    });
  };

  const onFilter = (cond: Condition) => {
    updatePath({
      ...conditions,
      cateBlogId: cond.cateBlogId,
      keyword: cond.keyword,
    });
  };

  const updatePath = (condition: Condition) => {
    const query = objectToQueryParams(condition);
    router.push(`/blog?${query}#blog-container`);
  };

  const BlogPaginationComponent: React.FC<{
    paginationBlog?: PaginationForResponse;
  }> = ({ paginationBlog }) => {
    return (
      <Pagination
        defaultCurrent={
          paginationBlog?.pageNo ? Number(paginationBlog.pageNo) : undefined
        }
        total={
          paginationBlog?.totalRecord
            ? Number(paginationBlog.totalRecord)
            : undefined
        }
        pageSize={
          paginationBlog?.limit ? Number(paginationBlog.limit) : undefined
        }
        onChange={(pageNo, limit) =>
          onPageChange(String(pageNo), String(limit))
        }
      />
    );
  };
  return (
    <div className="flex gap-8">
      <div className="flex flex-col w-2/3 flex-none" id="blog-container">
        <div className="flex justify-between mt-[60px] mb-[10px]">
          <p className="text-3xl font-bold">Tất cả bài đăng</p>
          <BlogPaginationComponent
            paginationBlog={{
              limit: conditionProps.limit ?? paginationBlog?.limit,
              pageNo: conditionProps.pageNo ?? paginationBlog?.pageNo,
              totalRecord: paginationBlog?.totalRecord,
            }}
          />
        </div>
        <div className="flex flex-col w-full">
          {listBlog?.length ? (
            listBlog.map((item, index) => (
              <div
                key={index}
                className="relative transition duration-300 ease-in-out hover:bg-[#D7EFFF] rounded-md"
              >
                <Link
                  className="w-full h-full absolute z-10"
                  href={`/blog/${convertStringToSlug(item.id, item.title)}`}
                ></Link>
                <div className="flex p-2 gap-5 items-center justify-between">
                  <div className="w-1/3 h-[250px] relative rounded-md overflow-hidden flex-none">
                    <Image
                      className="object-cover w-full h-full"
                      layout="fill"
                      objectFit="cover"
                      alt="logo"
                      src={`${item.thumbnail_blog ?? "/agora.jpg"} `}
                    />
                  </div>
                  <div className="flex flex-col max-w-[600px] h-[250px] gap-5">
                    <p className="text-xl font-medium text-[#0F52BA] px-1">
                      {item.cate_blog?.map((item) => item.title).join(", ")}
                    </p>
                    <p className="text-2xl font-bold">{item.title}</p>
                    <div
                      className={
                        DOMPurify.sanitize(item.body)?.length > 100
                          ? "custom-text-dom custom-truncate truncate-mobile"
                          : "custom-text-dom"
                      }
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.body, {
                          FORBID_TAGS: ["img", "h1", "h2", "h3", "h4"],
                          KEEP_CONTENT: true,
                        }),
                      }}
                    />
                    <div className="flex justify-end gap-3">
                      <u>{item.account.full_Name ?? "Quản trị"}</u>
                      <i>{item.created_at}</i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="my-20">Không tìm thấy kết quả tìm kiếm.</p>
          )}
        </div>

        <div className="flex items-center justify-center mt-10">
          <BlogPaginationComponent paginationBlog={paginationBlog} />
        </div>
      </div>
      <CategoriesBlog
        onFilter={(e) => onFilter({ cateBlogId: e })}
        cateBlog={conditionProps.cateBlogId ?? ""}
        listCateBlog={listCateBlog || []}
      />
    </div>
  );
};

export default AllBlogs;
