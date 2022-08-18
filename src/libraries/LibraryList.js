import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import BookAppApi from '../api';
import UserContext from '../auth/UserContext';
import './LibraryList.css';

function LibraryList() {
  const [libraries, setLibraries] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(function getLibraryList() {
    async function getLibraries() {
      if (currentUser !== null) {
        setLibraries(await BookAppApi.getLibraries(currentUser.user_id));
      }
    }
    getLibraries();
  }, []);

  let libsList = [];

  if (libraries) {
    for (let i = 0; i < libraries.length; i++) {
      let libId = libraries[i].library_id;
      let libTitle = libraries[i].library_name;
      let libDesc = libraries[i].library_desc;
      let libObj = {
        id: libId,
        title: libTitle,
        desc: libDesc,
      };
      libsList.push(libObj);
    }
  }

  if (!currentUser) {
    return (
      <div>
        <h4>Please login or create an account.</h4>
      </div>
    );
  }

  return (
    <div>
      <div className="LibsList">
        {libsList.length ? (
          <div className="LibList-results">
            <ul>
              {libsList.map((l) => (
                <li key={l.id}>
                  <Link to={`/library/${l.id}`}> {l.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No results</p>
        )}
      </div>
      <div>
        <Link to={`/newlibrary`}>Create a New Library</Link>
      </div>
    </div>
  );
}

export default LibraryList;
