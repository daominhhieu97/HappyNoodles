import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store.tsx';
import { Provider } from 'react-redux';
import AppRoutes from './routes/appRoutes.tsx';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};