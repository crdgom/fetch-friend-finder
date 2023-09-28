// * Header.jsx
// * Name: Header
// * Description: Header component with Bootstrap navigation bar.
// * Since: v1.0.0
// * Author: @crdgom

import { Link } from 'react-router-dom';

// Importa tu imagen de logo
import logo from '../../assets/fetch-friend-finder-logo.webp';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="50" height="50" />
          My App
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carlos">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/find-new-friend">Find New Friend</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-lg-none" to="/login">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-lg-none" to="/login">Register</Link>
            </li>
          </ul>
        </div>
        <div className="d-none d-lg-flex align-items-center">
          <Link to="/login" className="btn btn-lin mx-2">Sign In</Link>
          <span className="text-muted">|</span>
          <Link to="/login" className="btn btn-lin mx-2">Register</Link>
        </div>
        
      </div>
    </nav>
  );
}

export default Header;
