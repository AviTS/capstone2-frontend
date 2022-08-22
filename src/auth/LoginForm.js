import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../common/Alert';

//Login form

function LoginForm({ login }) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [badLoginInfo, setBadLoginInfo] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (formData) {
      try {
        handleChange(evt);
        let result = await login(formData);
        if (result.success) {
          navigate('/');
        }
      } catch (error) {
        if (error.errors[0].status === 602) {
          setBadLoginInfo(true);
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
    <div className="LoginForm">
      <div className="container">
        <h2 className="mb-3">Log In</h2>
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
                  autoComplete="username"
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
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onSubmit={handleSubmit}
              >
                Login
              </button>
              <div>
                {badLoginInfo === true ? (
                  <Alert
                    type="danger"
                    messages={['Incorrect username or password.']}
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

export default LoginForm;
