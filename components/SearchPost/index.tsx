"use client";

import { SearchPostTypeForCard } from "@/service/searchService";
import PostSearchItem from "../PostSearchItem";

const SearchPost = ({
  listPosts,
  onItemSelect,
}: {
  listPosts: SearchPostTypeForCard[];
  onItemSelect: () => void;
}) => {
  return (
    <div className="w-full flex flex-col ">
      <p className="py-2 text-lg font-bold border-b">Bài viết</p>
      <div className={`flex flex-col max-h-[300px] overflow-y-auto`}>
        {listPosts.length === 0 ? (
          <p className="flex justify-center py-4">
            Không tìm thấy bài viết nào
          </p>
        ) : (
          listPosts.map((post, index) => (
            <PostSearchItem key={index} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPost;
