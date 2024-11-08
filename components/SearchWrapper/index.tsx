"use client";

import React from "react";
import SearchAccount from "../SearchAccount";
import SearchPost from "../SearchPost";
import {
  SearchAccountForCard,
  SearchPostTypeForCard,
} from "@/service/searchService";

type PropsComponent = {
  listAccounts: SearchAccountForCard[];
  listPosts: SearchPostTypeForCard[];
  onItemSelect: () => void;
};

const SearchWrapper = ({
  listAccounts,
  listPosts,
  onItemSelect,
}: PropsComponent) => {
  return (
    <div className="w-[450px]">
      <SearchAccount onItemSelect={onItemSelect} listAccounts={listAccounts} />
      <SearchPost onItemSelect={onItemSelect} listPosts={listPosts} />
    </div>
  );
};

export default SearchWrapper;
