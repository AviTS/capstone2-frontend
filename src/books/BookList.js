import React, { useState, useEffect } from 'react';
import BookAppApi from '../api';
import SearchForm from '../common/SearchForm';
import { Link } from 'react-router-dom';
import './BookList.css';

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

  let bookInfo = [];

  if (books) {
    for (let i = 0; i < books.results.length; i++) {
      let bookTitle = books.results[i].book_title;
      let bookId = books.results[i].external_book_id;
      let bookObj = {
        title: bookTitle,
        id: bookId,
      };

      bookInfo.push(bookObj);
    }
  }

  return (
    <div className="BookList">
      <div>
        <SearchForm searchFor={search} />
      </div>
      <div>
        {bookInfo.length ? (
          <div className="BookList-results">
            <ul>
              {bookInfo.map((b) => (
                <li key={b.id}>
                  {b.title}
                  <Link to={`/getbook/${b.id}`}>View book details</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BookList;
