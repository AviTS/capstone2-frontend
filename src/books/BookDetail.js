import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookAppApi from '../api';
import Book from './Book';

function BookDetail() {
  const { bookId } = useParams();

  const [book, setBook] = useState(null);

  useEffect(
    function getBook() {
      async function getBookDetails() {
        setBook(await BookAppApi.getBook(bookId));
      }
      getBookDetails();
    },
    [bookId]
  );

  if (!book) return;

  return (
    <div className="BookDetail">
      <h2>{book.book.book_title}</h2>
      <p>{book.book.book_description}</p>
    </div>
  );
}

export default BookDetail;
