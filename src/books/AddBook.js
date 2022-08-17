import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../auth/UserContext';
import BookAppApi from '../api';
import { Link, useNavigate } from 'react-router-dom';

function AddBook({ book_id }) {
  const [libraries, setLibraries] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [form, updateForm] = useState({
    id: '',
    title: '',
  });
  let navigate = useNavigate();

  useEffect(function getLibraryList() {
    async function getLibraries() {
      setLibraries(await BookAppApi.getLibraries(currentUser.user_id));
    }
    getLibraries();
  }, []);

  let libsList = [];

  if (libraries) {
    for (let i = 0; i < libraries.length; i++) {
      let libId = libraries[i].library_id;
      let libTitle = libraries[i].library_name;
      let libObj = {
        id: libId,
        title: libTitle,
      };
      libsList.push(libObj);
    }
  }

  function handleChange(e) {
    e.persist();
    updateForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const libId = e.target.id.value;

    if (form) {
      try {
        handleChange(e);
        await BookAppApi.addBooktoLib(+libId, {
          user_id: currentUser.user_id,
          book_id: book_id,
        });
        navigate(`/library/${libId}`);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }

  return (
    <div>
      <div>
        {libsList.length ? (
          <form onSubmit={handleSubmit}>
            <div>
              <select id="id" name="id">
                {libsList.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="btn btn-sm btn-primary">Add Book</button>
            </div>
          </form>
        ) : (
          <div>
            <Link to={`/newlibrary`}>
              Click here to start adding books to a library!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddBook;
