"use client";

import { useState } from "react";

import style from "./searchbox.module.css";
import Button from "../button/button";
import { CircleX } from "lucide-react";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = ({ setSearch }: Props) => {
  const [searchField, setSearchField] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchField);
  };

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
