import { useEffect, useState } from 'react';
import { fetchProfile, updateProfile } from '../utils/api';

function ProfilePage() {
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    display_name: '',
    avatar_url: '',
    bio: '',
    social_links: {},
  });

  useEffect(() => {
    const load = async () => {
      const profile = await fetchProfile(token);
      if (profile) {
        setForm({
          display_name: profile.display_name || '',
          avatar_url: profile.avatar_url || '',
          bio: profile.bio || '',
          social_links: profile.social_links || {},
        });
      }
    };
    load();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateProfile(token, form);
    if (updated) {
      alert('Profile updated');
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="page">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Display Name:
          <input name="display_name" value={form.display_name} onChange={handleChange} />
        </label>
        <label>
          Avatar URL:
          <input name="avatar_url" value={form.avatar_url} onChange={handleChange} />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={form.bio} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ProfilePage;
