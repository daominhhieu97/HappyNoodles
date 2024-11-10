import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store.tsx';
import { Provider } from 'react-redux';
import Register from './pages/Register.tsx';
import Inactive from './pages/Inactive.tsx';
import ItemDetails from './pages/itemDetails.tsx';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/inactive" element={<Inactive />} />
                        <Route path="/product/:id" element={<ItemDetails />} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};