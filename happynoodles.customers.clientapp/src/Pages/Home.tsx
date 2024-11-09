import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.tsx';
import GoogleLoginButton from '../components/GoogleLoginButton.tsx';
import Logout from '../components/logout.tsx';
import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography, Tabs, Tab, List, ListItem, ListItemText, Paper, Grid, Container, Card, CardContent, ListItemButton, createTheme } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CommonModal from '../components/commonModal.tsx';
import UserDto from '../models/user.tsx';
import { getUserDetails, inactiveUser, updateUserDetails } from '../apis/userApi.tsx';
import EditableTextField from '../components/editableTextField.tsx';
import { toast } from 'react-toastify';
import getAllMenus from '../apis/menuApi.tsx';
import MenuDto from '../models/menu.tsx';
import ItemSection from '../components/itemSection.tsx';

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

    const getAvatarDisplayName = (username: string) => {
        return username
            .split(' ')
            .map(name => name[0])
            .join('');
    }

    const handleOrderItem = (itemId: string) => {
        // Implement your order logic here
        console.log(`Ordering item with id: ${itemId}`);
    };

    return (!isValidLogin() ? renderLogin() :
        <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', fontFamily: theme.typography.fontFamily }}>
            <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Happy Noodles
                    </Typography>
                    <IconButton onClick={() => setUserInfoModalOpen(true)}>
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>{getAvatarDisplayName(userState.user.name)}</Avatar>
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
                <Button sx={{ mt: 2 }} onClick={handleSave} variant="contained" color="primary">Save</Button>
                <Button sx={{ mt: 2, ml: 2 }} onClick={inactiveCustomer} variant="contained" color="error">Inactive</Button>
                <Logout />
            </CommonModal>

            <Box sx={{ mb: 4 }}>
                <div style={{ width: '100%' }}>
                    <Carousel showThumbs={false} infiniteLoop autoPlay>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1552611052-33e04de081de"
                                alt="Happy Noodles Dish 1"
                                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                            />
                            <p className="legend">Signature Ramen Bowl</p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624"
                                alt="Happy Noodles Dish 2"
                                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                            />
                            <p className="legend">Spicy Udon Stir-Fry</p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
                                alt="Happy Noodles Ambiance"
                                style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                            />
                            <p className="legend">Our Cozy Restaurant</p>
                        </div>
                    </Carousel>
                </div>
            </Box>

            <Container maxWidth="md" sx={{ mb: 4 }}>
                <Typography variant="h4" align="center" sx={{ mb: 2, color: theme.palette.primary.main }}>
                    Our Mission
                </Typography>
                <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                    At Happy Noodles, we strive to bring joy and comfort through our delicious noodle dishes,
                    crafted with love and the finest ingredients. Our goal is to create a warm, welcoming
                    atmosphere where every customer feels at home and experiences the rich flavors of our
                    authentic recipes.
                </Typography>
            </Container>

            <Box sx={{ width: '100%', bgcolor: theme.palette.background.paper }}>
                <Tabs
                    value={selectedMenu}
                    onChange={handleMenuChange}
                    centered
                    sx={{ backgroundColor: theme.palette.secondary.main }}
                >
                    {menus.map((menu) => (
                        <Tab label={menu.name} value={menu.id} key={menu.id} sx={{ color: '#FFF', '&.Mui-selected': { color: '#FFF', fontWeight: 'bold' } }} />
                    ))}
                </Tabs>
            </Box>
            <Grid container spacing={2} sx={{ padding: '16px' }}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={3} sx={{ padding: '16px', backgroundColor: theme.palette.background.paper }}>
                        <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>Categories</Typography>
                        <List>
                            {menus.find(menu => menu.id === selectedMenu)?.categories.map((category) => (
                                <ListItemButton
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.id)}
                                    selected={selectedCategory === category.id}
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#FFF',
                                            '&:hover': {
                                                backgroundColor: theme.palette.secondary.main,
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: theme.palette.secondary.light,
                                        },
                                    }}
                                >
                                    <ListItemText primary={category.name} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <ItemSection
                    items={menus.find(menu => menu.id === selectedMenu)?.categories
                        .find(category => category.id === selectedCategory)?.items || []}
                    theme={theme}
                    onOrderItem={handleOrderItem}
                />
            </Grid>

            <Container maxWidth="md" sx={{ my: 4 }}>
                <Typography variant="h4" align="center" sx={{ mb: 4, color: theme.palette.primary.main }}>
                    Customer Feedback
                </Typography>
                <Grid container spacing={3}>
                    {[
                        { name: "John D.", comment: "Best noodles in town! The atmosphere is cozy and staff is friendly." },
                        { name: "Sarah M.", comment: "I love the variety of dishes. The spicy chicken noodles are my favorite!" },
                        { name: "Mike R.", comment: "Great place for family dinners. Kids menu is fantastic!" }
                    ].map((feedback, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {feedback.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        "{feedback.comment}"
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Box component="footer" sx={{ bgcolor: theme.palette.primary.main, color: '#FFF', py: 3, mt: 4 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Contact Us
                            </Typography>
                            <Typography variant="body2">
                                123 Noodle Street, Foodie City<br />
                                Phone: (123) 456-7890<br />
                                Email: info@happynoodles.com
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Opening Hours
                            </Typography>
                            <Typography variant="body2">
                                Monday - Friday: 11am - 10pm<br />
                                Saturday - Sunday: 10am - 11pm
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                Follow Us
                            </Typography>
                            <IconButton color="inherit" aria-label="Facebook">
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Instagram">
                                <InstagramIcon />
                            </IconButton>
                            <IconButton color="inherit" aria-label="Twitter">
                                <TwitterIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box mt={3}>
                        <Typography variant="body2" align="center">
                            © 2024 Happy Noodles. All rights reserved.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;