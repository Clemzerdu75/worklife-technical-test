"use client";

import { useState } from "react";
import style from "./searchbox.module.css";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = ({ setSearch }: Props) => {
  const [searchField, setSearchField] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchField);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchBox;
