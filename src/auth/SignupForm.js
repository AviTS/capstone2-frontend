import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../common/Alert';

//signup form

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [duplicateUserErr, setDuplicateUserErr] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (formData) {
      try {
        handleChange(evt);
        let result = await signup(formData);
        if (result.success) {
          navigate('/getbooklist');
        }
      } catch (error) {
        if (error.errors[0].status === 601) {
          setDuplicateUserErr(true);
        }
        return;
      }
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="SignupForm">
      <div className="container">
        <h2 className="mb-3">Sign Up</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={30}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={20}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={handleSubmit}
              >
                Sign up
              </button>
              <div>
                {duplicateUserErr === true ? (
                  <Alert
                    type="danger"
                    messages={['Please choose a different username.']}
                  />
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
