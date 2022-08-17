import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookAppApi from '../api';
import Rating from './Rating';
import './Library.css';

function Library() {
  const [books, setBooks] = useState(null);

  const { library_id } = useParams();

  useEffect(function getBooks() {
    async function getBook() {
      let books = await BookAppApi.getBooksFromLib(library_id);
      setBooks(books);
    }
    getBook();
  }, []);

  const booksList = [];

  if (books) {
    for (let i = 0; i < books.length; i++) {
      let bookId = books[i].book_id;
      let bookTitle = books[i].title;
      let bookAuthor = books[i].author;
      let extBookId = books[i].external_book_id;
      let rating = books[i].user_rating;
      let bookObj = {
        id: bookId,
        title: bookTitle,
        extBookId: extBookId,
        author: bookAuthor,
        rating: rating,
      };
      booksList.push(bookObj);
    }
  }

  if (!books) return;

  //<p>By: {b.author}</p>

  return (
    <div className="LibBookList">
      {booksList.length ? (
        <div className="BookList-results">
          <ul>
            {booksList.map((b) => (
              <li key={b.id}>
                <Link to={`/getbook/${b.extBookId}`}>{b.title}</Link>
                <Rating
                  currRating={b.rating}
                  book_id={b.id}
                  library_id={library_id}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>
          You either haven't added any books to your library yet or you're in
          someone else's library!
        </p>
      )}
    </div>
  );
}

export default Library;
