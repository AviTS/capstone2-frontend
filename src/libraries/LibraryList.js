import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import BookAppApi from '../api';
import UserContext from '../auth/UserContext';
import Library from './Library';
import LibraryForm from './LibraryForm';

function LibraryList() {
  const [libraries, setLibraries] = useState(null);
  const { currentUser } = useContext(UserContext);

  useEffect(function getLibraryList() {
    async function getLibraries() {
      setLibraries(await BookAppApi.getLibraries(currentUser.user_id));
    }
    getLibraries();
  }, []);

  // console.log(libraries);

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

  return (
    <div>
      <div className="LibsList">
        {libraries ? (
          <div className="LibList-results">
            <ul>
              {libsList.map((l) => (
                <li key={l.id}>{l.title}</li>
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
