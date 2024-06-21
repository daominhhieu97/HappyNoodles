// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './Pages/Login';
import { Home } from './Pages/Home';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducer';
import { Provider } from 'react-redux';

export function App() {
    const store = createStore(authReducer, applyMiddleware(thunk));

    return (
      <Provider store={store}> 
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
        </Routes>
      </Provider>
      
    );
}