import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../common/Alert';
import BookAppApi from '../api';

function LibraryForm() {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    library_name: '',
    library_desc: '',
  });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await BookAppApi.createLibrary(formData);
    if (result) {
      navigate('/libraries');
    } else {
      setFormErrors(result.errors);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((l) => ({ ...l, [name]: value }));
  }

  return (
    <div className="LibraryForm">
      <h3 className="mb-3">Create New Library</h3>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                name="library_name"
                className="form-control"
                value={formData.library_name}
                onChange={handleChange}
                autoComplete="library-name"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                name="library_desc"
                className="form-control"
                value={formData.library_desc}
                onChange={handleChange}
                autoComplete="library-desc"
                required
              />
            </div>

            <button type="submit">Create New Library</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LibraryForm;
