import { useEffect, useState } from 'react';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setUsers(data);
  };

  const promoteToModerator = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/admin/promote/${userId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setUsers(users.map(user =>
        user.user_id === userId ? { ...user, role: 'moderator' } : user
      ));
    }
  };

  const demoteToUser = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/admin/demote/${userId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setUsers(users.map(user =>
        user.user_id === userId ? { ...user, role: 'user' } : user
      ));
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user permanently?')) return;

    const res = await fetch(`http://localhost:3000/api/admin/user/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setUsers(users.filter(u => u.user_id !== userId));
    }
  };

  return (
    <div className="page">
      <h2>Admin Panel — User Management</h2>
      <table>
        <thead>
          <tr><th>Username</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role === 'user' && (
                  <button onClick={() => promoteToModerator(user.user_id)}>Promote to Moderator</button>
                )}
                {user.role === 'moderator' && (
                  <button onClick={() => demoteToUser(user.user_id)}>Demote to User</button>
                )}
                <button onClick={() => deleteUser(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
