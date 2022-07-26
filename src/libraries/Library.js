import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import BookAppApi from '../api';
import UserContext from '../auth/UserContext';
import Book from '../books/Book';

function Library() {
  const { currentUser } = useContext(UserContext);

  const [books, setBooks] = useState(null);

  const { library_id } = useParams();

  useEffect(function getBooks() {
    async function getBook() {
      let books = await BookAppApi.getBooksFromLib(library_id);
      setBooks(books);
    }
    getBook();
  }, []);

  console.log(books);

  let booksList = [];

  if (books) {
    for (let i = 0; i < books.length; i++) {
      let bookId = books[i].book_id;
      let bookObj = {
        id: bookId,
      };

      booksList.push(bookObj);
    }
  }

  if (!books) return;

  return (
    <div className="LibBookList">
      {books ? (
        <div className="BookList-results">
          <ul>
            {booksList.map((b) => (
              <li key={b.id}>{b.id}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}

export default Library;
