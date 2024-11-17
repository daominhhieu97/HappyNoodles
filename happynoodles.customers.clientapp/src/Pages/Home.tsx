// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Grid, createTheme, ThemeProvider, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { getUserDetails, inactiveUser, updateUserDetails } from '../apis/userApi.tsx';
import getAllMenus from '../apis/menuApi.tsx';
import UserInfoModal from '../components/userInfoModal.tsx';
import CarouselSection from '../components/carouselSection.tsx';
import MissionStatement from '../components/missionStatement.tsx';
import MenuTabs from '../components/menuTabs.tsx';
import CategoryList from '../components/categoryList.tsx';
import ItemSection from '../components/itemSection.tsx';
import CustomerFeedback from '../components/customerFeedback.tsx';
import Footer from '../components/footer.tsx';
import UserDto from '../models/user.tsx';
import MenuDto from '../models/menu.tsx';
import Header from '../components/header.tsx';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';
import SpecialStickyButtons from '../components/specialStickyButtons.tsx';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513',
    },
    secondary: {
      main: '#D2691E',
      light: '#DEB887',
    },
    background: {
      default: '#FFF8DC',
      paper: '#FAEBD7',
    },
  },
  typography: {
    fontFamily: 'Playfair Display, serif',
  },
});

const stickyButtons = [
  {
    icon: <ShoppingCartIcon />,
    label: 'cart',
    path: '/order',
  },
  // Add more buttons here as needed
];

export const Home: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState<UserDto>();
  const [doUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [menus, setMenus] = useState<MenuDto[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleMenuChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedMenu(newValue);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleUserInfoModalClose = () => setUserInfoModalOpen(false);

  const getMenus = async () => {
    const menus = await getAllMenus();
    setMenus(menus);
    if (menus.length > 0) {
      setSelectedMenu(menus[0].id);
    }
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

  const handleOrderItem = (itemId: string) => {
    // Implement your order logic here
    console.log(`Ordering item with id: ${itemId}`);
    };

    const renderLogin = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: theme.palette.background.default }}>
            <Typography variant="h4" sx={{ mb: 4, color: theme.palette.primary.main, fontWeight: 'bold' }}>Welcome to Happy Noodles</Typography>
            <GoogleLoginButton />
        </Box>
    );

    const isValidLogin = () => {
        if (!userState.isAuthenticated || !user?.active) {
            return false;
        }
        return true;
    }
  
   return (!isValidLogin() ? renderLogin() :
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', fontFamily: theme.typography.fontFamily }}>
        <Header 
          theme={theme}
          userName={userState.user.name}
          onAvatarClick={() => setUserInfoModalOpen(true)}
        />
        <UserInfoModal 
          open={doUserInfoModalOpen}
          handleClose={handleUserInfoModalClose}
          userName={userState.user.name}
          userEmail={userState.user.email}
          phoneNumber={phoneNumber}
          address={address}
          setPhoneNumber={setPhoneNumber}
          setAddress={setAddress}
          handleSave={handleSave}
          inactiveCustomer={inactiveCustomer}
        />
        <CarouselSection />
        <MissionStatement theme={theme} />
        <MenuTabs 
          theme={theme}
          menus={menus}
          selectedMenu={selectedMenu}
          handleMenuChange={handleMenuChange}
        />
        <Grid container spacing={2} sx={{ padding: '16px' }}>
          <CategoryList 
            theme={theme}
            categories={menus.find(menu => menu.id === selectedMenu)?.categories || []}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <ItemSection 
            items={menus.find(menu => menu.id === selectedMenu)?.categories
              .find(category => category.id === selectedCategory)?.items || []}
            theme={theme}
            onOrderItem={handleOrderItem}
          />
        </Grid>
        <CustomerFeedback theme={theme} />
        <Footer theme={theme} />
      </Box>
      <SpecialStickyButtons buttons={stickyButtons} />
    </ThemeProvider>
  );
};

export default Home;