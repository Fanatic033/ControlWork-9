import {NavLink} from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div>
            <NavLink className="navbar-brand" to="/">Finance Tracker</NavLink>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/category">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="">Add transaction</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;