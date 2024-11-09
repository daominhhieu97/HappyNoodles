import React from 'react';
import { Grid, Paper, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { CategoryDto } from '../models/menu';

interface CategoryListProps {
  theme: Theme;
  categories: CategoryDto[];
  selectedCategory: string | null;
  handleCategoryClick: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ theme, categories, selectedCategory, handleCategoryClick }) => (
  <Grid item xs={12} md={3}>
    <Paper elevation={3} sx={{ padding: '16px', backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main }}>Categories</Typography>
      <List>
        {categories.map((category) => (
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
);

export default CategoryList;