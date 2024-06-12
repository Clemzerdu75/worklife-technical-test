"use client";

import { useState } from "react";

import style from "./searchbox.module.css";
import Button from "../button/button";
import { CircleX } from "lucide-react";

/**
 * Search Form to provide string for sending to the API
 * @param {function} setSearch set string to the parent component for data fetching
 */

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = ({ setSearch }: Props) => {
  /* search string from input */
  const [searchField, setSearchField] = useState("");

  /* Send search string to parent when form is submitted */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchField);
  };

  /* Clear search field and search data to reset search */
  const resetSearch = () => {
    setSearchField("");
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <div className={style.inputWrapper}>
        <input
          className={style.input}
          type="text"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />

        {/* Reset Handling */}
        <div className={style.deleteWrapper}>
          {searchField.length ? (
            <button
              type="button"
              className={style.deleteButton}
              onClick={resetSearch}
            >
              <CircleX color="grey" />
            </button>
          ) : null}
        </div>
      </div>

      <Button className="search">Submit</Button>
    </form>
  );
};

export default SearchBox;
