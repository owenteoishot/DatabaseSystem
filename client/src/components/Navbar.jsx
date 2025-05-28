import { Link } from 'react-router-dom';
import { isLoggedIn, isAdmin, logout } from '../utils/auth';

function Navbar() {
  if (!isLoggedIn()) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      {isAdmin() && <Link to="/admin">Admin Panel</Link>}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
