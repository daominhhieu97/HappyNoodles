import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.tsx';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';
import Logout from '../components/logout.tsx';
import { AppBar, Avatar, Box, Button, Collapse, IconButton, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import CommonModal from '../components/commonModal.tsx';
import UserDto from '../models/user.tsx';
import { getUserDetails, inactiveUser, updateUserDetails } from '../apis/userApi.tsx';
import EditableTextField from '../components/editableTextField.tsx';
import { toast } from 'react-toastify';
import getAllMenus from '../apis/menuApi.tsx';


export const Home: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<UserDto>();
    const [doUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [menus, setMenus] = useState<MenuDto[]>([]);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<ItemDto | null>(null);

    const handleCategoryClick = (categoryId: string) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId);
      };
    
      const handleItemClick = (item: ItemDto) => {
        setSelectedItem(item);
      };

    const handleUserInfoModalClose = () => setUserInfoModalOpen(false);

    const getMenus = async () => {
        const menus = await getAllMenus();
        setMenus(menus);
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
                getMenus();
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
      {menus.map((menu) => (
        <div key={menu.id}>
          <Typography variant="h6">{menu.name}</Typography>
          {menu.categories.map((category) => (
            <div key={category.id}>
              <Button
                onClick={() => handleCategoryClick(category.id)}
                variant="outlined"
                sx={{ marginTop: '8px', justifyContent: 'flex-start', width: '100%' }}
              >
                {category.name}
              </Button>
              <Collapse in={openCategory === category.id}>
                {category.items.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    variant="text"
                    sx={{ marginLeft: '16px', justifyContent: 'flex-start', width: '100%' }}
                  >
                    {item.name} - ${item.price.toFixed(2)}
                  </Button>
                ))}
              </Collapse>
            </div>
          ))}
        </div>
      ))}
      {selectedItem && (
        <Box sx={{ marginTop: '16px' }}>
          <Typography variant="subtitle1">Selected Item: {selectedItem.name}</Typography>
          <Typography variant="body2">Price: {selectedItem.price.toFixed(2)}</Typography>
          <Typography variant="body2">Description: {selectedItem.description}</Typography>
          <Typography variant="body2">Remaining: {selectedItem.remainingItem}</Typography>
        </Box>
      )}
    </Box>
            </div>
        </div>
    );
};

export default Home;