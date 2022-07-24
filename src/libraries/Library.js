import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import BookAppApi from '../api';
import UserContext from '../auth/UserContext';
import Book from '../books/Book';

function Library() {
  const { currentUser } = useContext(UserContext);

  const [books, setBooks] = useState(null);

  const { library_id } = useParams();

  useEffect(
    function getBooks() {
      async function getBook() {
        let books = await BookAppApi.getBooksFromLib(library_id);
        setBooks(books);
      }
      getBook();
    },
    [library_id]
  );

  console.log(books);

  if (!books) return;

  return (
    <div className="LibBookList">
      <h1>{books}</h1>
    </div>
  );
}

export default Library;
