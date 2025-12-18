import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import Details from '../pages/Details/Details';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import Create from '../pages/Create/Create';
import Logout from '../pages/Logout/LogoutPage';
import Edit from '../pages/Edit/Edit';
import DeletePage from '../pages/DeletePage/Delete.jsx';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/details/:id" element={<Details />} />

      <Route
        path="/login"
        element={
          <ProtectedRoute guestOnly>
            <Login />
          </ProtectedRoute>
        }
      />

      <Route
        path="/register"
        element={
          <ProtectedRoute guestOnly>
            <Register />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/delete/:id"
        element={
          <ProtectedRoute>
            <DeletePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
