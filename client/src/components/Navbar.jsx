import { Link } from 'react-router-dom';
import { isLoggedIn, isAdmin, logout } from '../utils/auth';

function Navbar() {
  if (!isLoggedIn()) return null;

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/forum">Forum</Link>

        {isAdmin() && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/moderation">Moderation</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
