import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookAppApi from '../api';
import UserContext from '../auth/UserContext';
import Book from '../books/Book';
import StarRating from './StarRating';

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

  const booksList = [];
  let bookAuthors = [];

  if (books) {
    for (let i = 0; i < books.length; i++) {
      let bookId = books[i].book_id;
      let bookTitle = books[i].title;
      let bookAuthor = books[i].author;
      let extBookId = books[i].external_book_id;
      let bookObj = {
        id: bookId,
        title: bookTitle,
        extBookId: extBookId,
        author: bookAuthor,
      };
      booksList.push(bookObj);
    }
  }

  if (!books) return;

  //<p>By: {b.author}</p>

  return (
    <div className="LibBookList">
      {books ? (
        <div className="BookList-results">
          <ul>
            {booksList.map((b) => (
              <li key={b.id}>
                <Link to={`/getbook/${b.extBookId}`}>{b.title}</Link>
                <StarRating />
              </li>
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
