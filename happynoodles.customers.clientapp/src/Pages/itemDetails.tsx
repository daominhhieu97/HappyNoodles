import React from 'react';
import { Modal, Box, IconButton, Grid, Typography, Button } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ItemDto } from '../models/menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

interface ItemDetailsModalProps {
    selectedItem: ItemDto | null;
    onClose: () => void;
    onOrderItem: (itemId: string) => void;
    theme: Theme;
}

const getAvailabilityStatus = (status: 1 | 2): 'InStock' | 'OutOfStock' => {
    return status === 1 ? 'InStock' : 'OutOfStock';
};

const defaultPictureUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ selectedItem, onClose, onOrderItem, theme }) => {
    if (!selectedItem) return null;

    return (
        <Modal
            open={!!selectedItem}
            onClose={onClose}
            aria-labelledby="item-details-modal"
            aria-describedby="item-details-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: 800,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={selectedItem.pictureUrl || defaultPictureUrl}
                            alt={selectedItem.name}
                            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            {selectedItem.name}
                        </Typography>
                        <Typography variant="h5" color="secondary" gutterBottom>
                            ${selectedItem.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {selectedItem.description}
                        </Typography>
                        <Typography variant="body2" color={getAvailabilityStatus(selectedItem.availableStatus) === 'InStock' ? 'green' : 'red'}>
                            {getAvailabilityStatus(selectedItem.availableStatus) === 'InStock' ? '✅ In Stock' : '❌ Out of Stock'}
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<ShoppingCartIcon />}
                            sx={{ mt: 2 }}
                            onClick={() => onOrderItem(selectedItem.id)}
                            disabled={getAvailabilityStatus(selectedItem.availableStatus) === 'OutOfStock'}
                        >
                            Add to Cart
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default ItemDetailsModal;