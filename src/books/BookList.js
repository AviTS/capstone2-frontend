import React, { useState, useEffect, useContext } from 'react';
import BookAppApi from '../api';
import SearchForm from '../common/SearchForm';
import { Link } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import Alert from '../common/Alert';
import './BookList.css';
import PageContext from '../PageContext';

function BookList() {
  const [books, setBooks] = useState(null);
  const [userHasSearched, setUserHasSearched] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [searchStr, setSearchStr] = useState('');
  const [maxPage, setMaxPage] = useState(0);

  useEffect(
    function getBooks() {
      search();
    },
    [searchStr, page]
  );

  async function search() {
    let books = null;
    let maxPageVal = 0;

    if (searchStr !== '') {
      let bookListRes = await BookAppApi.getBookList(searchStr, page);
      books = bookListRes.books;
      maxPageVal = bookListRes.maxPages;
    }
    if (books) {
      setUserHasSearched(true);
    }
    setBooks(books);
    //Google Books API has a bug where totalItems changes with every search, therefore changing maxPages value with every search.
    if (page === 0) {
      setMaxPage(maxPageVal);
    }
  }

  let bookInfo = [];

  if (userHasSearched && books) {
    for (let i = 0; i < books.length; i++) {
      let bookTitle = books[i].book_title;
      let bookId = books[i].external_book_id;
      let bookObj = {
        title: bookTitle,
        id: bookId,
      };
      bookInfo.push(bookObj);
    }
  }

  const nextPage = () => {
    setPage((page) => page + 1);
  };

  const prevPage = () => {
    if (page <= 0) {
      setPage((page) => (page = 0));
    } else {
      setPage((page) => page - 1);
    }
  };

  if (!currentUser) {
    return (
      <div>
        <h4>Please login or create an account.</h4>
      </div>
    );
  }

  return (
    <PageContext.Provider value={{ searchStr, page, setSearchStr }}>
      <div className="BookList">
        <div>
          <SearchForm searchFor={search} />
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
          {bookInfo.length && userHasSearched ? (
            <div>
              <button onClick={prevPage}>Previous</button>
              Page {page + 1} of {maxPage}
              <button onClick={nextPage}>Next</button>
            </div>
          ) : null}
        </div>
        <div>
          {userHasSearched && bookInfo.length === 0 ? (
            <Alert type="danger" messages={['No results']} />
          ) : null}
        </div>
      </div>
    </PageContext.Provider>
  );
}

export default BookList;
