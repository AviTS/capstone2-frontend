import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../auth/UserContext';
import BookAppApi from '../api';
import './Rating.css';

function Rating({ currRating, book_id, library_id }) {
  const [rating, setRating] = useState(0);
  const { currentUser } = useContext(UserContext);

  const user_id = currentUser.user_id;

  useEffect(function getRatingOnMount() {
    if (currRating !== null) {
      setRating(currRating);
    }
  }, []);

  function handleChange(e) {
    e.persist();

    setRating((r) => ({ ...r, [e.target.id]: e.target.id }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let bookRating = e.target.id;

    if (bookRating) {
      try {
        handleChange(e);
        await BookAppApi.updateBookRating({
          user_id: user_id,
          library_id: +library_id,
          book_id: book_id,
          rating: +bookRating,
        });
        setRating(+bookRating);
      } catch (error) {
        console.log(error);
        return;
      }
    }
  }

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? 'on' : 'off'}
            onClick={handleSubmit}
            id={index}
          >
            <span className="star" id={index}>
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default Rating;
