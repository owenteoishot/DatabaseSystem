import { useEffect, useState } from 'react';

function ModerationPage() {
  const [flags, setFlags] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/flags', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch flagged posts');
        }
        return res.json();
      })
      .then(setFlags)
      .catch(err => {
        console.error('Error loading flags:', err.message);
      });
  }, []);

  return (
    <div className="page">
      <h2>Moderation Panel</h2>
      {flags.length === 0 ? (
        <p>No flagged posts.</p>
      ) : (
        flags.map(flag => (
          <div key={flag.flag_id} className="flag-card">
            <h3>{flag.title}</h3>
            <p><strong>Content:</strong> {flag.content}</p>
            <p><strong>Author:</strong> {flag.author}</p>
            <p><strong>Post ID:</strong> {flag.post_id}</p>
            <p><strong>Reason Code:</strong> {flag.reason}</p>
            <p><strong>Status:</strong> {flag.status}</p>
            <p><strong>Reported At:</strong> {new Date(flag.created_at).toLocaleString()}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ModerationPage;
