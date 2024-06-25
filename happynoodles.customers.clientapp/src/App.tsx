import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import GoogleLoginButton from './components/GoogleLoginButton';

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