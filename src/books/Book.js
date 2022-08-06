import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import BookAppApi from '../api';
import AddBook from './AddBook';

function Book() {
  const { volId } = useParams();

  const { currentUser } = useContext(UserContext);

  const [book, setBook] = useState(null);

  // const { hasAddedBookToLib, addBookToLib } = useState(null);

  useEffect(
    function getBookDetails() {
      async function getBook() {
        setBook(await BookAppApi.getBook(volId));
      }
      getBook();
    },
    [volId]
  );

  console.log(book);

  const bookArr = [];
  const bookAuthors = [];

  if (book) {
    let str = book.book.author;
    let newStr = str.replace(/["{}']/g, '');
    let splitStr = newStr.split(',');

    let bookObj = {
      title: book.book.title,
      author: splitStr,
      genre: book.book.genre,
      desc: book.book.book_description,
      img: book.book.cover_img,
      id: book.book.book_id,
      extId: book.book.external_book_id,
    };
    bookArr.push(bookObj);
    bookAuthors.push(bookObj.author);
  }

  if (!book) return;

  //need to fix book cover image...
  // <div>
  //   <img src={book.book.cover_img} alt="" />
  // </div>;

  return (
    <div>
      {bookArr ? (
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
