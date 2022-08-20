import React, { useState, useEffect, useContext } from 'react';
import BookAppApi from '../api';
import SearchForm from '../common/SearchForm';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState(null);
  const [userHasSearched, setUserHasSearched] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [page, setPage] = useState(0);

  useEffect(function getBooks() {
    search();
  }, []);

  async function search(searchStr, page = 0) {
    let books = null;
    if (searchStr !== undefined) {
      books = await BookAppApi.getBookList(searchStr, page);
    }
    if (books) {
      setUserHasSearched(true);
    }
    setBooks(books);
  }

  let bookInfo = [];

  if (userHasSearched && books.results) {
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

  if (!currentUser) {
    return (
      <div>
        <h4>Please login or create an account.</h4>
      </div>
    );
  }

  return (
    <div className="BookList">
      <div>
        <SearchForm searchFor={search} pageNum={page} />
      </div>
      <div>
        {bookInfo.length && userHasSearched ? (
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
      <div>
        {userHasSearched && bookInfo.length === 0 ? (
          <Alert type="danger" messages={['No results']} />
        ) : null}
      </div>
    </div>
  );
}

export default BookList;
