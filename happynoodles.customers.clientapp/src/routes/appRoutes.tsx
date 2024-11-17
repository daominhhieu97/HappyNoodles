import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Inactive from '../pages/Inactive.tsx';
import Order from '../pages/order.tsx';
import NotFound from '../pages/notFound.tsx';

const AppRoutes: React.FC = () => (
  <Routes>
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="inactive" element={<Inactive />} />
      <Route path="order" element={<Order />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);

export default AppRoutes;