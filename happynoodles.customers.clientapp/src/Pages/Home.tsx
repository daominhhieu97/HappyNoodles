import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.tsx';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';
import fetchFoods from '../apis/foodApi.tsx';
import Logout from '../components/logout.tsx';
import { Avatar, Button, IconButton, Typography } from '@mui/material';
import CommonModal from '../components/commonModal.tsx';
import UserDto from '../models/user.tsx';
import { getUserDetails, updateUserDetails } from '../apis/userApi.tsx';
import EditableTextField from '../components/editableTextField.tsx';
import { toast } from 'react-toastify';


export const Home: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user); 
    const [foods, setFoods] = useState<string>('');
    const [user, setUser] = useState<UserDto>();
    const [doUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    
    const handleUserInfoModalClose = () => setUserInfoModalOpen(false);

    const fetchFoodsData = async () => {
        const fetchedFoods = await fetchFoods();
        setFoods(fetchedFoods);
    };

    const handleSave = async () => {
        if (user) {
            debugger
            await updateUserDetails({
                id: user.id,
                phoneNumber: phoneNumber,
                address: address
            })
            handleUserInfoModalClose();
            
            toast('Your changes are saved')
        }
    };

    useEffect(() => {
        const initState = async () => {
            if (userState.isAuthenticated) {
                fetchFoodsData();
                setUser(await getUserDetails(userState.user.id))
                setPhoneNumber(user?.phoneNumber || '')
                setAddress(user?.address || '')
            }
        }
        initState();
       
    }, [userState.isAuthenticated]);

    useEffect(() => {
        setPhoneNumber(user?.phoneNumber || '')
        setAddress(user?.address || '')
       
    }, [user]);

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
                <CommonModal open={doUserInfoModalOpen} handleClose={handleUserInfoModalClose} title="USER INFORMATION">
                    <Typography sx={{ mt: 2 }}>
                        Username: {userState.user.name}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Email: {userState.user.email}
                    </Typography>
                    <EditableTextField
                        label="Phone Number"
                        defaultValue={phoneNumber || ''}
                        onChange={setPhoneNumber}
                    />
                    <EditableTextField
                        label="Address"
                        defaultValue={address || ''}
                        onChange={setAddress}
                    />
                    <Button sx={{ mt: 2 }} onClick={handleSave}>Save</Button>
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