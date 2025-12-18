import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, guestOnly = false }) {
  const { user } = useAuth();

  if (guestOnly && user) {
    return <Navigate to="/" replace />;
  }

  if (!guestOnly && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
