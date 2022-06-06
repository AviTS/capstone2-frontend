import React from 'react';
import BookAppApi from './api';
import Homepage from './Homepage';
import Book from './Book';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import BookList from './books/BookList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/getbook" element={<Book />} />
        <Route exact path="/getbooklist" element={<BookList />} />
      </Routes>
    </div>
  );
}

export default App;
