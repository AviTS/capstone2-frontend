import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookAppApi from '../api';
import Rating from './Rating';
import UserContext from '../auth/UserContext';
import './Library.css';

function Library() {
  const [books, setBooks] = useState(null);
  const { currentUser } = useContext(UserContext);

  const { library_id } = useParams();

  useEffect(function getBooks() {
    if (currentUser !== null) {
      async function getBook() {
        let books = await BookAppApi.getBooksFromLib(library_id);
        setBooks(books);
      }
      getBook();
    }
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

  if (!currentUser) {
    return (
      <div>
        <h4>Please login or create an account.</h4>
      </div>
    );
  }

  if (!books) return;

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
