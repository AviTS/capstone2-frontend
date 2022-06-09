import React from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import Homepage from '../Homepage';
import BookList from '../books/BookList';
import Book from '../books/Book';
import BookDetail from '../books/BookDetail';

function NavRoutes() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/getbook/:volId" element={<Book />} />
        <Route exact path="/getbooklist" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default NavRoutes;
