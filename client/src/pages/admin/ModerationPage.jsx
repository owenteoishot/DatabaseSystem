import { useEffect, useState } from 'react';

function ModerationPage() {
  const token = localStorage.getItem('token');
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/moderation/flags', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setFlags);
  }, [token]);

  const handleAction = async (flagId, action) => {
    await fetch('http://localhost:3000/api/moderation/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ flagId, action }),
    });

    // Refresh flags
    setFlags(prev => prev.filter(f => f.flag_id !== flagId));
  };

  return (
    <div className="page">
      <h2>Flagged Content</h2>
      {flags.length === 0 ? (
        <p>No flags found.</p>
      ) : (
        <ul>
          {flags.map(flag => (
            <li key={flag.flag_id}>
              <p><strong>{flag.content_type}</strong> (ID: {flag.content_id})</p>
              <p>Status: {flag.status}</p>
              <button onClick={() => handleAction(flag.flag_id, 'dismissed')}>Dismiss</button>
              <button onClick={() => handleAction(flag.flag_id, 'actioned')}>Take Action</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ModerationPage;
