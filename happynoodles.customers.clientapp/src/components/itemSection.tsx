import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Tooltip, Box, CardContent, Card, CardMedia, Zoom, Fade, IconButton } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ItemDto } from '../models/menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface ItemSectionProps {
    items: ItemDto[];
    theme: Theme;
    onOrderItem: (itemId: string) => void;
}

const getAvailabilityStatus = (status: 1 | 2): 'InStock' | 'OutOfStock' => {
    return status === 1 ? 'InStock' : 'OutOfStock';
};

const defaultPictureUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';

const ItemSection: React.FC<ItemSectionProps> = ({ items, theme, onOrderItem }) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ padding: '16px', backgroundColor: theme.palette.background.paper }}>
                <Typography variant="h4" sx={{ mb: 3, color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily, textAlign: 'center' }}>
                    🍜 Delicious Noodles Await! 🍜
                </Typography>
                <Grid container spacing={3}>
                    {items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Zoom in={true} style={{ transitionDelay: '250ms' }}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
                                        }
                                    }}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.pictureUrl || defaultPictureUrl}
                                        alt={item.name}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography gutterBottom variant="h6" component="div" sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.primary.main }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.secondary.main, fontWeight: 'bold' }}>
                                            ${item.price.toFixed(2)}
                                        </Typography>
                                        <Tooltip title={item.description} arrow>
                                            <Typography variant="body2" sx={{ mt: 1, fontFamily: theme.typography.fontFamily }}>
                                                {item.description.length > 100
                                                    ? `${item.description.substring(0, 97)}...`
                                                    : item.description}
                                            </Typography>
                                        </Tooltip>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                            <Typography variant="body2" sx={{
                                                fontFamily: theme.typography.fontFamily,
                                                color: getAvailabilityStatus(item.availableStatus) === 'InStock' ? 'green' : 'red'
                                            }}>
                                                {getAvailabilityStatus(item.availableStatus) === 'InStock' ? '✅ In Stock' : '❌ Out of Stock'}
                                            </Typography>
                                            <Fade in={hoveredItem === item.id}>
                                                <Box>
                                                    <IconButton size="small" color="primary">
                                                        <FavoriteIcon />
                                                    </IconButton>
                                                    <IconButton size="small" color="secondary">
                                                        <LocalOfferIcon />
                                                    </IconButton>
                                                </Box>
                                            </Fade>
                                        </Box>
                                        <Box sx={{ mt: 'auto' }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                startIcon={<ShoppingCartIcon />}
                                                sx={{
                                                    mt: 2,
                                                    backgroundColor: theme.palette.secondary.main,
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.secondary.light,
                                                    },
                                                    fontFamily: theme.typography.fontFamily,
                                                }}
                                                onClick={() => onOrderItem(item.id)}
                                                disabled={getAvailabilityStatus(item.availableStatus) === 'OutOfStock'}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Zoom>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Grid>
    );
};

export default ItemSection;