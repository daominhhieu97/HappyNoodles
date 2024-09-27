// components/GoogleLoginButton.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, initUserDetails } from '../store/userSlice.tsx';
import { jwtDecode } from 'jwt-decode';
import { getUserDetails } from '../apis/userApi.tsx';

const GoogleLoginButton: React.FC = () => {
    const [isLoggedIn, SetLogInStatus] = useState(false);
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [isRegistered, setRegistered] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // Redirect to your backend's Google authentication endpoint
        window.location.href =  `${process.env.REACT_APP_API_BASE_URL}/login/signin`
    };

    const handleLoginResponse = (jwtToken: string, userId: string) => {
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
        debugger;
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const isRegistered = urlParams.get('isRegistered') === 'true';
        const userId = urlParams.get('userId')!;

        if(token)
        {
            debugger
            SetLogInStatus(true);
            setToken(token);
            setUserId(userId);
            setRegistered(isRegistered);
        }
    }, []);

    useEffect(() => {
        let user;
        const fetchData = async () => {
            user = await getUserDetails(userId);
        };
      
        fetchData();    
            handleLoginResponse(token, userId);

            initUserDetails(user);
            
            if(user.active === false)
            {
                navigate('/inactive')
                return;
            }
            
            if(!isRegistered)
                {
                    navigate('/register')
                }
                else{
                    navigate('/')
                }
        
    }, [isLoggedIn]);

    return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;
