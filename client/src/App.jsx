import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ForumPage from './pages/ForumPage';
import PostCreatePage from './pages/PostCreatePage';

import AdminPage from './pages/admin/AdminPage';
import ModerationPage from './pages/admin/ModerationPage';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import ForbiddenPage from './pages/ForbiddenPage';
import ModerationRoute from './components/ModerationRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/forum" element={<ProtectedRoute><ForumPage /></ProtectedRoute>} />
          <Route path="/forum/create" element={<ProtectedRoute><PostCreatePage /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="/admin/moderation" element={<AdminRoute><ModerationPage /></AdminRoute>} />
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/admin/moderation" element={<ModerationRoute><ModerationPage /></ModerationRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
