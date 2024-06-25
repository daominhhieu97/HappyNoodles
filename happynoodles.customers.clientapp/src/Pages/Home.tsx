import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/authSlice';

export const Home = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div>
            {user ? <h1>Welcome, {user.name}!</h1> : <h1>Welcome to our app!</h1>}
        </div>
        //<div>hieu</div>
    
    );
};