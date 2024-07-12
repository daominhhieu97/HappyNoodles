import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.tsx';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';
import fetchFoods from '../apis/foodApi.tsx';
import Logout from '../components/logout.tsx';
import { Avatar, IconButton, Typography } from '@mui/material';
import CommonModal from '../components/commonModal.tsx';
import UserDto from '../models/user.tsx';
import { getUserDetails } from '../apis/userApi.tsx';

export const Home: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user); 
    const [foods, setFoods] = useState<string>('');
    const [user, setUser] = useState<UserDto>();
    const [doUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
    const handleUserInfoModalClose = () => setUserInfoModalOpen(false);

    const fetchFoodsData = async () => {
        const fetchedFoods = await fetchFoods();
        setFoods(fetchedFoods);
    };

    useEffect(() => {
        const initState = async () => {
            if (userState.isAuthenticated) {
                fetchFoodsData();
                setUser(await getUserDetails(userState.user.id))
            }
        }
        initState();
       
    }, [userState.isAuthenticated]);

    if (!userState.isAuthenticated) {
        return (<div>
            <p>Welcome to Happy Noodles</p>
            <GoogleLoginButton />
        </div>)
    }

    const getAvatarDisplayName = (username : string) => {
        return username
        .split(' ')
        .map(name => name[0])
        .join('');
    } 

    return (
        <div>
            <div>
                <IconButton onClick={() => setUserInfoModalOpen(true)}>
                    <Avatar>{getAvatarDisplayName(userState.user.name)}</Avatar>
                </IconButton>
                <CommonModal open={doUserInfoModalOpen} handleClose={handleUserInfoModalClose} title="THÔNG TIN CÁ NHÂN">
                    <Typography sx={{ mt: 2 }}>
                        Username: {userState.user.name}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Email: {userState.user.email}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Phone Number: {user?.phoneNumber}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Address: {user?.address}
                    </Typography>
                </CommonModal>
            </div>
            
            <Logout />
            <h2>Available Foods:</h2>
            <ul>
                {foods}
            </ul>
        </div>
    );
};

export default Home;