import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.tsx';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';
import getItems from '../apis/foodApi.tsx';
import Logout from '../components/logout.tsx';
import { AppBar, Avatar, Box, Button, Collapse, IconButton, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import CommonModal from '../components/commonModal.tsx';
import UserDto from '../models/user.tsx';
import { getUserDetails, inactiveUser, updateUserDetails } from '../apis/userApi.tsx';
import EditableTextField from '../components/editableTextField.tsx';
import { toast } from 'react-toastify';


export const Home: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user);
    const [foods, setItems] = useState<string>('');
    const [user, setUser] = useState<UserDto>();
    const [doUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleUserInfoModalClose = () => setUserInfoModalOpen(false);

    const fetchItems = async () => {
        const items = await getItems();
        setItems(items);
    };

    const handleSave = async () => {
        if (user) {
            await updateUserDetails({
                id: user.id,
                phoneNumber: phoneNumber,
                address: address
            })
            handleUserInfoModalClose();

            toast('Your changes are saved')
        }
    };

    const inactiveCustomer = async () => {
        if (user) {
            await inactiveUser(user.id);
            handleUserInfoModalClose();
            toast("Inactive successfully. You cannot use this account next time.");
        }
    }

    useEffect(() => {
        const initState = async () => {
            if (userState.isAuthenticated === true) {
                fetchItems();
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

    const renderLogin = () => (
        <>
            <p>Welcome to Happy Noodles</p>
            <GoogleLoginButton />
        </>
    );

    const isValidLogin = () => {
        if (!userState.isAuthenticated || !user?.active) {
            return false;
        }

        return true;
    }

    const getAvatarDisplayName = (username: string) => {
        return username
            .split(' ')
            .map(name => name[0])
            .join('');
    }

    const categories = [
        {
            name: "Fruits",
            subcategories: [
                { name: "Apples" },
                { name: "Bananas" },
                { name: "Oranges" },
            ],
        },
        {
            name: "Vegetables",
            subcategories: [
                { name: "Carrots" },
                { name: "Broccoli" },
                { name: "Spinach" },
            ],
        },
        {
            name: "Dairy",
            subcategories: [
                { name: "Milk" },
                { name: "Cheese" },
                { name: "Yogurt" },
            ],
        },
    ];

    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleCategoryClick = (categoryName: string) => {
        setOpenCategory(openCategory === categoryName ? null : categoryName);
    };

    const handleItemClick = (itemName: string) => {
        setSelectedItem(itemName);
        console.log(`Selected: ${itemName}`); // Or perform any action you need
    };

    return (!isValidLogin() ? renderLogin() :
        <div>
            <div>
                <AppBar position="static" sx={{ backgroundColor: 'green' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Happy Noodles
                        </Typography>
                        <IconButton onClick={() => setUserInfoModalOpen(true)}>
                            <Avatar>{getAvatarDisplayName(userState.user.name)}</Avatar>
                        </IconButton>
                    </Toolbar>
                </AppBar>
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
                    <Button sx={{ mt: 2 }} onClick={inactiveCustomer} color='error'>Inactive</Button>
                    <Logout />
                </CommonModal>
                <Box sx={{ border: '1px solid #ccc', marginTop: '16px', padding: '16px', borderRadius: '8px' }}>
                    <Typography variant="h6">Menu</Typography>
                    {categories.map((category) => (
                        <div key={category.name}>
                            <Button
                                onClick={() => handleCategoryClick(category.name)}
                                variant="outlined"
                                sx={{ marginTop: '8px', justifyContent: 'flex-start', width: '100%' }}
                            >
                                {category.name}
                            </Button>
                            <Collapse in={openCategory === category.name}>
                                {category.subcategories.map((sub) => (
                                    <Button
                                        key={sub.name}
                                        onClick={() => handleItemClick(sub.name)}
                                        variant="text"
                                        sx={{ marginLeft: '16px', justifyContent: 'flex-start', width: '100%' }}
                                    >
                                        {sub.name}
                                    </Button>
                                ))}
                            </Collapse>
                        </div>
                    ))}
                    {selectedItem && <Typography variant="subtitle1" sx={{ marginTop: '16px' }}>You selected: {selectedItem}</Typography>}
                </Box>
            </div>
        </div>
    );
};

export default Home;