import { useEffect, useState } from 'react';
import { fetchProfile } from '../utils/api';

function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile(token);
      setProfile(data);
    };
    loadProfile();
  }, [token]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Welcome, {profile.display_name || profile.username || 'User'}!</h2>
      <p>Email: {profile.email}</p>
      <p>Bio: {profile.bio || 'No bio yet'}</p>
      <p>Reputation: {profile.score || 0}</p>
    </div>
  );
}

export default DashboardPage;
