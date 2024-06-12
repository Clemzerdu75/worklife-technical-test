"use client";

import getItems from "@/app/api/getItems";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { Key, useMemo, useState } from "react";
import SearchBox from "../searchbox/searchbox";

import style from "./itemsList.module.css";
import { ItemImage, ItemTitle, ItemWrapper, ItemLoader } from "./item";
import Button from "../button/button";

/**
 * Fetch and display relevant items from the server.
 */
const ItemsList = () => {
  /* search string from SearchBox component */
  const [search, setSearch] = useState("");

  /* Data Fetching */
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

  /* Error Handling */
  if (error) return <p> Communication error during API call</p>;

  return (
    <div className={style.contentWrapper}>
      <SearchBox setSearch={setSearch} />
      <div className={style.itemWrapper}>
        {/* Loading UI for initial load */}
        {isFetching && !isFetchingNextPage ? <ItemsLoader /> : null}

        {/* Items List UI */}
        {data
          ? data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.artObjects.map((object, i: Key) => (
                  <Item object={object} key={i} />
                ))}
              </React.Fragment>
            ))
          : null}

        {/* Loading UI for next pages */}
        {isFetchingNextPage && <ItemsLoader />}
      </div>

      {/* UI for empty data */}
      {(!data || !data.pages[0].artObjects.length) && !isFetching ? (
        <p> Nothing Found ...</p>
      ) : (
        /* if data, Load More Button to trigger fetching of next page */
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

/**
 * Item Card UI
 * @param {object} object - object that contains all the informations needed for the display of an item card
 */

interface ItemProps {
  object: any;
}

const Item = ({ object }: ItemProps) => (
  <ItemWrapper>
    {object.hasImage ? <ItemImage src={object.webImage.url} /> : null}
    <ItemTitle>{object.title}</ItemTitle>
  </ItemWrapper>
);

/**
 * Item List Skeleton when waiting for server to respond.
 */

const ItemsLoader = () => {
  const loadingArray = useMemo(() => [...Array(20)], []);

  return loadingArray.map((el, key) => <ItemLoader key={key} />);
};

export default ItemsList;
