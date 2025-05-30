import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ForumPage() {
  const [posts, setPosts] = useState([]);
  const [filterId, setFilterId] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const fetchPosts = async () => {
    const url = filterId
      ? `http://localhost:3000/api/posts?userId=${filterId}`
      : `http://localhost:3000/api/posts`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

 const handleReport = async (postId) => {
  console.log('⚠️ Report button clicked:', postId);
  try {
    const res = await fetch('http://localhost:3000/api/flags', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content_type: 'post', // ✅ must be lowercase 'post'
        content_id: postId
      })
    });

    if (res.ok) {
      alert('Post reported. Thank you!');
    } else {
      const errData = await res.json();
      alert('Failed to report: ' + errData.message);
    }
  } catch (err) {
    alert('Failed to report: ' + err.message);
  }
};

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/admin/post/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to delete post');
      fetchPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="page">
      <h2>Forum</h2>

      <form onSubmit={(e) => { e.preventDefault(); fetchPosts(); }}>
        <input
          placeholder="Filter by user ID"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
        />
        <button type="submit">Filter</button>
        <button type="button" onClick={() => { setFilterId(''); fetchPosts(); }}>Reset</button>
      </form>

      <Link to="/forum/create"><button>Create Post</button></Link>

      {posts.map(post => (
        <div key={post.post_id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><small>By {post.username}</small></p>

          {['admin', 'moderator'].includes(role) && (
            <button onClick={() => handleDelete(post.post_id)}>Delete</button>
          )}

          {role === 'user' && (
            <button onClick={() => handleReport(post.post_id)}>Report</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ForumPage;
