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
  const [duplicateLibErr, setDuplicateLibErr] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (formData) {
      try {
        handleChange(evt);
        await BookAppApi.createLibrary(formData);
        navigate(`/libraries/`);
      } catch (error) {
        if (error[0].status === 400) {
          setDuplicateLibErr(true);
        }
        return;
      }
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
            {duplicateLibErr === true ? (
              <Alert type="danger" messages={['Library already exists!']} />
            ) : null}
            <button type="submit" className="btn btn-primary">
              Create New Library
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LibraryForm;
