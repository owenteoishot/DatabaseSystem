import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // You must set this during login

  if (!token) return <Navigate to="/login" />;
  if (role !== 'admin') return <Navigate to="/dashboard" />;

  return children;
};

export default AdminRoute;
