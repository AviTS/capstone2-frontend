import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookAppApi from '../api';
import AddBook from './AddBook';
import './Book.css';

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

  const bookArr = [];
  const bookAuthors = [];

  if (book) {
    let splitAuthorStr = '';
    let splitGenreStr = '';
    let newDescStr = '';

    if (book.book.author !== null) {
      let authorStr = book.book.author;
      let newAuthorStr = authorStr.replace(/["{}']/g, '');
      splitAuthorStr = newAuthorStr.split(',');
    }

    if (book.book.genre !== null) {
      let genreStr = book.book.genre;
      let newGenreStr = genreStr.replace(/["{}']/g, '');
      splitGenreStr = newGenreStr.split(',');
    }

    if (book.book.book_description !== null) {
      let descStr = book.book.book_description;
      newDescStr = descStr.replace(/<[^>]+>/g, '');
    }

    let bookObj = {
      title: book.book.title,
      author: splitAuthorStr,
      genre: splitGenreStr,
      desc: newDescStr,

      img: book.book.cover_img,
      id: book.book.book_id,
      extId: book.book.external_book_id,
    };
    bookArr.push(bookObj);
    bookAuthors.push(bookObj.author);
  }

  if (!book) return;

  return (
    <div>
      {bookArr.length ? (
        <div>
          <h2>{bookArr[0].title}</h2>
          <div>
            <h3>By:</h3>
            {bookAuthors[0].map((a) => (
              <h3 key={a}>{a}</h3>
            ))}
          </div>
          <p>
            {bookArr[0].genre ? [...bookArr[0].genre] : 'Genre not listed.'}
          </p>
          <p>
            {bookArr[0].desc
              ? [...bookArr[0].desc]
              : 'No description available.'}
          </p>
        </div>
      ) : (
        <p>Book not found</p>
      )}
      <div>
        <AddBook book_id={bookArr[0].id} />
      </div>
    </div>
  );
}

export default Book;
