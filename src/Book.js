import React, { useState, useEffect } from 'react';
import BookAppApi from './api';

function Book() {
  const [formData, setFormData] = useState({ volId: '' });

  async function handleSubmit(evt) {
    evt.preventDefault();

    let result = await BookAppApi.getBook(formData.volId);
  }

  async function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div>
      <h1>Book</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="volId"
          className="form-control"
          value={formData.volId}
          onChange={handleChange}
        />

        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Book;
