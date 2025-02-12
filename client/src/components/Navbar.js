import { Link } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Search App
        </Link>
        <div className="nav-links">
          <Link to="/">Login</Link>
          <Link to="/signup">Register</Link>
          <Link to="/search">Search</Link>
          <Link to="/lists">Lists</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
