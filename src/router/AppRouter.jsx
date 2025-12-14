import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import Details from '../pages/Details/Details';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}
