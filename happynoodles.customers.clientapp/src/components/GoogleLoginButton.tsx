import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailure, loginStart, loginSuccess } from '../store/authSlice';
import axios from 'axios';

export default function GoogleLoginButton()  {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleGoogleLogin = async () => {
        dispatch(loginStart());
        try {
            const response = await axios.post('https://localhost:7232/api/login/signin'); // Your backend endpoint
            dispatch(loginSuccess(response.data));
            navigate('/'); // Navigate to home page
        } catch (error) {
            dispatch(loginFailure('Google login failed.'));
        }
    };

    return <button onClick={handleGoogleLogin}>Login with Google</button>;
};