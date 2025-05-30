import { Navigate } from 'react-router-dom';

const ModerationRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" />;
  if (role !== 'admin' && role !== 'moderator') return <Navigate to="/403" />;

  return children;
};

export default ModerationRoute;
