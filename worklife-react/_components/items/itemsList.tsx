"use client";

import getItems from "@/app/api/getItems";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Key, useMemo, useState } from "react";
import SearchBox from "../searchbox/searchbox";

import style from "./itemsList.module.css";
import { ItemImage, ItemTitle, ItemWrapper, ItemLoader } from "./item";
import Button from "../button/button";

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

  console.log(data);
  return (
    <div className={style.contentWrapper}>
      <SearchBox setSearch={setSearch} />
      <div className={style.itemWrapper}>
        {isFetching && !isFetchingNextPage ? <ItemsLoader /> : null}

        {data
          ? data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.artObjects.map((object, i: Key) => (
                  <ItemWrapper key={i}>
                    {object.hasImage ? (
                      <ItemImage src={object.webImage.url} />
                    ) : null}
                    <ItemTitle>{object.title}</ItemTitle>
                  </ItemWrapper>
                ))}
              </React.Fragment>
            ))
          : null}
        {isFetchingNextPage && <ItemsLoader />}
      </div>
      {(!data || !data.pages[0].artObjects.length) && !isFetching ? (
        <p> Nothing Found ...</p>
      ) : (
        <Button
          className="search"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage ? "Load More" : "Nothing left to load"}
        </Button>
      )}
    </div>
  );
};

const ItemsLoader = () => {
  const loadingArray = useMemo(() => [...Array(20)], []);

  return loadingArray.map((el, key) => <ItemLoader key={key} />);
};

export default ItemsList;
