import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import Homepage from '../Homepage';
import BookList from '../books/BookList';
import Book from '../books/Book';
import BookDetail from '../books/BookDetail';
import LibraryList from '../libraries/LibraryList';
import LibraryForm from '../libraries/LibraryForm';
import Library from '../libraries/Library';

function NavRoutes({ login, signup }) {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={<Homepage login={login} signup={signup} />}
        />
        <Route exact path="/getbook/:volId" element={<Book />} />
        <Route exact path="/getbooklist" element={<BookList />} />
        <Route exact path="/libraries/" element={<LibraryList />} />
        <Route exact path="/newlibrary/" element={<LibraryForm />} />
        <Route exact path="/library/:library_id" element={<Library />} />
      </Routes>
    </div>
  );
}

export default NavRoutes;
