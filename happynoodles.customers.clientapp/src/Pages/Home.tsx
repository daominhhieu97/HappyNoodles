import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';
import fetchFoods from '../apis/foodApi.tsx';

export const Home: React.FC = () => {
    const user = useSelector((state: RootState) => state.user); // Replace 'state.user' with your actual slice where user information is stored
    const [foods, setFoods] = useState<string>(''); // State to hold fetched foods
    
    useEffect(() => {
        // Fetch foods when user is authenticated
        if (user.isAuthenticated) {
            const fetchFoodsData = async () => {
                try {
                    const fetchedFoods = await fetchFoods();
                    console.log('da authentication')
                    setFoods(fetchedFoods);
                } catch (error) {
                    console.error('Error fetching foods:', error);
                    // Handle error as needed
                }
            };
            fetchFoodsData();
        }
    }, [user.isAuthenticated]);
    
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
            
            <h2>Available Foods:</h2>
            <ul>
                {foods}
            </ul>
        </div>
    );
};

export default Home;