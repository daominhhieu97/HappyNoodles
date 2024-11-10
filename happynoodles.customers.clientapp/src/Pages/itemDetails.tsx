import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardMedia, CardContent, Box, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ItemDetailsDto } from '../models/item';
import getItemDetails from '../apis/itemApi.tsx';


const ItemDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<ItemDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                debugger;
                const response = await getItemDetails(id);
                setItem(response);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch item details');
                setLoading(false);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!item) return <Typography>Item not found</Typography>;

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <CardMedia
                component="img"
                height="300"
                image={item.pictureUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'}
                alt={item.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    {item.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    ${item.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" paragraph>
                    {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {item.categoryName}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="body2" color={item.availableStatus === 'InStock' ? 'green' : 'red'}>
                        {item.availableStatus === 'InStock' ? '✅ In Stock' : '❌ Out of Stock'}
                    </Typography>
                    <Typography variant="body2">
                        Remaining: {item.remainingItem}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    sx={{ mt: 2 }}
                    disabled={item.availableStatus !== 'InStock'}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ItemDetails;