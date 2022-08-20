import React, { useState, useContext } from 'react';
import PageContext from '../PageContext';

function SearchForm({ searchFor }) {
  const [uiSearchTerm, setUISearchTerm] = useState('');

  const { searchStr, page, setSearchStr } = useContext(PageContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    setSearchStr(uiSearchTerm.trim());
  }

  function handleChange(evt) {
    setUISearchTerm(evt.target.value);
  }

  return (
    <div className="SearchForm">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          name="searchTerm"
          placeholder="Enter search term here"
          value={uiSearchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-sm btn-primary">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
