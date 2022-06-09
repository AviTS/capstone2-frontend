import React from 'react';
import BookAppApi from './api';
import Homepage from './Homepage';
import Book from './books/Book';
import BookDetail from './books/BookDetail';
import { Route, Routes } from 'react-router-dom';
import NavRoutes from './routes-nav/NavRoutes';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavRoutes />
    </div>
  );
}

export default App;
