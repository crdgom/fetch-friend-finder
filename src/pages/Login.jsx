// * Login.jsx
// * Name: Login
// * Description: This component displays a Bootstrap-styled login form where users can enter their credentials.
// *  It uses the `useAuth` hook to handle authentication.
// * Since: v1.0.0
// * Author: @crdgom

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ name: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the login function from the AuthContext
    await login(credentials);

    navigate('/find-new-friend');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

