import { Link } from 'react-router-dom';
import { isLoggedIn, isAdmin, logout } from '../utils/auth';

function Navbar() {
  if (!isLoggedIn()) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/forum">Forum</Link>
      {isAdmin() && (
        <>
          <Link to="/admin">Admin</Link>
          <Link to="/admin/moderation">Moderation</Link>
          <Link to="/admin/roles">Role Management</Link>
        </>
      )}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
