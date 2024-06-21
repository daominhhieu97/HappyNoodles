import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectAuthState } from './authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      await dispatch(login());
      navigate('/home'); // Redirect to home page
    } catch (error) {
      // Handle login error
    }
  };

  return (
   <button onClick={handleLogin}>Login</button>
  );
};

export default Login;