import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import Details from '../pages/Details/Details';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import Create from '../pages/Create/Create';
import Logout from '../pages/Logout/LogoutPage';



export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create" element={<Create />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}
