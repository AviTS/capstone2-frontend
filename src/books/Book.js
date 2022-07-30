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

  //need to fix book cover image...
  // <div>
  //   <img src={book.book.cover_img} alt="" />
  // </div>;

  return (
    <div>
      {book.book ? (
        <div>
          <h2>{book.book.book_title}</h2>
          <h3>{[...book.book.book_author]}</h3>
          <p>
            {book.book.book_genre
              ? [...book.book.book_genre]
              : 'Genre not listed.'}
          </p>
          <p>
            {book.book.book_description
              ? [...book.book.book_description]
              : 'No description available.'}
          </p>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default Book;
