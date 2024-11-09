import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, Button, Tooltip, Box, CardContent, Card, CardMedia } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { ItemDto } from '../models/menu';

interface ItemSectionProps {
  items: ItemDto[];
  theme: Theme;
  onOrderItem: (itemId: string) => void;
}

const defaultPictureUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';

const ItemSection: React.FC<ItemSectionProps> = ({ items, theme, onOrderItem }) => {
    return (
      <Grid item xs={12} md={9}>
        <Paper elevation={3} sx={{ padding: '16px', backgroundColor: theme.palette.background.paper }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
            Items
          </Typography>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: theme.typography.fontFamily, color: theme.palette.secondary.main }}>
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Tooltip title={item.description.length > 200 ? item.description : ''} arrow>
                      <Typography variant="body2" sx={{ mt: 1, fontFamily: theme.typography.fontFamily }}>
                        {item.description.length > 200
                          ? `${item.description.substring(0, 197)}...`
                          : item.description}
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2" sx={{ mt: 1, fontFamily: theme.typography.fontFamily }}>
                      Status: {item.availableStatus === 'InStock' ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          backgroundColor: theme.palette.secondary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.light,
                          },
                          fontFamily: theme.typography.fontFamily,
                        }}
                        onClick={() => onOrderItem(item.id)}
                        disabled={item.availableStatus === 'OutOfStock'}
                      >
                        Order Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    );
  };
  
  export default ItemSection;