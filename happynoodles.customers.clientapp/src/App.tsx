import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import GoogleLoginButton from './components/GoogleLoginButton.tsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<GoogleLoginButton />} />
            </Routes>
        </BrowserRouter>
    );
};