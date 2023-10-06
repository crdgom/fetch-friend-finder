// * Footer.jsx
// * Name: Footer
// * Description: Footer component with Bootstrap.
// * Since: v1.0.0
// * Author: @crdgom

import { Link } from 'react-router-dom';

// Importa tu imagen de logo
import logo from '../../assets/fetch-friend-finder-logo.webp';

function Footer() {
    return(
        <div className="container">
  <footer className="row row-cols-1 row-cols-sm-1 row-cols-md-3 py-5 my-5 border-top">
    <div className="col mb-12 align-items-center">
      <Link className="d-flex flex-column mb-3 link-body-emphasis text-decoration-none align-items-center" to="/">
          <img src={logo} alt="Logo" width="100" height="100" />
        </Link>
      
    </div>

    <div className="col mb-6 flex-column align-items-center">
      <ul className="nav flex-column align-items-center">
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Donations</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Help</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Blog</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><i className="bi bi-facebook"></i></a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><i className="bi bi-instagram"></i></a></li>
      </ul>
    </div>

    <div className="col mb-4 align-items-center">
      <ul className="nav flex-column align-items-center">
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Home</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Features</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
      <p className="text-body-secondary text-center">&copy; 2023 FFF. All rights reserved</p>
    </div>
  </footer>
</div>
    )
}

export default Footer;