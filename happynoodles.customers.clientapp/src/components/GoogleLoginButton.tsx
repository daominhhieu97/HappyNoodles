// components/GoogleLoginButton.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice.tsx';
import { jwtDecode } from 'jwt-decode';

const GoogleLoginButton: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // Redirect to your backend's Google authentication endpoint
        window.location.href =  `${process.env.REACT_APP_API_BASE_URL}/login/signin`
    };

    const handleLoginResponse = (jwtToken: string, userId: string | null) => {
        const decodedToken: any = jwtDecode(jwtToken);
        const user = {
            token: jwtToken,
            isAuthenticated : true,
            user : {
                email: decodedToken.email,
                name: decodedToken.unique_name,
                id: userId
            }
        };
        dispatch(login(user)); // Dispatch login action to Redux store
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const isRegistered = urlParams.get('isRegistered') === 'true';
        const userId = urlParams.get('userId');

        if (token) {
            handleLoginResponse(token, userId);
            
            if(!isRegistered)
                {
                    navigate('/register')
                }
                else{
                    navigate('/')
                }
        }
    }, []);

    return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;
