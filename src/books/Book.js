import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookAppApi from '../api';

function Book() {
  const { volId } = useParams();

  const [book, setBook] = useState(null);

  useEffect(
    function getBookDetails() {
      async function getBook() {
        setBook(await BookAppApi.getBook(volId));
      }
      getBook();
    },
    [volId]
  );

  if (!book) return;

  return (
    <div>
      {book.book ? (
        <div>
          <h2>{book.book.book_title}</h2>
          <h3>{[...book.book.book_author]}</h3>
          <p>{[...book.book.book_genre]}</p>
          <p>{book.book.book_description}</p>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default Book;
