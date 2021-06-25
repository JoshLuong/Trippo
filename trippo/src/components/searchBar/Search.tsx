import React from "react";

const Search = (props: { searchValue: any; onChangeHandler: any; }) => {
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input
          value={props.searchValue}
          onChange={props.onChangeHandler}
          className="prompt"
          type="text"
          placeholder="Search Your Itineraries..."
        />
        <i className="search icon" />
      </div>
      <div className="results" />
    </div>
  );
};

export default Search;
