import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterId, setFilterId] = useState('');

  const fetchPosts = (userId = '') => {
    const url = userId
      ? `http://localhost:3000/api/posts?userId=${userId}`
      : `http://localhost:3000/api/posts`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchPosts(filterId);
  };

  const handleReport = (postId) => {
    const reasons = [
      'Spam',
      'Harassment',
      'Inappropriate Content',
      'False Information',
      'Other'
    ];

    const choice = prompt(
      `Select a reason:\n${reasons.map((r, i) => `${i + 1}. ${r}`).join('\n')}`
    );
    const index = parseInt(choice) - 1;

    if (isNaN(index) || index < 0 || index >= reasons.length) {
      alert('Invalid reason');
      return;
    }

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/flags', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contentType: 'post',
        contentId: String(postId),
        reason: reasons[index]
      })
    }).then(res => {
      if (res.ok) {
        alert('Report submitted');
      } else {
        alert('Failed to submit report');
      }
    });
  };

  return (
    <div className="page">
      <h2>Community Forum</h2>

      <form onSubmit={handleFilter} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Filter by User ID"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
        />
        <button type="submit">Filter</button>
        <button type="button" onClick={() => {
          setFilterId('');
          fetchPosts();
        }}>Reset</button>
      </form>

      <Link to="/forum/create">
        <button>Create New Post</button>
      </Link>

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="post-list">
          {posts.map(post => (
            <div key={post.post_id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By {post.username} — {new Date(post.created_at).toLocaleString()}</small>
              <br />
              <button onClick={() => handleReport(post.post_id)}>Report</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForumPage;
