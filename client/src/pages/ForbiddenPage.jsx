import { Link } from 'react-router-dom';

function ForbiddenPage() {
  return (
    <div className="page">
      <h1>🚫 403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/dashboard">
        <button>Go Back to Dashboard</button>
      </Link>
    </div>
  );
}

export default ForbiddenPage;
