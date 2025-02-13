import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
  const token = localStorage.getItem("token"); 
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Navbar on Login & Register pages
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Search App</Link>
        {token && (
          <div className="nav-links">
            <Link to="/search">Search</Link>
            <Link to="/lists">Lists</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
