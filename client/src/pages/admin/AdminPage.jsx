import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/moderation">Moderate Flagged Content</Link></li>
        {/* You can add more admin tools here */}
      </ul>
    </div>
  );
}

export default AdminPage;
