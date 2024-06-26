import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';

export const Home: React.FC = () => {
    const user = useSelector((state: RootState) => state.user); // Replace 'state.user' with your actual slice where user information is stored
    console.log(user)
    if(!user.isAuthenticated)
    {
        return (<div>
            <p>Welcome to Happy Noodles</p>
            <GoogleLoginButton />
        </div>)
    }
    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            {/* Render other user information */}
        </div>
    );
};

export default Home;