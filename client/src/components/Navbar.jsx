import { useState } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, isAdmin, logout, isMod } from '../utils/auth';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isLoggedIn()) return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/dashboard" className="logo">RedditCopy</Link>
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/forum">Forum</Link>

        {isAdmin() && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/moderation">Moderation</Link>
          </>
        )}

        {!isAdmin() && isMod() && (
          <Link to="/admin/moderation">Moderation</Link>
        )}

        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
