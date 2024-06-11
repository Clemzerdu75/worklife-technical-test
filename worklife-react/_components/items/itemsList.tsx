"use client";

import getItems from "@/app/api/getItems";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Key, useState } from "react";
import SearchBox from "../searchbox/searchbox";

import style from "./itemsList.module.css";

const ItemsList = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    error,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["items", search],
    queryFn: ({ pageParam }) => getItems({ pageParam, search }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (error) return <p> Communication error during API call</p>;

  const resetSearch = () => {
    setSearch("");
  };

  return (
    <div className={style.contentWrapper}>
      <SearchBox setSearch={setSearch} />

      {search.length ? <button onClick={resetSearch}>Delete</button> : null}
      {isFetching && !isFetchingNextPage ? <p>Getting data ....</p> : null}
      <div className={style.itemWrapper}>
        {data
          ? data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.artObjects.map((object, i: Key) => {
                  return <p key={i}>{object.title}</p>;
                })}
              </React.Fragment>
            ))
          : "Nothing Found"}
      </div>
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {hasNextPage ? "Load More" : "Nothing left to load"}
      </button>
      {isFetchingNextPage && <p>Getting data...</p>}
    </div>
  );
};

export default ItemsList;
