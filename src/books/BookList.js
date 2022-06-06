import React, { useState, useEffect } from 'react';
import BookAppApi from '../api';
import Book from '../Book';
import SearchForm from '../common/SearchForm';

function BookList() {
  const [books, setBooks] = useState(null);

  useEffect(function getBooks() {
    search();
  }, []);

  async function search(searchStr) {
    let books = null;
    if (searchStr !== undefined) {
      books = await BookAppApi.getBookList(searchStr);
    }
    setBooks(books);
  }

  let bookIds = [];

  if (books) {
    for (let i = 0; i < books.results.length; i++) {
      let extBookId = books.results[i].external_book_id;
      // console.log(books.results[i]);
      bookIds.push(extBookId);
    }
    console.log(bookIds);
  }

  return (
    <div className="BookList">
      <SearchForm searchFor={search} />
      {bookIds.length ? (
        <div className="BookList-results">
          {bookIds.map((b) => (
            <Book volId={b} />
          ))}
        </div>
      ) : (
        <p>no results</p>
      )}
    </div>
  );
}

export default BookList;
