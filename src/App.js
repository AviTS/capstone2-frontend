import React, { useState, useEffect } from 'react';
import BookAppApi from './api';
import Homepage from './Homepage';
import Book from './books/Book';
import BookDetail from './books/BookDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavRoutes from './routes-nav/NavRoutes';
import useLocalStorage from './hooks/useLocalStorage';
import jwt from 'jsonwebtoken';
import UserContext from './auth/UserContext';
import Navigation from './routes-nav/Navigation';

import './App.css';

export const TOKEN_STORAGE_ID = 'bookapp-token';

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            BookAppApi.token = token;
            let currentUser = await BookAppApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error('App loadUserInfo: problem loading', err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  async function signup(signupData) {
    try {
      let token = await BookAppApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  async function login(loginData) {
    try {
      let token = await BookAppApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <Navigation logout={logout} />
        <NavRoutes login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
