import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  
  return (
    <header>
      <Link to="/">
        <img className="logo" src="../../city-coffee-logo.png" alt="logo"></img>
      </Link>
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/add_user' ? 'active' : ''}`} to="/add_user">Add User</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`} to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
