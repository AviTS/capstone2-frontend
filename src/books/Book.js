import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookAppApi from '../api';

function Book() {
  const { volId } = useParams();

  const [book, setBook] = useState(null);

  useEffect(
    function getBookDetails() {
      async function getBook() {
        setBook(await BookAppApi.getBook(volId));
      }
      getBook();
    },
    [volId]
  );

  if (!book) return;

  return (
    <div>
      {book.book ? (
        <div>
          <h2>{book.book.book_title}</h2>
          <h3>{[...book.book.book_author]}</h3>
          <p>{[...book.book.book_genre]}</p>
          <p>{book.book.book_description}</p>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

//old useEffect code:

// function Book() {
//   const [formData, setFormData] = useState({ volId: '' });

//   async function handleSubmit(evt) {
//     evt.preventDefault();

//     let result = await BookAppApi.getBook(formData.volId);
//   }

//   async function handleChange(evt) {
//     const { name, value } = evt.target;
//     setFormData((data) => ({ ...data, [name]: value }));
//   }

//   return (
//     <div>
//       <h1>Book</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="volId"
//           className="form-control"
//           value={formData.volId}
//           onChange={handleChange}
//         />

//         <button type="submit" onSubmit={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

export default Book;
